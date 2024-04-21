import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ChatItem({ item, noBorder, router }) {
    console.log("Moni",item)
    const openChatRoom=()=>{
        router.push({pathname:'/chatRoom',params:item})
    }
    return (
        <TouchableOpacity onPress={openChatRoom} activeOpacity={0.8} style={[styles.container, noBorder ? null : styles.border]}>
            <Image source={{ uri: item?.profileurl }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.username}>{item?.username}</Text>
                    <Text style={styles.time}>Time</Text>
                </View>
                <Text style={styles.message}>Last Message</Text>
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
        fontSize: hp(2),
        fontWeight: '600',
        color: '#333',
    },
    time: {
        fontSize: hp(1.6),
        color: '#888',
    },
    message: {
        fontSize: hp(1.6),
        color: '#888',
    },
});
