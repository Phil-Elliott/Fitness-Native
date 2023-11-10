import React, { useState } from "react";
import { View } from "react-native";
import {
  Upcoming,
  Header,
  ScrollCalendar,
  Activity,
} from "../../../components/workouts";
import { useQuery, gql } from "@apollo/client";

// Query to get all workouts for a user for the selected day
const GET_USER_WORKOUTS = gql`
  query GetUserWorkouts($userId: Int!, $date: String!) {
    upcomingWorkouts: userWorkouts(
      where: { userId: $userId, status: PLANNED, date: $date }
    ) {
      id
      date
      exercises {
        id
      }
    }
    completedWorkouts: userWorkouts(
      where: { userId: $userId, status: COMPLETED, date: $date }
    ) {
      id
      date
      exercises {
        id
      }
    }
  }
`;

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

- Write tests for component (ScrollCalendar, Upcoming, Activity)
- Add data on backend to display on frontend
- Update tests on backend to make sure that the resolver is working
- Check out that prisma testing site to see what other tests i should be setting up
- Write tests for backend

- Look into docker and see how it could beneifit other project (maybe this one too)
- Look into add a CI/CD pipeline to this project and other too

- Build out and get the upcoming and activity components working
- Get ItemActionCard working

- Link to the add workout page
- figure out a design for that page
- Build it out
- Connect to server
- Write tests for it (maybe before building it out)


- Add colors

*/
