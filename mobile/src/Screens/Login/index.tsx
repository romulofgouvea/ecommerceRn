import React, { useState, useEffect } from "react";
import { StatusBar, ActivityIndicator } from "react-native";

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
            let data = {
                provider: "",
                token: ""
            };

            switch (provider) {
                case "FACEBOOK":
                    data = {
                        provider,
                        token: await FacebookApi.loginAsync()
                    };
                    break;
                case "GOOGLE":
                    data = {
                        provider,
                        token: await GoogleApi.loginAsync()
                    };
                    break;
            }
            console.log(data);
            const response = await api.post("/users", data);
            const { token, user } = response.data;

            Store.setItem("token", token);
            Store.setItem("user", user);
            if (token) {
                navigation.navigate("Main");
            }
        } catch (error) {
            console.log("Opss...", error);
        } finally {
            setLoading(false);
        }
    }

    //Lifecycle Functions
    useEffect(() => {
        const token = Store.getItem("token");
        if (token) {
            navigation.navigate("Main");
        }
    }, []);
    //Render Functions

    return (
        <Container>
            <StatusBar hidden />

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

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </Container>
    );
}

export default Login;
