import React, { useCallback, useState, useEffect } from "react";
import { Text, FlatList, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { Container, Header, Icon, ContainerLessMore, Card, CardImage, ContainerTexts, CardTitle, CardDesc, CardPrice, ButtonCheckout, Footer, FooterTotal, ContainerNoCart, ContainerNoCartText } from "./styles";

import { BASE_URL } from "../../Services";
import { Actions } from "../../Store/ducks/cart";

function Cart({ navigation }) {

    //Variables
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.products_cart);
    const total = useSelector(state => state.cart.total);
    const [isLoading, setIsLoading] = useState(true);

    //Action Functions
    const addProduct = useCallback(
        (product) => dispatch(Actions.addCart(product)),
        [dispatch]
    );

    const removeProduct = useCallback(
        (product) => dispatch(Actions.deleteCart(product)),
        [dispatch]
    );

    function handleAddAddress() {
        navigation.push('Address', { cart: true })
    }

    function handleArrowBack() {
        navigation.goBack(null);
    }

    //Lifecycle Functions
    useEffect(() => {
        if (cart.length > 0) {
            setIsLoading(false);
        }
    }, [cart])

    //Render Functions
    const renderFooter = () => (
        <Footer>
            <FooterTotal>Subtotal: R$ {total}</FooterTotal>
            <ButtonCheckout onPress={handleAddAddress}>
                <Text style={{ color: "white" }}>Selecionar Endereço</Text>
            </ButtonCheckout>
        </Footer>
    )

    function renderContainerLessMore(product) {
        return (
            <ContainerLessMore>
                <Icon onPress={() => {
                    if (product.qty === 1) {
                        setIsLoading(true);
                    }
                    removeProduct(product)
                }}>
                    <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={22}
                        color="#4d7d13"
                    />
                </Icon>
                <Text style={{ color: "#222", fontSize: 16 }}>{product.qty}</Text>
                <Icon onPress={() => {
                    addProduct(product)
                }}>
                    <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={22}
                        color="#4d7d13"
                    />
                </Icon>
            </ContainerLessMore>
        )
    }

    const renderCard = ({ item, index }) => (
        <Card key={index}>
            <CardImage source={{ uri: `${BASE_URL}/files/${item.image}` }} />
            <ContainerTexts>
                <CardTitle>{item.name}</CardTitle>
                <CardDesc>{item.measure}</CardDesc>
                <CardPrice>R$ {item.price}</CardPrice>
            </ContainerTexts>
            {renderContainerLessMore(item)}
        </Card>
    )

    function renderList() {
        if (isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <FlatList
                data={cart}
                keyExtractor={item => item._id}
                renderItem={renderCard}
            />
        )
    }

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
            {cart.length > 0
                ? (
                    <>
                        {renderList()}
                        {renderFooter()}
                    </>
                )
                : (
                    <ContainerNoCart>
                        <Feather
                            name="alert-octagon"
                            size={90}
                            color="#868686"
                        />
                        <ContainerNoCartText>
                            <Text style={{ color: "#868686", fontSize: 22, paddingBottom: 8 }}>Nenhum produto adicionado :(</Text>
                            <Text style={{ color: "#868686", fontSize: 16 }}>Vá até a pagina principal e adicione alguns produtos</Text>
                        </ContainerNoCartText>
                        <ButtonCheckout onPress={() => { navigation.goBack() }}>
                            <Text style={{ color: "white" }}>Buscar produtos</Text>
                        </ButtonCheckout>
                    </ContainerNoCart>
                )
            }
        </Container>
    );
}

export default Cart;
