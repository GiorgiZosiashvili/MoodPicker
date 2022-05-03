import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useState } from "react";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";

import { MoodOptionsType } from "../../Types";

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const MoodOptions: MoodOptionsType[] = [
  { emoji: "🧑‍💻", description: "Studious" },
  { emoji: "😊", description: "Happy" },
  { emoji: "🥰", description: "Lovely" },
  { emoji: "😔", description: "Lonely" },
  { emoji: "😈", description: "Evil" },
];
type MoodPickerProps = {
  handleSelectedMood: (moodOption: MoodOptionsType) => void;
};
const imageSrc = require("../../assets/butterflies.png");

const MoodPicker = ({ handleSelectedMood }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionsType>();
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectedMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectedMood, selectedMood]);
  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? 1 : 0.5,
      transform: [{ scale: selectedMood ? 1 : 0.8 }],
    }),
    [selectedMood]
  );

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={imageSrc} />
        <Pressable
          style={styles.pressable}
          onPress={() => setHasSelected(false)}
        >
          <Text style={styles.pressableText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now ?</Text>
      <View style={styles.moodOption}>
        {MoodOptions.map((option) => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                selectedMood?.emoji === option.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}
            >
              <Text style={{ fontSize: 30 }}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {option.emoji === selectedMood?.emoji
                ? option.description
                : undefined}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.pressable, buttonStyle]}
        onPress={handleSelect}
      >
        <Text style={styles.pressableText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

export default MoodPicker;

const styles = StyleSheet.create({
  moodOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 350,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#454C73",
  },
  descriptionText: {
    color: "#454C73",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Bold",
  },
  container: {
    height: 230,
    borderWidth: 2,
    borderColor: "#454C73",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  pressable: {
    backgroundColor: "#454C73",
    width: 150,
    borderRadius: 20,
    alignSelf: "center",
    padding: 10,
  },
  pressableText: {
    color: "white",
    fontFamily: "Bold",
    textAlign: "center",
  },
  heading: {
    color: "white",
    fontSize: 20,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "Bold",
  },
  image: {
    alignSelf: "center",
  },
});
