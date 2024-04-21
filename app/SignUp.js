import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable, Alert, StatusBar, TextInput, KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, Foundation, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const handleRegister = async () => {
        if (!email || !password || !username || !profile) {
            Alert.alert("Sign Up", "Please fill all the fields!");
            return;
        }
        setLoading(true);
        let response = await register(email, password, username, profile);
        setLoading(false);
        console.log('Got result:', response);
        if (!response.success) {
            Alert.alert('Sign Up', response.msg);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5), flex: 1, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ height: hp(25) }} resizeMode="contain" source={require('../assets/register.png')} />
                </View>
                <View style={{ marginTop: hp(4), paddingHorizontal: wp(5) }}>
                    <Text style={{ fontSize: hp(4), fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Sign Up</Text>
                    <View style={{ marginTop: hp(4) }}>
                        <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: wp(4), marginBottom: hp(2) }}>
                            <AntDesign name="user" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={setUsername}
                                value={username}
                                style={{ flex: 1, fontSize: hp(2), fontWeight: 'bold', color: '#333' }}
                                placeholder="Enter Username"
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: wp(4), marginBottom: hp(2) }}>
                            <Foundation name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={setEmail}
                                value={email}
                                style={{ flex: 1, fontSize: hp(2), fontWeight: 'bold', color: '#333', paddingLeft: 4 }}
                                placeholder="Enter Email"
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: wp(4), marginBottom: hp(2) }}>
                            <MaterialCommunityIcons name="form-textbox-password" size={hp(2.7)} color="gray" />
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={setPassword}
                                value={password}
                                style={{ flex: 1, fontSize: hp(2), fontWeight: 'bold', color: '#333', paddingLeft: 4 }}
                                placeholder="Enter Password"
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: wp(4), marginBottom: hp(2) }}>
                            <AntDesign name="profile" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={setProfile}
                                value={profile}
                                style={{ flex: 1, fontSize: hp(2), fontWeight: 'bold', color: '#333', paddingLeft: 4 }}
                                placeholder="Enter Profile"
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <TouchableOpacity onPress={handleRegister} activeOpacity={0.9} style={{ height: hp(6.5), backgroundColor: '#1e90ff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: hp(2) }}>
                            <Text style={{ fontSize: hp(2.7), color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(2) }}>
                            <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', color: '#666' }}>Already have an account?</Text>
                            <Pressable onPress={() => router.push('SignIn')}>
                                <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', color: '#1e90ff', marginLeft: wp(1) }}>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
