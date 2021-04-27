import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const PageLoader = () => {
  return (
    <View style={styles.deadCenter}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  deadCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default PageLoader;
