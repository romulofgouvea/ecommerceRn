import React, { useEffect } from "react";
import { Image, StatusBar } from "react-native";

import { Container } from "./styles";
import { Store } from "../../Services/SecureStore";

// @ts-ignore
import Logo from '../../../assets/icon.png';

function Welcome({ navigation }) {

    //Variables

    //Action Functions
    async function confirmToken() {
        try {
            let token = await Store.getItem("token");

            if (token) {
                console.log(token)
                navigation.navigate("Main");
                return;
            }

            setTimeout(() => {
                navigation.navigate('Login')
            }, 2000);
        } catch (e) {
            console.error(e);
        }
    }

    //Lifecycle Functions
    useEffect(() => {
        confirmToken();
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
