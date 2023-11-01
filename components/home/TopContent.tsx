import { View, Text, Button } from "react-native";
import React from "react";

const TopContent = () => {
  return (
    <View className="bg-gray-300 rounded p-4">
      <Text className="text-2xl font-bold pb-4">Today's Workout</Text>
      <Button
        title="Begin Workout"
        onPress={() => console.log("TODO: Add a workout component here")}
      />
    </View>
  );
};

export default TopContent;

/*

- Could have dif pics to be displayed for each message
- Plug in the messages
- Plug in the links when button is clicked

*/
