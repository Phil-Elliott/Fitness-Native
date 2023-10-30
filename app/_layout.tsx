import { Provider } from "react-redux";
import store from "../redux/store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import Constants from "expo-constants";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const StackLayout = () => {
  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
        tokenCache={tokenCache}
      >
        <Stack>
          <Stack.Screen
            name="(auth)"
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
