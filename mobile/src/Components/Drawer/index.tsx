import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, RowButton, TextButton } from "./styles";

const DrawerContainer: React.FC = () => {
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
        </Container>
    );
};

export default DrawerContainer;
