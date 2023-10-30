import { Provider } from "react-redux";
import store from "../redux/store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import Constants from "expo-constants";
import { View } from "react-native";

const StackLayout = () => {
  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
      >
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ClerkProvider>
    </Provider>
  );
};

export default StackLayout;
