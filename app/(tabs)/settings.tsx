import React from "react";
import { View, Text, Button } from "react-native";
import { useColorScheme } from "nativewind";

const Settings = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className={`flex-1 justify-center items-center dark:bg-blue-300`}>
      <Text className={`text-4xl font-bold`}>Settings</Text>
      <Button
        title="Toggle Theme"
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      />
    </View>
  );
};

export default Settings;
