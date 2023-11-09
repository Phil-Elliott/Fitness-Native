import React from "react";
import { View } from "react-native";
import {
  Upcoming,
  Header,
  ScrollCalendar,
  Activity,
} from "../../../components/workouts";

const Workouts = () => {
  return (
    <View className="h-full pt-10 px-4 dark:bg-gray-700 dark:text-white">
      <Header />
      <ScrollCalendar />
      <Upcoming />
      <Activity />
    </View>
  );
};

export default Workouts;
