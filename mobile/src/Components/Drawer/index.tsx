import React from "react";
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
    async function handleLogout() {
        await Store.deleteItem("token");

        props.navigation.navigate("Login");
    }

    return (
        <Container>
            <RowButton selected>
                <MaterialIcons name="home" size={18} color="#FFF" />
                <TextButton selected>Início</TextButton>
            </RowButton>
            <RowButton>
                {/* <MaterialIcons name="search" size={20} color="#868686" /> */}
                <TextButton>Pedidos</TextButton>
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
