import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";

// Query to get all workouts for a user
const GET_USER_WORKOUTS = gql`
  query GetUserWorkouts($userId: Int!) {
    userWorkouts(userId: $userId) {
      id
      date
      exercises {
        id
      }
    }
  }
`;

const Upcoming = () => {
  // Assuming you have the user ID from context, props, or state
  const userId = 1; // Replace with actual user ID

  // Use the useQuery hook to fetch user workouts
  const { loading, error, data } = useQuery(GET_USER_WORKOUTS, {
    variables: { userId: userId },
  });

  useEffect(() => {
    console.log("data changed");

    if (data) {
      console.log(data, "this is the data");
    }

    if (error) console.log(error);
  }, [data]);

  // If loading, display a loading message
  if (loading) return <Text>Loading...</Text>;
  // If there's an error, display an error message
  if (error) return <Text>Error: {error.message}</Text>;

  // If data is loaded, display the workouts
  return (
    <View>
      <Text>Upcoming Workouts:</Text>
      {/* {data.userWorkouts.map((workout) => (
        <View key={workout.id}>
          <Text>Date: {workout.date}</Text>
          {workout.exercises.map((exercise) => (
            <Text key={exercise.id}>{exercise.name}</Text>
          ))}
        </View>
      ))} */}
    </View>
  );
};

export default Upcoming;
