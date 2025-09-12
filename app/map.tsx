import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

// Déclarations vides par défaut
let MapView: any = null;
let Marker: any = null;

// ⚡ Import dynamique sécurisé
if (Platform.OS !== "web") {
  import("react-native-maps").then((Maps) => {
    MapView = Maps.default;
    Marker = Maps.Marker;
  });
}

export default function MapScreen() {
  const router = useRouter();
  const [region, setRegion] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === "web") return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // 📌 Version WEB (Google Maps Embed)
  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1 }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Paris,France`}
        />
        <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/store-address")}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 📌 Version MOBILE (React Native Maps)
  if (!region || !MapView) {
    return (
      <View style={styles.loading}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        <Marker coordinate={region} />
      </MapView>

      <TextInput style={styles.search} placeholder="Rechercher un lieu ..." />

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/store-address")}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  search: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  nextButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  nextText: { color: "white", fontWeight: "bold" },
});
