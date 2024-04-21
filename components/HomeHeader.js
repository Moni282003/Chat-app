import React from 'react';
import { Platform, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { Image } from 'expo-image';
import { blurhash } from '../util/Common';
import { MenuItem } from './CustomMenuItem';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { AntDesign, Feather } from '@expo/vector-icons';
const ios = Platform.OS == 'ios';

export default function HomeHeader() {
    const {logout,user}=useAuth();
    const handleLogout=async()=>{
      await logout();
    }   
    const { top } = useSafeAreaInsets();
    
    return (
        <View style={{ paddingTop: ios ? top : top + 20, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5), backgroundColor: '#6574cd', paddingBottom: hp(3), borderBottomLeftRadius: wp(7), borderBottomRightRadius: wp(7), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            <View>
                <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'white' }}>Chats</Text>
            </View>
            <View>
                        <Menu>

                        <MenuTrigger customStyles={{triggerWrapper:{}}}>
                                    <Image
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                                source={user?.profileurl}
                                placeholder={blurhash}
                                transition={500}
                            />
 
                        </MenuTrigger>
                        <MenuOptions customStyles={{optionsContainer:{
                            borderRadius:10,
                            borderCurve:'continuous',
                            marginTop:40,
                            marginLeft:-30,
                            backgroundColor:'white',
                            elevation:10
                        }}}>
                        <MenuItem text="Profile" action={(value) => console.log(value)} 
                        value={null} icon={<Feather name="user" 
                        size={hp(2.5)} color="#6574cd"/>} />
                        <Divider/>
                         <MenuItem text="SignOut" action={handleLogout} 
                        value={null} icon={<AntDesign name="logout" 
                        size={hp(2.5)} color="#6574cd"/>} />
                        </MenuOptions>
                        </Menu>
                
            </View>
        </View>
    );
}
const Divider = () => {
    return (
      <View style={{ height: 1, width: '100%', backgroundColor: '#ccc' }} />
    );
  }
  