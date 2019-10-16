import React, { useState, useEffect } from "react";
import { Switch, Text } from "react-native";

import { Container, ContainerConfig, TitleCard, LineContainer, ContainerProfile, Icon } from "./styles";
import { HeaderComponent } from "../../Components";

import { Store } from "../../Services/SecureStore";
import { MaterialIcons } from "@expo/vector-icons";

function Settings({ navigation }) {

    //Variables
    const [user, setUser] = useState({ name: "", email: "" });
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

        let usr = await Store.getItem('user');
        if (usr === null) {
            usr = { name: "", email: "" };
        }
        setUser(usr);
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
                <LineContainer>
                    <TitleCard>Meu Perfil</TitleCard>
                    <Icon>
                        <MaterialIcons
                            name="edit"
                            size={20}
                            color="#ACACAC"
                        />
                    </Icon>
                </LineContainer>

                <ContainerProfile>
                    <Text style={{ fontSize: 12, color: "#ACACAC" }}>Nome</Text>
                    <Text style={{ fontSize: 16 }}>{user.name}</Text>
                    <Text style={{ fontSize: 12, paddingTop: 8, color: "#ACACAC" }}>Email</Text>
                    <Text style={{ fontSize: 16 }}>{user.email}</Text>
                </ContainerProfile>

                <TitleCard> Notificações</TitleCard>
                <LineContainer>
                    <Text>Todas as notificações</Text>
                    <Switch onValueChange={handleChangeValueNotifications} value={notification} thumbColor={notification ? "#4d7d13" : "#868686"} trackColor={{ true: "#ACACAC", false: "#ACACAC" }} ios_backgroundColor="#4d7d13" />
                </LineContainer>
            </ContainerConfig>
        </Container>
    );
}

export default Settings;
