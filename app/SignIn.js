import React, { useRef, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Pressable, Alert, TextInput, ActivityIndicator } from 'react-native'
import { StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import { useAuth } from '../context/authContext';

export default function SignIn() {
    const [email,setemail]=useState()
    const [pass,setpass]=useState()
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("Hi")
        console.log("Byee",email,pass)
        if (!email || !pass) {
            Alert.alert("Sign In", "Please fill all the fields!");
            return;
        }
        setLoading(true);
        const response = await login(email, pass);
        alert(response.msg)
        setLoading(false);
        if (!response.success) {
            Alert.alert("Sign In", response.msg);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5), flex: 1, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ height: hp(25) }} resizeMode="contain" source={require('../assets/login.png')} />
                </View>
                <View style={{ marginTop: hp(5), paddingHorizontal: wp(5) }}>
                    <Text style={{ fontSize: hp(4), fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>Sign In</Text>
                    <View style={{ marginTop: hp(3) }}>
                        <View style={{ height: hp(7), flexDirection: 'row', backgroundColor: 'lightgray', alignItems: 'center', borderRadius: hp(3.5), paddingHorizontal: wp(4) }}>
                            <Foundation name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                    onChangeText={(v)=>{setemail(v)}}
                                    style={{ flex: 1, fontSize: hp(2), color: 'gray', marginLeft: wp(2) }}
                                placeholder="Enter Email"
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ marginTop: hp(2) }}>
                            <View style={{ height: hp(7), flexDirection: 'row', backgroundColor: 'lightgray', alignItems: 'center', borderRadius: hp(3.5), paddingHorizontal: wp(4) }}>
                                <MaterialCommunityIcons name="form-textbox-password" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={(v)=>{setpass(v)}}
                                    secureTextEntry={true}
                                    style={{ flex: 1, fontSize: hp(2), color: 'gray', marginLeft: wp(2) }}
                                    placeholder="Enter Password"
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            <Text style={{ fontSize: hp(1.8), textAlign: 'right', marginTop: hp(1), color: 'gray' }}>Forget Password?</Text>
                        </View>
                        <View style={{ marginTop: hp(3) }}>
                            {loading ? (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator/>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleLogin} activeOpacity={0.9} style={{ height: hp(6.5), backgroundColor: 'indigo', borderRadius: hp(3.25), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: hp(2.7), color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp(3) }}>
                            <Text style={{ fontSize: hp(1.8), color: 'gray', fontWeight: 'bold' }}>Don't have an account? </Text>
                            <Pressable onPress={() => router.push('SignUp')}>
                                <Text style={{ fontSize: hp(1.8), color: 'indigo', fontWeight: 'bold' }}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
