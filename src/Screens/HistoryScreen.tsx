import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useAppContext } from "../AppProvider";
import MoodItemRow from "../components/MoodItemRow";

const HistoryScreen = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.View}>
      <ScrollView>
        {appContext.moodList
          .slice()
          .reverse()
          .map((item) => (
            <MoodItemRow item={item} key={item.timestamp} />
          ))}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
});
