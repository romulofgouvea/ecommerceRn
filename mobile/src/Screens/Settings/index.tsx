import React, { useState, useEffect } from "react";
import { Switch, Text } from "react-native";

import { Container, ContainerConfig, TitleCard, LineContainer } from "./styles";
import { HeaderComponent } from "../../Components";

import { Store } from "../../Services/SecureStore";

function Settings({ navigation }) {

    //Variables
    const [notification, setNotification] = useState(false);

    //Action Functions
    function handleArrowBack() {
        navigation.goBack(null);
    }

    async function getAllInStore() {
        let not = await Store.getItem('notification');
        if (not === null) {
            await Store.setItem('notification', true);
            not = true;
        }
        setNotification(not);
    }

    async function handleChangeValueNotifications() {
        await Store.setItem('notification', !notification);
        setNotification(!notification);

    }

    //Lifecycle Functions
    useEffect(() => {
        getAllInStore();
    }, [])

    //Render Functions

    return (
        <Container>
            <HeaderComponent
                iconLeft={{ name: "arrow-back", onPress: handleArrowBack }}
                title="Configurações"
            />
            <ContainerConfig>
                <TitleCard>Notificações</TitleCard>
                <LineContainer>
                    <Text>Ativar notificações</Text>
                    <Switch onValueChange={handleChangeValueNotifications} value={notification} />
                </LineContainer>
            </ContainerConfig>
        </Container>
    );
}

export default Settings;
