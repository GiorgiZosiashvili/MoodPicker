import { useFonts } from "@expo-google-fonts/inter";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { AppProvider } from "./src/AppProvider";
import BottomTabsNavigator from "./src/Screens/BottomTabsNavigator";

export default function App() {
  let [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Kalam-Regular.ttf"),
    Bold: require("./assets/fonts/Kalam-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
