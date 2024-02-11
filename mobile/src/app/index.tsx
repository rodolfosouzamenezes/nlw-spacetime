import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@expo-google-fonts/roboto';
import colors from 'tailwindcss/colors';
import * as SecureStore from 'expo-secure-store';

import blurBg from '../assets/bg-blur.png';
import NlwLogo from '../assets/nlw-spacetime-logo.svg';
import Stripes from '../assets/stripes.svg';
const StyledStripes = styled(Stripes)

import { fonts } from '../fonts';
import { styled } from 'nativewind';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { api } from '../lib/axios';
import { useRouter } from 'expo-router';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/8e4a456a09fdcd1fcb64',
};

export default function Home() {
  const [hasLoadedFonts] = useFonts(fonts)
  const router = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '8e4a456a09fdcd1fcb64',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );

  const getRedirectUrl = () => {
    console.log(makeRedirectUri({
      scheme: 'nlwspacetime'
    }),);
  }

  const handleGithubOauth = async (code: string) => {
    const response = await api.post('/auth', {
      code
    })

    const {token} = response.data  
    await SecureStore.setItemAsync('token', token)
    console.log('Token: ', token);

    router.push('/memories')
  }

  useEffect(() => {
    // getRedirectUrl()
    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOauth(code)
    }
  }, [response]);

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className='relative flex-1 px-8 py-10 items-center bg-gray-900'
      imageStyle={{ position: 'absolute', left: '-99%' }}
    >
      <StyledStripes style={{position: 'absolute', left: '0%'}} />

      <View className='flex-1 items-center justify-center gap-6'>
        <NlwLogo />
        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>
            Sua cápsula do tempo
          </Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => signInWithGithub()}
          activeOpacity={0.7}
          className='rounded-full bg-green-500 px-5 py-2'
        >
          <Text className='font-alt text-sm uppercase text-black'>
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" backgroundColor={colors.gray[950]} translucent  />
    </ImageBackground>
  );
}