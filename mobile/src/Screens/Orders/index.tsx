import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, View, FlatList } from "react-native";

import { Container, ContainerOrders, TitleCard, CardOrders, CardOrdersProducts, AddressContent, AddressTitle, AddressDesc, ProductsName, ContainerNoData, ContainerNoDataText, ButtonCheckout, StatusCard } from "./styles";
import { Store } from "../../Services/SecureStore";
import api from "../../Services";

import { HeaderComponent } from '../../Components';
import { Feather } from "@expo/vector-icons";

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
                    if (res.status === 200)
                        setOrders(res.data);
                })
                .catch(err => err);
            setIsLoading(false);
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
                iconLeft={{ name: "arrow-back", onPress: handleArrowBack }}
                title="Meus Pedidos"
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
                ? (
                    <ContainerOrders>
                        <TitleCard>Último Pedido</TitleCard>
                        {renderOrder(orders[0])}

                        {orders.length > 1 && renderAllOrdersWithoutFirst()}
                    </ContainerOrders>
                ) : !isLoading && renderIfOrderEmpty()}


        </Container>
    );
}

export default Orders;
