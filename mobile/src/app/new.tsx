import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";
import { useState } from "react";

import NlwLogo from "../assets/nlw-spacetime-logo.svg";

export default function NewMemory() {
  const { top, bottom } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="flex-row mt-4 items-center justify-between">
        <NlwLogo />
        <Link href="/memories" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Icon name="arrow-left" size={16} color={"#fff"} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: colors.zinc[800], true: colors.violet[900] }}
            thumbColor={isPublic ? colors.violet[500] : colors.zinc[400]}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar meméria pública
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 justify-center items-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color={"#fff"} />
            <Text className="font-body text-sm text-gray-200">
              Adiconar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          multiline
          placeholder="Fique livre para adiconar fotos, vídeos e relatos sebre essa experiência que você quer lembrar para sempre..."
          placeholderTextColor={colors.zinc[600]}
          className="p-0 font-body text-lg text-gray-50"
        />

        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.7}
          className="rounded-full bg-green-500 items-center px-5 py-2 mb-4"
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
