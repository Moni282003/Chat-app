import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../fireBaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from "firebase/auth";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);
   
    const updateUserData=async(userId)=>{
        const docref=doc(db,"users",userId);
        const docsnap=await getDoc(docref);

        if(docsnap.exists()){
            let data=docsnap.data();
            setUser({...user,username:data.username,profileurl:data.profileurl,userId:data.userId})
        }
    }


    const login = async (email, password) => {

        try{
            const response =await signInWithEmailAndPassword(auth,email,password);
            return{sucess:true};
        }
        catch(e){
            let msg=e.message;
            if(msg.includes('(auth/invalid-email)')) msg="Invalid Email"
            if(msg.includes('(auth/invalid-credential)')) msg="Invalid Credential"
            return{sucess:true,msg}
        }
    };

    const logout = async () => {
        try{
            await signOut(auth);
            return {success:true}
        }
        catch(e){
            return {success:false,msg:e.message,error:e}
        }
    };

    const register = async (email, password, username, profileurl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Response.user:', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileurl,
                userId: response?.user?.uid
            });


            return { success: true, data: response?.user };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = "Invalid email";
            if (msg.includes('(auth/email-already-in-use)')) msg = "Email already in use";
            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("Use Auth");
    }
    return value;
};
