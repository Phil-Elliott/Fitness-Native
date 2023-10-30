import { ActivityIndicator, View } from "react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;

// import { Redirect } from "expo-router";

// export default function Index() {
//   return <Redirect href="/login" />;
// }
