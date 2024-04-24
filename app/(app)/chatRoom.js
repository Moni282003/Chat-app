import { KeyboardAvoidingView, TouchableOpacity, View, TextInput, Alert, ScrollView, Keyboard } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../util/Common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../fireBaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams();
    const { user } = useAuth();
    const [message, setMessage] = useState([]);
    const router = useRouter();
    const [text, setText] = useState('');
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNot();

        let roomId = getRoomId(user?.userId, item.userId);
        const docref = doc(db, 'rooms', roomId);
        const messageRef = collection(docref, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (querySnapshot) => {
            let allMessages = querySnapshot.docs.map(doc => doc.data());
            setMessage(allMessages);
            // Scroll to bottom whenever new messages are received
            // scrollToBottom();
        });
        const keyBoardDidShowListner=Keyboard.addListener("keyboardDidShow",
        scrollToBottom
    )
        return()=>{
             unsub(),
             keyBoardDidShowListner.remove();}
            
            ;
    }, []);

    const createRoomIfNot = async () => {
        let roomId = getRoomId(user?.userId, item.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    };

    const handleMessageSend = async () => {
        let trimmedMessage = text.trim();
        if (!trimmedMessage) return;

        try {
            let roomId = getRoomId(user?.userId, item.userId);
            const docref = doc(db, 'rooms', roomId);
            const messageRef = collection(docref, "messages");

            await addDoc(messageRef, {
                userId: user?.userId,
                text: trimmedMessage,
                profileurl: user?.profileurl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });

            setText('');




        } catch (err) {
            Alert.alert('Message', err.message);
        }
    };
  


    useEffect(()=>{
        scrollToBottom();
    },[message])
    const scrollToBottom = () => {
       setTimeout(()=>{
        scrollViewRef?.current?.scrollToEnd({ animated: true });
       },100)
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBar style='dark'/>
                <ChatRoomHeader user={item} router={router}/> 
                <View style={{ height: 3, borderBottomWidth: 1, borderColor: "#737373" }}></View>
                <View style={{ flex: 1, justifyContent: "space-between", overflow: "visible" }}>
                    <MessageList message={message} currentUser={user} scrollViewRef={scrollViewRef} />
                </View>
                <View style={{ marginBottom: hp(1.7), paddingTop: 4 }}> 
                    <View style={{
                        marginHorizontal: 6, flexDirection: "row", justifyContent: "center", padding: 4, borderWidth: 1,
                        borderColor: "#737373", borderRadius: 100
                    }}> 
                        <TextInput 
                        autoFocus={true}
                            value={text}
                            onChangeText={(v) => setText(v)}
                            placeholder='Type message...'
                            style={{ fontSize: hp(2), flex: 1, marginRight: 4, padding: 4, paddingLeft: 15 }}
                        />
                        <TouchableOpacity onPress={handleMessageSend} style={{ padding: 4, marginRight: 10, borderRadius: 100 }}>
                            <FontAwesome name="send" size={hp(2.7)} color="#737373" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
