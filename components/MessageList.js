import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({message}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
     {
        message.map((message,index)=>{
            return(
                <MessageItem key={index} message={message} />
            )
        })
     }
    </ScrollView>
  )
}