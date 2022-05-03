import { ImageBackground, Pressable, StyleSheet } from "react-native";
import MoodPicker from "../components/MoodPicker";
import { useAppContext } from "../AppProvider";
const imageUrl =
  "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80";
const HomeScreen = () => {
  const appContext = useAppContext();

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center" }}
      source={{ uri: imageUrl }}
    >
      <MoodPicker handleSelectedMood={appContext.handleSelectMood} />
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: "lightgreen",
  },
});
