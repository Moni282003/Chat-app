import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { formatDate, getRoomId } from '../util/Common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../fireBaseConfig';

export default function ChatItem({ item, noBorder, router,currentUser }) {

    const [lastmess,setLastMess]=useState(undefined)
    useEffect(() => {

        let roomId = getRoomId(currentUser?.userId, item.userId);
        const docref = doc(db, 'rooms', roomId);
        const messageRef = collection(docref, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (querySnapshot) => {
            let allMessages = querySnapshot.docs.map(doc => {return doc.data()}
        );
        setLastMess(allMessages[0]? allMessages[0]:null)
        });

        return unsub;
    }, []);

const time=()=>{

    if(lastmess){
        let date=lastmess?.createdAt;
        return formatDate(new Date(date?.seconds*1000))
    }
    else{
        return "Time"
    }
}

const last=()=>{
if(typeof lastmess=="undefined") return 'Loading...'
if(lastmess){
    if(currentUser?.userId==lastmess?.userId) return "You: "+lastmess?.text;
    return lastmess?.text

}
else{
    return 'Say Hi👋'
}
}
    const openChatRoom=()=>{
        router.push({pathname:'/chatRoom',params:item})
    }
    return (
        <TouchableOpacity onPress={openChatRoom} activeOpacity={0.8} style={[styles.container, noBorder ? null : styles.border]}>
            <Image source={{ uri: item?.profileurl }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.username}>{item?.username}</Text>
                    <Text style={styles.time}>
                        {
                            time()
                        }
                    </Text>
                </View>
                {
                    last()=="Say Hi👋"?
                    <Text style={{
                        fontSize: hp(1.9),
                         color: 'green',
                         fontWeight:"bold"
                    }}>
                    {last()}               
                    </Text>

                    :
                    <Text style={{fontSize: hp(1.9),
                        color: 'blue',
                        fontWeight:"bold"}}>
                    {last()}               
                    </Text>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically in the center
        marginHorizontal: hp(2), // Add horizontal margin instead of margin
        paddingVertical: hp(2), // Use padding instead of paddingBottom
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        height: hp(6),
        width: hp(6),
        borderRadius: hp(3),
    },
    content: {
        flex: 1,
        marginLeft: hp(2),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items vertically in the center
    },
    username: {
        fontSize: hp(2.1),
        fontWeight: 'bold',
        color: 'midnightblue',
    },
    time: {
        fontSize: hp(1.6),
        color: '#888',
    },
   
});
