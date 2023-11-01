import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-xl font-bold">Workouts</Text>
      <View className="flex-row gap-4">
        <Icon name="search-outline" size={24} color="black" />
        <Icon name="filter" size={24} color="black" />
        <Icon name="calendar-outline" size={24} color="black" />
        <Icon name="add-circle-outline" size={24} color="black" />
      </View>
    </View>
  );
};

export default Header;

/*

*/
