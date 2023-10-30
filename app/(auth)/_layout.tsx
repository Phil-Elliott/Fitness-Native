import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const AuthLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#5ff6a0",
        tabBarInactiveTintColor: "#bfbfbf",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "#332323",
          },
          null,
        ],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="grid" color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="list" color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="barbell" color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="settings" color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
