import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";

import { Container, SearchInput, SearchButton } from "./styles";

interface IProps {
  query?: string;
}

const Card: React.FC<IProps> = ({ query }) => {
  return (
    <Container>
      <SearchInput underlineColorAndroid="transparent" />
      <SearchButton>
        <MaterialIcons name="search" size={20} color="#868686" />
      </SearchButton>
    </Container>
  );
};

export default Card;
