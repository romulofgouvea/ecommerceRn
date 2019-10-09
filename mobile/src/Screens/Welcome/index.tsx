import React, { useEffect } from "react";
import { Image, StatusBar } from "react-native";

import { Container } from "./styles";

// @ts-ignore
import Logo from '../../../assets/icon.png';

function Welcome({ navigation }) {

  //Variables

  //Action Functions

  //Lifecycle Functions
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 2000);
  }, []);

  //Render Functions

  return (
    <Container>
      <StatusBar hidden />
      <Image source={Logo} resizeMode="center" />
    </Container>
  );
}

export default Welcome;
