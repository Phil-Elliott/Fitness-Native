import React from "react";
import { View } from "react-native";
import Header from "../../../components/workouts/Header";
import ScrollCalendar from "../../../components/workouts/ScrollCalendar";

const Workouts = () => {
  return (
    <View className="h-full pt-10 px-4 dark:bg-gray-700 dark:text-white">
      <Header />
      <ScrollCalendar />
    </View>
  );
};

export default Workouts;
