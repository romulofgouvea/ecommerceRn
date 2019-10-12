import React, { useCallback, useEffect, useState } from "react";
import { Text, FlatList, View, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Container, Header, Icon, ContainerLessMore, Card, CardImage, ContainerTexts, CardTitle, CardDesc, CardPrice, ButtonCheckout, Footer, FooterTotal } from "./styles";

import { BASE_URL } from "../../Services";
import { Actions } from "../../Store/ducks/cart";

function Cart({ navigation }) {

    //Variables
    const cart = useSelector(state => state.cart.products_cart);
    const dispatch = useDispatch();

    const [subtotal, setSubtotal] = useState(0);
    const [product, setProduct] = useState({});

    //Action Functions
    const addProduct = useCallback(
        () => dispatch(Actions.add_cart(product)),
        [dispatch]
    );

    const removeProduct = useCallback(
        () => dispatch(Actions.remove_cart(product)),
        [dispatch]
    );

    function handleArrowBack() {
        navigation.goBack(null);
    }

    async function handleAddQtyProduct(item) {
        await setProduct(item);
        addProduct();
    }

    async function handleRemoveQtyProduct(item) {
        await setProduct(item);
        removeProduct();
    }

    //Lifecycle Functions
    useEffect(() => {
        if (cart.length > 0) {
            let val = 0;
            for (let prod of cart) {
                val = val + (prod.qty * prod.price)
            }
            setSubtotal(val);
        }
    }, [cart]);

    //Render Functions
    const renderFooter = () => (
        <Footer>
            <FooterTotal>Subtotal: R$ {subtotal}</FooterTotal>
            <ButtonCheckout>
                <Text style={{ color: "white" }}>Adicionar o endereço e finalizar</Text>
            </ButtonCheckout>
        </Footer>
    )

    function renderContainerLessMore(product) {
        return (
            <ContainerLessMore>
                <Icon onPress={() => handleRemoveQtyProduct(product)}>
                    <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={22}
                        color="#4d7d13"
                    />
                </Icon>
                <Text style={{ color: "#222", fontSize: 16 }}>{product.qty}</Text>
                <Icon onPress={() => handleAddQtyProduct(product)}>
                    <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={22}
                        color="#4d7d13"
                    />
                </Icon>
            </ContainerLessMore>
        )
    }

    const renderCard = ({ item }) => (
        <Card key={item._id}>
            <CardImage source={{ uri: `${BASE_URL}/files/${item.image}` }} />
            <ContainerTexts>
                <CardTitle>{item.name}</CardTitle>
                <CardDesc>{item.measure}</CardDesc>
                <CardPrice>R$ {item.price}</CardPrice>
            </ContainerTexts>
            {renderContainerLessMore(item)}
        </Card>
    )

    const renderList = () => (
        <FlatList
            data={cart}
            keyExtractor={item => item._id}
            renderItem={renderCard}
        />
    )

    const renderHeader = () => (
        <Header>
            <Icon onPress={handleArrowBack}>
                <MaterialIcons
                    name="arrow-back"
                    size={20}
                    color="#868686"
                />
            </Icon>
            <View style={{ flex: 1 }}>
                <Text>Carrinho</Text>
            </View>
            <Icon></Icon>
        </Header>
    );

    return (
        <Container>
            {renderHeader()}
            {renderList()}
            {renderFooter()}
        </Container>
    );
}

export default Cart;
