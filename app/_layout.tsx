import { Slot } from "expo-router";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View className="flex-1 flex flex-col">
      <Header />
      <View className="flex-1">
        <Slot />
      </View>
      <Footer />
    </View>
  );
}
