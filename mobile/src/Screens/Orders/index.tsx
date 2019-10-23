import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, View, FlatList, ScrollView } from "react-native";
import io from 'socket.io-client';

import { Container, ContainerOrders, TitleCard, CardOrders, CardOrdersProducts, AddressContent, AddressTitle, AddressDesc, ProductsName, ContainerNoData, ContainerNoDataText, ButtonCheckout, StatusCard } from "./styles";
import { Store } from "../../Services/SecureStore";
import api, { BASE_URL } from "../../Services";

import { HeaderComponent } from '../../Components';
import { Feather } from "@expo/vector-icons";

const socket = io(BASE_URL);

function Orders({ navigation }) {

    //Variables
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    //Action Functions
    function registerSocket() {
        socket.on('order', ord => {
            let nExists = orders.findIndex(x => x._id === ord._id) < -1;
            if (nExists) {
                setOrders([ord, ...orders]);
            }
        });
    }

    async function getOrders() {
        try {
            let token = await Store.getItem("token");

            let config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const response = await api.get("/orders/user", config);
            if (response.status === 200) {
                setOrders(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (error) alert('Não conseguimos buscar os produtos :(');
        }
    }

    //Lifecycle Functions
    useEffect(() => {
        getOrders();

        registerSocket();

        return () => {
            socket.off('order');
        }
    }, [orders]);


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
        <>
            <CardOrders key={!order._id ? Math.abs(Math.random()) : order._id}>
                <CardOrdersProducts>
                    {renderItensProducts(order.products)}
                </CardOrdersProducts>
                {renderItensAddress(order.address)}
            </CardOrders>
            <StatusCard> Status: {order.status === 0 ? "Em andamento" : order.status === 1 ? "Saiu para a entrega" : "Entregue/Finalizado"}</StatusCard>
        </>
    )

    const _renderCard = ({ item }) => renderOrder(item);

    const renderCards = (ord) => {
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

    const renderIfOrderEmpty = () => (
        <ContainerNoData>
            <Feather
                name="alert-octagon"
                size={90}
                color="#868686"
            />
            <ContainerNoDataText>
                <Text style={{ color: "#868686", fontSize: 22, paddingBottom: 8 }}>Nenhum pedido foi feito :(</Text>
                <Text style={{ color: "#868686", fontSize: 16 }}>Vá até a pagina principal e adicione alguns produtos e finalize o carrinho para aparecer o seu pedido aqui</Text>
            </ContainerNoDataText>
            <ButtonCheckout onPress={() => { navigation.goBack() }}>
                <Text style={{ color: "white" }}>Ir para a página principal</Text>
            </ButtonCheckout>
        </ContainerNoData>
    )

    return (
        <Container>
            <HeaderComponent
                title="Meus Pedidos"
                navigation={navigation}
            />

            {isLoading && (
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator size="large" />
                </View>
            )}

            {orders.length > 0
                && (
                    <ScrollView>
                        <ContainerOrders>
                            <TitleCard>Último Pedido</TitleCard>
                            {renderOrder(orders[0])}
                            {orders.length > 1 && renderAllOrdersWithoutFirst()}
                        </ContainerOrders>
                    </ScrollView>
                )
            }

            {!isLoading && orders.length === 0 && renderIfOrderEmpty()}
        </Container>
    );
}

export default Orders;
