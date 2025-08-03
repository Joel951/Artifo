import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import OnBoarding1 from '@/assets/svgs/onboarding1'
import { OnBoardingData } from '@/configs/constants'
import { scale, verticalScale } from 'react-native-size-matters'
import { useFonts } from 'expo-font'
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'

export default function OnBoardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onScrollViewRef = useRef<ScrollView>(null);
  let [fontsLoaded, fontError] = useFonts({
    Formula1: require('../assets/fonts/Formula1Regular.ttf')
  })

  if(!fontsLoaded && !fontError) {
    return null;
  }


  const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetx = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(
      contentOffsetx / event.nativeEvent.layoutMeasurement.width
    )
    setActiveIndex(currentIndex);
  }

  const handleSkip = async () => {
    const nextIndex = activeIndex + 1;
    if(nextIndex < OnBoardingData.length){
      onScrollViewRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextIndex,
        animated: true
      });
      setActiveIndex(nextIndex);
    } else{
      await AsyncStorage.setItem('onboarding','true');
      router.push("/(routes)/home/index");
    }
  }
  return (
    <LinearGradient colors={["#250152", "#000000"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Pressable style={styles.skipContainer} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
          <AntDesign name="arrowright" size={scale(16)} color="white" />
        </Pressable>
       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleScroll} ref={onScrollViewRef}>
         {OnBoardingData.map((item:OnBoardingDataType,index:number)=>(
          <View key={index} style={styles.slide}>
            {item.image}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
       </ScrollView>
       <View style={styles.pagination}>
        {OnBoardingData.map((_,index)=>(
          <View key={index} style={[styles.dot,{opacity:activeIndex === index? 1:0.3}]}/>
        ))}
       </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontSize: scale(18),
    fontFamily: "Formula1",
    textAlign: "center",
    fontWeight: "500"

  },
  subtitle: {
    width: scale(300),
    marginHorizontal: "auto",
    paddingTop: verticalScale(10),
    color: "#9a9999",
    fontSize: scale(10),
    fontFamily: "Formula1",
    textAlign: "center",
    fontWeight: "400"
  },
  pagination: {
    position: "absolute",
    bottom: verticalScale(70),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8)
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    backgroundColor: "#fff",
    marginHorizontal: scale(2)
  },
  skipContainer: {
    position: 'absolute',
    top: verticalScale(50), // Adjusted to be more visible
    right: scale(20),
    flexDirection: 'row',
    gap: scale(5),
    padding: scale(10), // Added padding for larger hit area
    zIndex: 10, // Ensure it's above other components
  },
  skipText: {
    color: "#fff",
    fontSize: scale(12),
    fontFamily: "Formula1",
    fontWeight: "400"
  }
})