import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@expo-google-fonts/roboto';

import blurBg from './src/assets/bg-blur.png';
import NlwLogo from './src/assets/nlw-spacetime-logo.svg';
import Stripes from './src/assets/stripes.svg';
const StyledStripes = styled(Stripes)

import { fonts } from './src/fonts';
import { styled } from 'nativewind';

export default function App() {
  const [hasLoadedFonts] = useFonts(fonts)

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className='relative flex-1 px-8 py-10 items-center bg-gray-900'
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className='absolute left-2' />

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
          className='rounded-full bg-green-500 px-5 py-2'
          activeOpacity={0.7}
        >
          <Text className='font-alt text-sm uppercase text-black'>
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
