import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";
import groupBy from "lodash/groupBy";
import { useAppContext } from "../AppProvider";
import { theme } from "../../Theme";

const AnalyticsScreen = () => {
  const appContext = useAppContext();

  const data = Object.entries(groupBy(appContext.moodList, "mood.emoji")).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    })
  );

  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={145}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 35 } }}
        data={data}
      />
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});