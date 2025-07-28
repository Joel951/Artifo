import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'

export default function index() {

    // const [ isOnBoarding, setIsOnBoarding] = useState(true);

    // useEffect(()=>{

    // },[])

  return <Redirect href="/(routes)/onboarding"/>
}