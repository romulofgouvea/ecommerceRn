import React, { useState, useCallback } from "react";
import { FlatList, Text } from "react-native";
import { useDispatch } from 'react-redux';
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Card, Header, Icon, HeaderTitle, ContainerCards, Footer, ButtonCheckout } from "./styles";
import { Actions } from "../../Store/ducks/cart";

function Payment({ navigation, methods }) {

    //Variables
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("");

    //Action Functions
    const storePayment = useCallback(
        (pay) => dispatch(Actions.addPayment(pay)),
        [dispatch]
    );

    function handleArrowBack() {
        navigation.goBack(null);
    }

    function handleSelected(item) {
        if (item === selected) {
            setSelected("");
        } else {
            setSelected(item);
        }
    }
    function handleClickSummary() {
        storePayment(selected);
        navigation.push('Summary')
    }

    //Lifecycle Functions

    //Render Functions
    const renderFooter = () => (
        <Footer>
            <ButtonCheckout onPress={handleClickSummary} disable={selected === ""}>
                <Text style={{ color: "white" }}>Resumo e finalização</Text>
            </ButtonCheckout>
        </Footer >
    )

    const _renderItem = ({ item }) => {
        let colorBack = selected === item ? "#4d7d13" : false;
        return (
            <Card background={colorBack} onPress={() => handleSelected(item)}>
                <Text style={{ color: colorBack ? 'white' : "#333" }}>{item}</Text>
            </Card>
        )
    }

    const renderCards = () => {
        return (
            <FlatList
                data={methods}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                renderItem={_renderItem}
                extraData={selected}
            />
        );
    };

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
                <Text>Selecionar o método de pagamento</Text>
            </HeaderTitle>
            <Icon></Icon>
        </Header>
    );

    return (
        <Container>
            {renderHeader()}
            <ContainerCards>
                {renderCards()}
            </ContainerCards>
            {renderFooter()}
        </Container>
    );
}

Payment.defaultProps = {
    methods: [
        "Dinheiro",
        "Cartão de crédito",
        "Cartão de débito",
        "Pic Pay",
        "Ame"
    ]
}

export default Payment;
