import React, { useState, useCallback, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../../Services";
import { Actions, Types } from "../../Store/ducks/cart";

import {
    Container,
    CardImage,
    Price,
    Name,
    MeasureItem,
    FooterCard,
    ButtonAddToCart,
    Icon,
    ContainerAddLessCart,
    MidCard
} from "./styles";

type Product = {
    _id: string;
    image: string;
    name: string;
    price: number;
    measure: number;
    stock: number;
    qty: number;
};

interface IProps {
    product: Product;
}

const Card: React.FC<IProps> = ({ product }) => {

    product.qty = useSelector(state => {
        let obj = state.cart.products_cart.find(x => x._id === product._id && x);
        if (obj) {
            return obj.qty;
        } else {
            return qtd;
        }
    })

    //Variables
    const [qtd, setQtd] = useState(0);
    const dispatch = useDispatch();

    //Action Functions
    const addProduct = useCallback(
        (p) => dispatch(Actions.addCart(p)),
        [dispatch]
    );

    const removeProduct = useCallback(
        (p) => dispatch(Actions.deleteCart(p)),
        [dispatch]
    );

    //Lifecycle

    //Render Functions
    const renderAddCard = () => {
        if (product.qty > 0) {
            return (
                <ContainerAddLessCart>
                    <Icon onPress={() => removeProduct(product)}>
                        <MaterialCommunityIcons
                            name="minus-circle-outline"
                            size={22}
                            color="#4d7d13"
                        />
                    </Icon>
                    <Text style={{ color: "#222", fontSize: 16 }}>{product.qty}</Text>
                    <Icon onPress={() => addProduct(product)}>
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
            <ButtonAddToCart onPress={() => addProduct(product)}>
                <View style={{ padding: 8 }}>
                    <MaterialIcons
                        name="local-mall"
                        size={20}
                        color="#4d7d13"
                    />
                </View>
                <Text style={{ color: "#4d7d13", flex: 1 }}>
                    Adicionar ao carrinho
                </Text>
            </ButtonAddToCart>
        );
    };

    return (
        <Container>
            <CardImage source={{ uri: `${BASE_URL}/files/${product.image}` }} />
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
