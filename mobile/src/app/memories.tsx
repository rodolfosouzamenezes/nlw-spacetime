import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Icon from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";

import NlwLogo from "../assets/nlw-spacetime-logo.svg";
import colors from "tailwindcss/colors";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.locale(ptBr)

interface IMemory {
  id: string;
  coverUrl: string;
  expert: string;
  createdAt: string;
}

export default function NewMemory() {
  const { top, bottom } = useSafeAreaInsets();
  const [memories, setMemories] = useState<IMemory[]>([]);
  const router = useRouter();

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/");
  };

  const fetchMemories = async () => {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get<IMemory[]>("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemories(response.data);
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="flex-row mt-4 items-center justify-between px-8">
        <NlwLogo />
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color={"#000"} />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              className="h-10 w-10 items-center justify-center rounded-full bg-green-500"
            >
              <Icon name="plus" size={16} color={"#000"} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((m) => {
          return (
            <View key={m.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-6 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(m.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{
                    uri: m.coverUrl,
                  }}
                  className="aspect-video w-full rounded-lg"
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-100" numberOfLines={5}>
                  {m.expert}
                </Text>
                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon
                      name="arrow-right"
                      size={16}
                      color={colors.gray[200]}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
