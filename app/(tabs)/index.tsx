import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';
import { Button } from '@react-navigation/elements';
import { Collapsible } from '@/components/Collapsible';

const responseType: any = { price: 123 };

export default function HomeScreen() {
  const [price, setPrice] = useState(0);

  useEffect(()=>{
	  console.log(`${process.env.API_NINJAS_KEY}`);
    const url = 'https://api.api-ninjas.com/v1/bitcoin';
    const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': `${process.env.EXPO_PUBLIC_API_NINJAS_KEY}`
        }
        };
    fetch(url, options)
        .then((response: any)=>response.json())
        .then((data)=>{
            console.log(data)
            setPrice(data.price);
        })
        .catch((e)=>console.log(e))
  },[]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">1 BTC = 1 BTC </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">1 BTC = ${(price * 100 )/ 100} USD </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button>HODL <IconSymbol size={28} name="house.and.flag.circle" color={'white'} /></Button>
        <Button>TURN UP <IconSymbol size={28} name="house" color={'white'} /></Button>
        
        <Collapsible title="RIZZionary">
            <ThemedText type="subtitle">HODL <IconSymbol size={28} name="house.and.flag.circle" color={'white'} /></ThemedText>
            <ThemedText type="default">
                HODL brings up your Bitcoin Addy so you can get some more coin that you Hold Onto for Dear Life!
            </ThemedText>
            <ThemedText type="subtitle">TURN UP <IconSymbol size={28} name="house" color={'white'} /></ThemedText>
            <ThemedText type="default">
                TURN UP and send some Bitcoin to make payments and turn yo clique up!
            </ThemedText>
        </Collapsible>

      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
