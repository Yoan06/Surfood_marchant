import React, { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Profil de SurFood 👤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#4CAF50",
  },
});
