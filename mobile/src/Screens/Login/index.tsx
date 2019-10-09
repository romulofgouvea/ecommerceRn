import React from "react";
import { StatusBar } from "react-native";

import { Container, LoginImage, LoginButton, LoginText } from "./styles";

import Logo from '../../../assets/icon.png';
import { FacebookApi } from '../../Services/Facebook';

function Login({ navigation }) {

  //Variables

  //Action Functions
  async function handleLoginFacebook() {
    try {
      const token = await FacebookApi.loginAsync();

      console.log('token', token);
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleLoginGoogle() {

  }

  //Lifecycle Functions

  //Render Functions

  return (
    <Container>
      <StatusBar hidden />

      <LoginImage source={Logo} resizeMode="center" />
      <LoginButton onPress={handleLoginFacebook} buttonColor="blue">
        <LoginText>Login com Facebook</LoginText>
      </LoginButton>

      <LoginButton onPress={handleLoginGoogle} buttonColor="red">
        <LoginText>Login com Google</LoginText>
      </LoginButton>
    </Container>
  );
}

export default Login;
