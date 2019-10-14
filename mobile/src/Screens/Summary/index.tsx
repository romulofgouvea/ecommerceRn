import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, Text, FlatList, View } from "react-native";

import { Container, ContainerCard, Footer, ButtonCheckout, Card, CardImage, CardTitle, CardDesc, CardPrice, CardTexts, CardTotal, Header, Icon, HeaderTitle, ContainerPrice, CardQty, AddressContent, AddressTitle, AddressDesc } from "./styles";
import { BASE_URL } from "../../Services";
import { MaterialIcons } from "@expo/vector-icons";


function Summary({ navigation }) {

    //Variables
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.products_cart);
    const address = useSelector(state => state.cart.address_selected);
    const total = useSelector(state => state.cart.total);
    const payment = useSelector(state => state.cart.pay_method);

    //Action Functions
    function handleArrowBack() {
        navigation.goBack(null);
    }

    function handleClickFinishOrder() {

    }

    //Lifecycle Functions
    console.log(address)

    //Render Functions
    const _renderItemCart = ({ item }) => (
        <Card key={item._id}>
            <CardImage source={{ uri: `${BASE_URL}/files/${item.image}` }} />
            <CardTexts>
                <CardTitle>{item.name}</CardTitle>
                <CardDesc>{item.measure}</CardDesc>
                <CardPrice>R$ {item.price}</CardPrice>
            </CardTexts>
            <Text>x <CardQty>{item.qty}</CardQty></Text>
        </Card>
    )

    const renderItensCart = () => (
        <FlatList
            data={cart}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
            renderItem={_renderItemCart}
            extraData={cart}
        />
    )

    const renderItensTotal = () => (
        <CardTotal bgColor="#4d7d13">
            <Text style={{ color: 'white', fontSize: 16 }}>Valor total da compra:</Text>
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
            <Text style={{ fontSize: 18, paddingBottom: 12 }}>Metodo de Pagamento</Text>
            <Text style={{ fontSize: 15 }}>{payment}</Text>
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
            <ScrollView>
                <ContainerCard>
                    {renderItensCart()}
                    {renderItensTotal()}
                </ContainerCard>

                <ContainerCard p={8}>
                    {renderItensAddress()}
                </ContainerCard>

                <ContainerCard p={8}>
                    {renderItensPayment()}
                </ContainerCard>
            </ScrollView>
            {renderFooter()}
        </Container>
    );
}

export default Summary;
