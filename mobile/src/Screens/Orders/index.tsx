import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, View, FlatList } from "react-native";

import { Container, ContainerOrders, TitleCard, CardOrders, CardOrdersProducts, AddressContent, AddressTitle, AddressDesc, ProductsName } from "./styles";
import { Store } from "../../Services/SecureStore";
import api from "../../Services";

import { HeaderComponent } from '../../Components';

function Orders({ navigation }) {

    //Variables
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    //Action Functions
    function handleArrowBack() {
        navigation.goBack(null);
    }

    //Lifecycle Functions
    useEffect(() => {

        const getOrders = async () => {
            let token = await Store.getItem("token");

            let config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            await api
                .get("/orders/user", config)
                .then(res => {
                    setOrders(res.data);
                    setIsLoading(false);
                })
                .catch(err => err);
        };

        Promise.all([getOrders()]);
    }, []);

    //Render Functions
    const renderItensProducts = (products) => (
        <>
            {products.map(pdt => (
                <ProductsName key={pdt.name} color="#4d7d13">{pdt.name}</ProductsName>
            ))}
        </>
    )

    const renderItensAddress = (address) => (
        <AddressContent>
            <AddressTitle>{address.street}, nº {address.number}</AddressTitle>
            <AddressDesc >Complemento: {address.complement}</AddressDesc>
            <AddressDesc >Bairro: {address.neighborhood}, {address.city}</AddressDesc>
            <AddressDesc >Cep: {address.cep}</AddressDesc>
        </AddressContent>
    )

    const renderOrder = order => (
        <CardOrders key={!order._id ? Math.abs(Math.random()) : order._id}>
            <CardOrdersProducts>
                {renderItensProducts(order.products)}
            </CardOrdersProducts>
            {renderItensAddress(order.address)}
        </CardOrders>
    )

    const _renderCard = ({ item }) => renderOrder(item);

    const renderCards = (ord) => {
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
                data={ord}
                keyExtractor={item => item._id}
                renderItem={_renderCard}
                extraData={ord}
            />
        );
    };

    const renderAllOrdersWithoutFirst = () => {
        let copyOrders = [...orders];
        copyOrders.splice(0, 1);

        return (
            <View style={{ paddingTop: 8 }}>
                <TitleCard>Todos os pedidos</TitleCard>
                {renderCards(copyOrders)}
            </View>
        )
    }

    return (
        <Container>
            <HeaderComponent
                iconLeft={{ name: "arrow-back", onPress: handleArrowBack }}
                title="Meus Pedidos"
            />

            {orders.length > 0 && (
                <ContainerOrders>
                    <TitleCard>Último Pedido</TitleCard>
                    {renderOrder(orders[0])}

                    {orders.length > 1 && renderAllOrdersWithoutFirst()}
                </ContainerOrders>
            )}
        </Container>
    );
}

export default Orders;
