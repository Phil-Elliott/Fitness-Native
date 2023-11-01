import React from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import Header from "../../../components/workouts/Header";

const Workouts = () => {
  return (
    <View className="h-full pt-10 px-4 dark:bg-gray-700 dark:text-white">
      <Header />
    </View>
  );
};

export default Workouts;

/*
<View>
      <Text>Workouts</Text>
      <Link href="/workouts/1">Workouts 1</Link>
      <Link href="/workouts/2">Workouts 2</Link>
      <Link href="/workouts/addWorkout">Workouts 3</Link>
    </View>

  


*/
