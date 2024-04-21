// CustomMenuItem.js
import React from 'react';
import { Text, View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

export const MenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        {icon && <Text style={{ marginRight: 10 }}>{icon}</Text>}
        <Text>{text}</Text>
      </View>
    </MenuOption>
  );
};
