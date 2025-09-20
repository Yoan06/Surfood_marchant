import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function LocationChoice() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.icons8.com/ios-filled/100/FF4500/marker.png" }}
        style={styles.icon}
      />

      <Text style={styles.text}>Where would you like to find Surprise bags?</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/map")}
      >
        <Text style={styles.primaryText}>Use my current location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/map")}
      >
        <Text style={styles.secondaryText}>Select location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "white" 
  },
  icon: { 
    width: 100, 
    height: 100, 
    marginBottom: 20 
  },
  text: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "orangered", 
    marginBottom: 30 
  },
  primaryButton: {
    backgroundColor: "orangered",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    marginBottom: 15,
  },
  primaryText: { 
    color: "white", 
    fontWeight: "bold" 
  },
  secondaryButton: {
    backgroundColor: "lightgray",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
  },
  secondaryText: { 
    color: "black", 
    fontWeight: "bold" 
  },
});
