import { View, Text } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className="flex-row items-center pb-4">
      <View className="w-14 h-14 bg-gray-300 rounded-full justify-center items-center">
        <Text className="text-center text-xl font-bold">P</Text>
      </View>
      <View className="">
        <Text className="ml-4 text-base font-bold">Welcome Back,</Text>
        <Text className="ml-4 text-xl font-bold">Phil</Text>
      </View>
    </View>
  );
};

export default Header;
