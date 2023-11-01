import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <View className="flex-1 justify-center items-center dark:bg-blue-300">
      <Text className="text-4xl font-bold">Settings</Text>
      <Button
        title="Toggle Theme"
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      />
      <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
        <Ionicons name="log-out-outline" size={24} color={"#f1f"} />
      </Pressable>
    </View>
  );
};

export default Settings;
