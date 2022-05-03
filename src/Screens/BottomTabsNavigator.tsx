import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import AnalyticsScreen from "./AnalyticsScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const BottomTabs: any = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontFamily: "Bold",
        },
        tabBarActiveTintColor: "#5ADEFF",
        tabBarInctiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return <FontAwesome name="home" size={35} color={color} />;
          }
          if (route.name === "History") {
            return <FontAwesome name="history" size={35} color={color} />;
          }
          if (route.name === "Analitycs") {
            return <Ionicons name="analytics" size={35} color={color} />;
          }
        },
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "Past Moods" }}
      />
      <BottomTabs.Screen
        name="Analitycs"
        component={AnalyticsScreen}
        options={{ title: "Fancy" }}
      />
    </BottomTabs.Navigator>
  );
}
export default BottomTabsNavigator;
