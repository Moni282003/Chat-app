import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP ,heightPercentageToDP} from 'react-native-responsive-screen'

export default function MessageItem({currentUser,message})
{
if(currentUser?.userId==message?.userId)
{

  return (
   <View style={{flexDirection:"row",justifyContent:"flex-end",marginBottom:7,marginRight:7}}>
    <View style={{width:widthPercentageToDP(80)}}>
        <View
        style={{
            display:"flex", alignSelf:"flex-end", padding:6,borderRadius:10,backgroundColor:"#00203fff"
        }}
        >
        <Text style={{padding:7,fontSize:heightPercentageToDP(1.9),color:"#ADEFD1FF"}}>
            {message?.text}
        </Text></View>
    </View>
   </View>
  )}

  else{
    return(
        <View style={
            {
                width:widthPercentageToDP(80),marginLeft:7, marginBottom:7
            }
        }>
            <View style={{display:"flex", alignSelf:"flex-start", padding:6,borderRadius:10,backgroundColor:"#ADEFD1FF"}}>
                <Text style={{padding:7,fontSize:heightPercentageToDP(1.9),color:"#00203fff"}}>
                    {message?.text}
                </Text>
            </View>

        </View>
    )
  }
}