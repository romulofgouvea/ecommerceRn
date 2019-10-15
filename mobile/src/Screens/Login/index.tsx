import React, { useState } from "react";
import { StatusBar, ActivityIndicator, Alert } from "react-native";

import { Container, LoginImage, LoginButton, LoginText } from "./styles";

// @ts-ignore
import Logo from "../../../assets/icon.png";

import { GoogleApi } from "../../Services/Google";
import { FacebookApi } from "../../Services/Facebook";

import { Store } from "../../Services/SecureStore";

import api from "../../Services";

function Login({ navigation }) {
    //Variables
    const [loading, setLoading] = useState(false);

    //Action Functions
    async function handleLoginProvider(provider) {
        setLoading(true);
        try {
            let token = "";
            switch (provider) {
                case "FACEBOOK":
                    token = await FacebookApi.loginAsync();
                    break;
                case "GOOGLE":
                    token = await GoogleApi.loginAsync();
                    break;
            }

            const res = await api.post("/users", { provider, token })

            if (!res) {
                throw "Não achamos o seu usuário :("
            }

            await Store.setItem("token", res.data.token);
            await Store.setItem("user", res.data.user);

            navigation.navigate("Main");

        } catch (error) {
            console.log(error)
            Alert.alert(
                'Error',
                'Ocorreu um erro ao entrar',
                [
                    { text: 'Vou tentar mais tarde :)' },
                ],
                { cancelable: false }
            );
        } finally {
            setLoading(false);
        }
    }

    //Lifecycle Functions

    //Render Functions
    return (
        <Container>
            <StatusBar hidden />

            {loading
                ? <ActivityIndicator size="large" color="#0000ff" />
                : (
                    <>
                        <LoginImage source={Logo} resizeMode="center" />
                        <LoginButton
                            onPress={() => handleLoginProvider("FACEBOOK")}
                            buttonColor="blue"
                        >
                            <LoginText>Login com Facebook</LoginText>
                        </LoginButton>

                        <LoginButton
                            onPress={() => handleLoginProvider("GOOGLE")}
                            buttonColor="red"
                        >
                            <LoginText>Login com Google</LoginText>
                        </LoginButton>
                    </>
                )}
        </Container>
    );
}

export default Login;
