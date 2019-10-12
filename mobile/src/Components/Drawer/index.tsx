import React, { useState } from "react";
import {
    NavigationScreenProp,
    NavigationState,
    NavigationParams
} from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, RowButton, TextButton } from "./styles";

import { Store } from "../../Services/SecureStore";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const DrawerContainer: React.FC<Props> = props => {

    //Variables
    const [selected, setSelected] = useState('home');

    //Action Functions
    function handleSelected(name) {
        setSelected(name);
    }

    async function handleLogout() {
        await Store.deleteItem("token");

        props.navigation.navigate("Login");
    }

    return (
        <Container>
            <RowButton selected={selected === 'home' && true} onPress={() => { handleSelected('home') }}>
                <MaterialIcons name="home" size={18} color={selected === 'home' ? "#FFF" : "#868686"} />
                <TextButton selected={selected === 'home' && true}>Início</TextButton>
            </RowButton>
            <RowButton selected={selected === 'local-mall' && true} onPress={() => { handleSelected('local-mall') }}>
                <MaterialIcons name="local-mall" size={20} color={selected === 'local-mall' ? "#FFF" : "#868686"} />
                <TextButton selected={selected === 'local-mall' && true}>Meus pedidos</TextButton>
            </RowButton>
            <RowButton selected={selected === 'location-on' && true} onPress={() => { handleSelected('location-on') }}>
                <MaterialIcons name="location-on" size={20} color={selected === 'location-on' ? "#FFF" : "#868686"} />
                <TextButton selected={selected === 'location-on' && true}>Meus endereços</TextButton>
            </RowButton>

            <RowButton selected={selected === 'settings' && true} onPress={() => { handleSelected('settings') }}>
                <MaterialIcons name="settings" size={20} color={selected === 'settings' ? "#FFF" : "#868686"} />
                <TextButton selected={selected === 'settings' && true}>Configurações</TextButton>
            </RowButton>
            <RowButton onPress={handleLogout}>
                <MaterialIcons
                    name="sentiment-dissatisfied"
                    size={18}
                    color="#333"
                />
                <TextButton>Sair</TextButton>
            </RowButton>
        </Container>
    );
};

export default DrawerContainer;
