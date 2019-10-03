import React, { useState } from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Image,
  Price,
  Name,
  MeasureItem,
  FooterCard,
  ButtonAddToCart,
  Icon,
  ContainerAddLessCart,
  MidCard
} from "./styles";
import Badge from "../Badge";

type Product = {
  image: string;
  name: string;
  price: number;
  measure: number;
  stock: number;
};

interface IProps {
  product: Product;
}

const Card: React.FC<IProps> = ({ product }) => {
  const [qtd, setQtd] = useState(0);

  function handleClickAddCart() {
    setQtd(qtd + 1);
  }

  function handleClickRemoveCart() {
    qtd > 0 && setQtd(qtd - 1);
  }

  const renderAddCard = () => {
    if (qtd > 0) {
      return (
        <ContainerAddLessCart>
          <Icon onPress={() => handleClickRemoveCart()}>
            <MaterialCommunityIcons
              name="minus-circle-outline"
              size={22}
              color="#4d7d13"
            />
          </Icon>
          <Text style={{ color: "#222", fontSize: 16 }}>{qtd}</Text>
          <Icon onPress={() => handleClickAddCart()}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={22}
              color="#4d7d13"
            />
          </Icon>
        </ContainerAddLessCart>
      );
    }
    return (
      <ButtonAddToCart onPress={() => handleClickAddCart()}>
        <View style={{ padding: 8 }}>
          <MaterialIcons name="local-mall" size={20} color="#4d7d13" />
        </View>
        <Text style={{ color: "#4d7d13", flex: 1 }}>Adicionar ao carrinho</Text>
      </ButtonAddToCart>
    );
  };

  return (
    <Container>
      {qtd > 0 && (
        <Badge width={24} padding={4} size={12}>
          {qtd}
        </Badge>
      )}
      <Image source={{ uri: product.image }} />
      <MidCard>
        <Price>R$ {product.price}</Price>
        <Name>{product.name}</Name>
        <MeasureItem>{product.measure}</MeasureItem>
      </MidCard>
      <FooterCard>{renderAddCard()}</FooterCard>
    </Container>
  );
};

export default Card;
