import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const routines = () => {
  return (
    <View>
      <Text>Routines</Text>
      <Link href="/routines/1">Routines 1</Link>
      <Link href="/routines/2">Routines 2</Link>
      <Link href="/routines/addRoutine">Routines 3</Link>
    </View>
  );
};

export default routines;
