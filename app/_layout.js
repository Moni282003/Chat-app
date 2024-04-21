import {Slot, useRouter, useSegments} from "expo-router";
import React, { useEffect } from "react";
import "../global.css"
import { AuthContextProvider, useAuth } from "../context/authContext";
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout=()=>{
    const {isAuthenticated}=useAuth();
    const segment=useSegments();
    const router=useRouter()

    useEffect(()=>{
       if(typeof isAuthenticated=="undefined") return;
       const inApp=segment[0]=="app"
       if(isAuthenticated && !inApp){
        router.replace('home')


       }
       else if(isAuthenticated==false){

        router.replace('SignIn')
       }


    },[isAuthenticated])
    return <Slot/>
}

export default function _layout(){
    return(
        <MenuProvider>
        <AuthContextProvider>
            <MainLayout/>
        </AuthContextProvider>
        </MenuProvider>
    )
}
