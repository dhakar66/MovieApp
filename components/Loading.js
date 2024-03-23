import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../theme";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center"
    >
      {/* <Progress.Bar progress={0.3} width={200} />
      <Progress.Pie progress={0.4} size={50} />
      <Progress.Circle size={30} indeterminate={true} /> */}
      <Progress.CircleSnail
        thickness={12}
        size={140}
        color={theme.background}
      />
    </View>
  );
}
