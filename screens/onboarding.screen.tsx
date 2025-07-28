import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import OnBoarding1 from '@/assets/svgs/onboarding1'
import { OnBoardingData } from '@/configs/constants'
import { scale } from 'react-native-size-matters'

export default function OnBoardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onScrollViewRef = useRef<ScrollView>(null);






  const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetx = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(
      contentOffsetx / event.nativeEvent.layoutMeasurement.width
    )
    setActiveIndex(currentIndex);
  }
  return (
    <LinearGradient colors={["#250152", "#000000"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.container}>
        <StatusBar barStyle="light-content"/>
       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleScroll}>
         {OnBoardingData.map((item:OnBoardingDataType,index:number)=>(
          <View key={index} style={styles.slide}>
            {item.image}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
       </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    slide:{
      width: Dimensions.get("window").width,
      justifyContent:"center",
      alignItems:"center"
    },
    title:{
      color:"#fff",
      fontSize: scale(25),
      textAlign:"center",
      fontWeight:"500"

    },
    subtitle:{
      color:"#fff",
    }
})