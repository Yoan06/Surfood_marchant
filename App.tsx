import React, { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Définition des routes et leurs paramètres
export type RootStackParamList = {
  Accueil: undefined;
  Profil: undefined;
};

// On crée le stack avec le type RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Profil" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
