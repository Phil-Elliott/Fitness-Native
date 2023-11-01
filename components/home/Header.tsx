import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
  const userDetails = useSelector((state: RootState) => state.user.userDetails);

  return (
    <View className="flex-row items-center pb-4">
      <View className="w-14 h-14 bg-gray-300 rounded-full justify-center items-center">
        <Image
          source={{ uri: userDetails?.imageUrl || "" }}
          style={{ width: 56, height: 56, borderRadius: 28 }}
        />
      </View>
      <View className="">
        <Text className="ml-4 text-base font-bold">Welcome Back,</Text>
        <Text className="ml-4 text-xl font-bold">
          {userDetails?.username?.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

export default Header;
