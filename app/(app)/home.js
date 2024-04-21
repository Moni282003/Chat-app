import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/authContext';
import { StatusBar } from 'expo-status-bar';
import ChatList from '../../components/ChatList';
import { query, where, getDocs } from 'firebase/firestore';
import { usersref } from '../../fireBaseConfig';

export default function HomeScreen() {
    const { logout, user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user?.uid) {
            getUsers();
            console.log(user?.uid);
        } else {
            console.log("Hi");
            console.log(user?.uid);
        }
    }, [user]);
    const getUsers = async () => {
        const q = query(usersref, where('userId', '!=', user?.uid));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({ ...doc.data()});
        });
        console.log("Hi:", data);
        setUsers(data);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='light' />
            {users.length > 0 ? (
                <ChatList users={users} />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#6574cd' />
                </View>
            )}
        </View>
    );
};