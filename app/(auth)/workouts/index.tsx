import React, { useState } from "react";
import { View } from "react-native";
import {
  Upcoming,
  Header,
  ScrollCalendar,
  Activity,
} from "../../../components/workouts";

const Workouts = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
    <View className="h-full pt-10 px-4 dark:bg-gray-700 dark:text-white">
      <Header />
      <ScrollCalendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <Upcoming />
      <Activity />
    </View>
  );
};

export default Workouts;

/*

- Get scroll callander working right
     - Need to have a state that keeps the day that the user is currently on (should this persist or should it go back once user leaves page?)
     - Have the selected date have a different color for now or style
     - Start with the current date
     - Change only when a user selects a different date by clicking on it

- Decide where to pull data and how
- Decide how to display data



*/
