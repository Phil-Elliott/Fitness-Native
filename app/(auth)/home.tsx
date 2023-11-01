import { View, Text } from "react-native";
import Header from "../../components/home/Header";
import TopContent from "../../components/home/TopContent";

const Home = () => {
  return (
    <View className="h-full pt-10 px-4 dark:bg-gray-700 dark:text-white">
      <Header />
      <TopContent />
    </View>
  );
};

export default Home;
