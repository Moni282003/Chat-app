import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ message, currentUser,scrollViewRef }) {
  // Check if message is undefined or not an array
  if (!message || !Array.isArray(message)) {
    return null; // or return an error message or empty view
  }

  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
      {
        message?.map((message, index) => (
          <MessageItem currentUser={currentUser} key={index} message={message} />
        ))
      }
    </ScrollView>
  )
  
}
