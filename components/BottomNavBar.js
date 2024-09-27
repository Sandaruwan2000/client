import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavBar = ({ navigation }) => {
  return (
    <View className="flex-row justify-around py-5 bg-green-50 border-t border-gray-300 rounded-lg">
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Icon name="notifications" size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Bin')}>
        <Icon name="trash" size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EcoBin')}>
        <Icon name="leaf" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;