import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Header, HeaderTitle, Icon, FooterTotal, Footer, ButtonCheckout, Card } from "./styles";

import { Store } from "../../Services/SecureStore";
import api from "../../Services";

function Address({ navigation }) {

    //Variables
    const cart = navigation.getParam('cart', false);
    const subtotal = navigation.getParam('subtotal', 0);

    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);

    //Action Functions
    function handleArrowBack() {
        navigation.goBack(null);
    }

    function handleAddPayMethod() {
        navigation.push('PayMethod', { cart: true, subtotal })
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
    const _renderItem = ({ item }) => (
        <Card>
            <Text>{item.street}</Text>
        </Card>
    )

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
            <Icon></Icon>
        </Header>
    );

    return (
        <Container>
            {renderHeader()}
            {renderCards()}
            {cart && renderFooter()}
        </Container>
    );
}

export default Address;
