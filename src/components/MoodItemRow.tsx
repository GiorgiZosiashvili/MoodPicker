import {
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
} from "react-native";
import React, { useCallback } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

import format from "date-fns/format";
import { useAppContext } from "../AppProvider";
import Reanimated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
const maxSwipe = 80;

const MoodItemRow = ({ item }) => {
  const appContext = useAppContext();
  const handleDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);
  const deleteWithDelay = useCallback(() => {
    setTimeout(() => {
      handleDelete();
    }, 500);
  }, []);
  const translateX = useSharedValue(0);
  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    []
  );
  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: (event) => {
        translateX.value = event.translationX;
      },
      onEnd: (event) => {
        if (Math.abs(event.translationX) > maxSwipe) {
          translateX.value = withTiming(1000 * Math.sign(event.translationX));
          runOnJS(deleteWithDelay)();
        } else {
          translateX.value = withTiming(0);
        }
      },
    },
    []
  );
  return (
    <PanGestureHandler
      activeOffsetX={[-1, 1]}
      activeOffsetY={[-100, 100]}
      onGestureEvent={onGestureEvent}
    >
      <Reanimated.View style={[styles.moodItem, cardStyle]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}> {item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "d ccc, MMM yyyy, 'at' hh:mmaaa  ")}
        </Text>
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

export default MoodItemRow;

const styles = StyleSheet.create({
  moodValue: {
    textAlign: "center",
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: "center",
    color: "#87677B",
    fontFamily: "Regular",
  },
  moodItem: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moodDescription: {
    fontFamily: "Bold",
    fontSize: 18,
    color: "#454C73",
  },
  iconAndDescription: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteText: {
    fontFamily: "Bold",
    color: "#80d9ff",
  },
});
