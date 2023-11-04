import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "@clerk/clerk-expo";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const [token, setToken] = useState<String | null>("");

  const { isSignedIn } = useAuth();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    if (isSignedIn) {
      fetchToken();
    }
  }, [isSignedIn, getToken]);

  const httpLink = new HttpLink({
    uri: "http://10.0.2.2:3000/graphql",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const client = new ApolloClient({
    link: httpLink,
    // uri: "http://10.0.2.2:3000",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
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
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="routines"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Icon name="list" color={color} size={size} />;
            },
          }}
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Icon name="barbell" color={color} size={size} />;
            },
          }}
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Icon name="settings" color={color} size={size} />;
            },
          }}
          redirect={!isSignedIn}
        />
      </Tabs>
    </ApolloProvider>
  );
};

export default AuthLayout;
