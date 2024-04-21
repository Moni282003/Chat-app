import React from 'react'
import { Platform, Text, View } from 'react-native'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
const ios=Platform.OS==="ios"
export default function CustomeKeyBoardView({children}) {
    return (
      <KeyboardAvoidingView
      behavior={ios?'padding':'height'}
      style={{flex:1}}
      >
        <ScrollView
        style={{flex:1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
        </KeyboardAvoidingView>
        
    )
  
}
