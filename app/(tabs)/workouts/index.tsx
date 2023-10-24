import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const workouts = () => {
  return (
    <View>
      <Text>Workouts</Text>
      <Link href="/workouts/1">Workouts 1</Link>
      <Link href="/workouts/2">Workouts 2</Link>
      <Link href="/workouts/addWorkout">Workouts 3</Link>
    </View>
  );
};

export default workouts;
