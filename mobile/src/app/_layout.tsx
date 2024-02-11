import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { styled } from "nativewind";

import { fonts } from "../fonts";
import blurBg from "../assets/bg-blur.png";
import Stripes from "../assets/stripes.svg";
const StyledStripes = styled(Stripes);

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null| boolean>(null)

  const [hasLoadedFonts] = useFonts(fonts);

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: "absolute", left: "-99%" }}
    >
      <StatusBar style="light" translucent />
      <StyledStripes style={{ position: "absolute", left: "0%" }} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  );
}
