import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Text } from "react-native";

import { Container } from "./styles";

function Summary({ navigation }) {

    //Variables
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.products_cart);
    const address = useSelector(state => state.cart.address_selected);
    const total = useSelector(state => state.cart.total);
    const payment = useSelector(state => state.cart.pay_method);

    //Action Functions
    console.log(cart, address, total, payment);
    //Lifecycle Functions

    //Render Functions

    return (
        <Container>
            <Text>Summary</Text>
        </Container>
    );
}

export default Summary;
