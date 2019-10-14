import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Header, HeaderTitle, Icon, FooterTotal, Footer, ButtonCheckout, Card, AddressContent, AddressContainerActions, ContainerCards, AddressTitle, AddressDesc } from "./styles";

import { Store } from "../../Services/SecureStore";
import api from "../../Services";

function Address({ navigation }) {

    //Variables
    const cart = navigation.getParam('cart', false);
    const subtotal = navigation.getParam('subtotal', 0);

    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [addressSelected, setAddressSelected] = useState({ _id: "" });

    //Action Functions
    function handleArrowBack() {
        navigation.goBack(null);
    }

    function handleAddPayMethod() {
        navigation.push('PayMethod', { cart: true, subtotal })
    }

    function handleSelectAddress(item) {
        if (item._id === addressSelected._id) {
            setAddressSelected({ _id: "" });
            console.log("aaaa")
        } else {
            setAddressSelected(item);
        }
    }

    function handleEditAddress() {
        alert('item \n' + JSON.stringify(addressSelected))
    }

    //Lifecycle Functions
    useEffect(() => {

        const getAddress = async () => {
            let token = await Store.getItem("token");

            await api
                .get("/address", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setAddress(res.data);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        };

        Promise.all([getAddress()]);

    }, [navigation])

    //Render Functions
    const _renderItem = ({ item }) => {
        let colorBack = addressSelected && addressSelected._id === item._id ? "#4d7d13" : false;
        return (
            <Card background={colorBack} onPress={() => handleSelectAddress(item)}>
                <AddressContent>
                    <AddressTitle color={colorBack && 'white'}>{item.street}, nº {item.number}</AddressTitle>
                    <AddressDesc color={colorBack && 'white'} >Complemento: {item.complement}</AddressDesc>
                    <AddressDesc color={colorBack && 'white'} >Bairro: {item.neighborhood}, {item.city}</AddressDesc>
                    <AddressDesc color={colorBack && 'white'} >Cep: {item.cep}</AddressDesc>
                </AddressContent>
                <AddressContainerActions></AddressContainerActions>
            </Card>
        )
    }

    const renderCards = () => {
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
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <FlatList
                data={address}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={_renderItem}
                extraData={addressSelected}
            />
        );
    };

    const renderFooter = () => (
        <Footer>
            <FooterTotal>Subtotal: R$ {subtotal}</FooterTotal>
            <ButtonCheckout onPress={handleAddPayMethod}>
                <Text style={{ color: "white" }}>Selecionar metodo de pagamento</Text>
            </ButtonCheckout>
        </Footer>
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
                <Text>{!cart ? "Meus endereços" : "Endereço de entrega"}</Text>
            </HeaderTitle>
            <Icon onPress={handleEditAddress}>
                {addressSelected._id !== "" && (
                    <MaterialIcons
                        name="edit"
                        size={20}
                        color="#868686"
                    />
                )}
            </Icon>
        </Header>
    );

    return (
        <Container>
            {renderHeader()}
            <ContainerCards>
                {renderCards()}
            </ContainerCards>
            {cart && renderFooter()}
        </Container>
    );
}

export default Address;
