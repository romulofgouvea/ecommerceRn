import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    NavigationScreenProp,
    NavigationState,
    NavigationParams
} from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, RowButton, TextButton } from "./styles";

import { Store } from "../../Services/SecureStore";
import { Actions } from "../../Store/ducks/main";

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const DrawerContainer: React.FC<IProps> = props => {

    //Variables
    const dispatch = useDispatch();
    const route = useSelector(state => state.main.route);

    //Action Functions
    const setRoute = useCallback(
        (page) => dispatch(Actions.setRouteDrawer(page)),
        [dispatch]
    );

    function handleSelected(pageName) {
        setRoute(pageName);
        props.navigation.navigate(pageName);
    }

    async function handleLogout() {
        await Store.deleteItem("token");
        props.navigation.navigate("Login");
    }

    //Render Funtions
    const lineButton = (nameRoute, textRoute, nameIcon) => (
        <RowButton selected={route === nameRoute && true} onPress={() => { handleSelected(nameRoute) }}>
            <MaterialIcons name={nameIcon} size={20} color={route === nameRoute ? "#FFF" : "#868686"} />
            <TextButton selected={route === nameRoute && true}>{textRoute}</TextButton>
        </RowButton>
    )

    return (
        <Container>
            {lineButton('Main', 'Início', 'home')}

            {lineButton('Address', 'Meus endereços', 'location-on')}

            {lineButton('Orders', 'Meus pedidos', 'local-mall')}

            {lineButton('Settings', 'Configurações', 'settings')}

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
