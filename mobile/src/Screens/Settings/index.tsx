import React, { useState, useEffect } from "react";
import { Switch, Text, Alert } from "react-native";

import { Container, ContainerConfig, TitleCard, LineContainer, ContainerProfile, Icon, ContainerEdit, ProfileHeaderInput, ProfileInput, ButtonCheckout } from "./styles";
import { HeaderComponent } from "../../Components";

import { Store } from "../../Services/SecureStore";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../Services";

function Settings({ navigation }) {

    //Variables
    const [user, setUser] = useState({ _id: "", name: "", email: "" });
    const [notification, setNotification] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    //Action Functions
    function handleArrowBack() {
        navigation.goBack(null);
    }

    async function handleEditProfile() {
        setIsEdit(!isEdit);
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

    async function handleSaveEdit(newUser) {

        let token = await Store.getItem("token");

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await api.put(`/users`, newUser, config)
            .then(res => {
                if (res.status === 200) {
                    Alert.alert(
                        'Alteração',
                        `Seu usuário ${newUser.email} foi alterado :)`,
                        [
                            {
                                text: 'Obrigado por avisar :)', onPress: () => {
                                    setIsEdit(false);
                                }
                            }
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch(err => console.log(err));
    }

    //Lifecycle Functions
    useEffect(() => {
        getAllInStore();
    }, [])

    //Render Functions
    const renderEditProfile = () => {

        return (
            <ContainerEdit>
                <ProfileHeaderInput>Nome</ProfileHeaderInput>
                <ProfileInput value={user.name} onChangeText={t => { setUser({ ...user, name: t }) }} ></ProfileInput>

                <ButtonCheckout onPress={() => handleSaveEdit(user)}>
                    <Text style={{ color: "white" }}>Salvar</Text>
                </ButtonCheckout>
            </ContainerEdit>
        )
    }

    return (
        <Container>
            <HeaderComponent
                iconLeft={{ name: "arrow-back", onPress: handleArrowBack }}
                title="Configurações"
            />

            {!isEdit ? (
                <ContainerConfig>
                    <LineContainer>
                        <TitleCard>Meu Perfil</TitleCard>
                        <Icon onPress={handleEditProfile}>
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
            )
            :(
                <ContainerConfig>
                        {renderEditProfile()}
                </ContainerConfig>
            )

            }


        </Container>
    );
}

export default Settings;
