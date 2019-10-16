import React, { useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, Text, FlatList, Alert } from "react-native";

import { Container, ContainerCard, Footer, ButtonCheckout, Card, CardImage, CardTitle, CardDesc, CardPrice, CardTexts, CardTotal, Header, Icon, HeaderTitle, ContainerPrice, CardQty, AddressContent, AddressTitle, AddressDesc, ContainerCardWhite } from "./styles";
import { BASE_URL } from "../../Services";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../Services";
import { Store } from "../../Services/SecureStore";

import { Actions } from '../../Store/ducks/cart';

function Summary({ navigation }) {

    //Variables
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.products_cart);
    const address = useSelector(state => state.cart.address_selected);
    const total = useSelector(state => state.cart.total);
    const payment = useSelector(state => state.cart.pay_method);

    //Action Functions
    const clearAll = useCallback(
        () => dispatch(Actions.clearAll()),
        [dispatch]
    )

    function handleArrowBack() {
        navigation.goBack(null);
    }

    async function handleClickFinishOrder() {

        try {
            let token = await Store.getItem("token");
            let config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            let data = {
                products: cart,
                address: address
            }

            if (token) {
                const res = await api.post("/orders", data, config)
                if (res.status === 200) {
                    Alert.alert(
                        'Pedido Feito!',
                        'O seu pedido foi enviado, agora é so esperar :)\n Caso queira olhar seu pedido, olhe o Menu "Meus Pedidos"',
                        [
                            {
                                text: 'Agora vou esperar chegar :)', onPress: () => {
                                    clearAll()
                                    navigation.navigate('Main');
                                    return;
                                }
                            }
                        ],
                        { cancelable: false },
                    );
                } else {
                    Alert.alert(
                        'Ops...',
                        ' O seu pedido nao foi concluido :(',
                        [
                            {
                                text: 'Vou tentar denovo :(', onPress: () => {
                                    navigation.navigate('Main');
                                    return;
                                }
                            }
                        ]
                    );
                }
            }
        } catch (e) {
            console.error(e);
        }

    }

    //Lifecycle Functions

    //Render Functions
    const _renderItemCart = ({ item }) => {
        return (
            <Card key={item._id}>
                <CardImage source={{ uri: `${BASE_URL}/files/${item.image}` }} />
                <CardTexts>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDesc>Em {item.measure}</CardDesc>
                    <CardPrice>R$ {item.price}</CardPrice>
                </CardTexts>
                <Text>x <CardQty>{item.qty}</CardQty></Text>
            </Card>
        )
    }

    const renderItensCart = () => (
        <FlatList
            data={cart}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={_renderItemCart}
            extraData={cart}
        />
    )

    const renderItensTotal = () => (
        <CardTotal bgColor="#4d7d13">
            <Text style={{ color: 'white', fontSize: 16 }}>Valor total:</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>R$ {total}</Text>
        </CardTotal>
    )

    const renderItensAddress = () => (
        <AddressContent>
            <AddressTitle>{address.street}, nº {address.number}</AddressTitle>
            <AddressDesc >Complemento: {address.complement}</AddressDesc>
            <AddressDesc >Bairro: {address.neighborhood}, {address.city}</AddressDesc>
            <AddressDesc >Cep: {address.cep}</AddressDesc>
        </AddressContent>
    )

    const renderItensPayment = () => (
        <>
            <Text style={{ fontSize: 15, paddingBottom: 12 }}>Pagamento com: <Text style={{ fontSize: 18, color: "#4d7d13" }}>{payment}</Text></Text>
        </>
    )

    const renderFooter = () => (
        <Footer>
            <ButtonCheckout onPress={handleClickFinishOrder}>
                <Text style={{ color: "white" }}>Confirmar e Finalizar</Text>
            </ButtonCheckout>
        </Footer >
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
            <HeaderTitle style={{ flex: 1 }}>
                <Text>Resumo e Finalização</Text>
            </HeaderTitle>
            <Icon></Icon>
        </Header>
    );
    return (
        <Container>
            {renderHeader()}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 72 }}
            >
                <ContainerCard>
                    <Text style={{ fontSize: 18, paddingBottom: 8, color: "#ACACAC" }}>Meus produtos escohidos</Text>
                    <ContainerCardWhite>
                        {renderItensCart()}
                        {renderItensTotal()}
                    </ContainerCardWhite>
                </ContainerCard>

                <ContainerCard>
                    <Text style={{ fontSize: 18, paddingBottom: 8, color: "#ACACAC" }}>Meu Endereço pra entrega</Text>
                    <ContainerCardWhite p={8}>
                        {renderItensAddress()}
                    </ContainerCardWhite>
                </ContainerCard>

                <ContainerCard>
                    <Text style={{ fontSize: 18, paddingBottom: 8, color: "#ACACAC" }}>Metodo de Pagamento</Text>
                    <ContainerCardWhite p={8}>
                        {renderItensPayment()}
                    </ContainerCardWhite>
                </ContainerCard>
            </ScrollView>
            {renderFooter()}
        </Container>
    );
}

export default Summary;
