import React from 'react';
import { View, FlatList } from 'react-native';
import ChatItem from './ChatItem';
import HorizontalLine from './Horizontal';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
export default function ChatList({ users,currentUser }) {
    const router=useRouter();
    const renderSeparator = () => <HorizontalLine />;

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1, paddingVertical: hp(2) }}
                keyExtractor={(_, index) => String(index)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <ChatItem currentUser={currentUser}  item={item} noBorder={index === users.length - 1} router={router} index={index}
                     />
                )}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    );
}
