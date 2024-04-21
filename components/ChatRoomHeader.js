// ChatRoomHeader.js
import { View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function ChatRoomHeader({ user, router }) {
    console.log("Hi", user);
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: false,
                headerLeft: () => (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name="back" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            {user && user.profileurl && (
                                <Image
                                    source={{ uri: user.profileurl }} // Ensure that the source is provided as an object with uri property
                                    style={{
                                        height: hp(4.5),
                                        aspectRatio: 1,
                                        borderRadius: 100,
                                    }}
                                />
                                
                            )}
                            <Text style={{fontSize:hp(2.5),color:"gray",fontWeight:"bold"}}>
                                {user?.username}
                            </Text>

                        </View>
                    </View>
                ),
                headerRight:()=>(
                    <View style={{flexDirection:"row", alignItems:"center",gap:20}}>
                        <Ionicons name="call" size={24} color="#737373" />
                        <FontAwesome name="video-camera" size={24} color="#737373" />

                    </View>
                )
            }}
        />
    );
}
