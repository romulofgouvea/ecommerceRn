import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, View, FlatList } from "react-native";

import { Container } from "./styles";
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


    //Render Functions
    const _renderCard = ({ item }) => {

        return (
            <Text>{item}</Text>
        )
    };

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
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <FlatList
                data={orders}
                keyExtractor={item => item._id}
                renderItem={_renderCard}
            />
        );
    };

    return (
        <Container>
            <HeaderComponent
                iconLeft={{ name: "arrow-back", onPress: handleArrowBack }}
                title="Meus Pedidos"
            />


            <Text>Todos os pedidos</Text>
            {renderCards()}
        </Container>
    );
}

export default Orders;
