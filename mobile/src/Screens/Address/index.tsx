import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList, TextInput } from "react-native";
import { useDispatch } from 'react-redux';
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Header, HeaderTitle, Icon, FooterTotal, Footer, ButtonCheckout, Card, AddressContent, AddressContainerActions, ContainerCards, AddressTitle, AddressDesc, ContainerEdit, AddressHeaderInput, AddressInput, IconDelete } from "./styles";

import { Store } from "../../Services/SecureStore";
import api from "../../Services";

import { Actions } from "../../Store/ducks/cart";

function Address({ navigation }) {

    //Variables
    const dispatch = useDispatch();

    const cart = navigation.getParam('cart', false);

    const [isLoading, setIsLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [address, setAddress] = useState([]);
    const [addressSelected, setAddressSelected] = useState({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "" });
    const [copySelected, setCopySelected] = useState({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "" });

    //Action Functions
    const storeAddress = useCallback(
        (ad) => dispatch(Actions.addAddress(ad)),
        [dispatch]
    );

    function handleArrowBack() {
        if (!isEdit) {
            navigation.goBack(null);
        } else {
            setIsEdit(!isEdit);
        }
    }

    function handleAddPayMethod() {
        storeAddress(addressSelected);
        navigation.push('Payment', { addressSelected });
    }

    function handleSelectAddress(item) {
        if (item._id === addressSelected._id) {
            setAddressSelected({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "" });
            setCopySelected({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "" });
        } else {
            setAddressSelected(item);
            setCopySelected(item);
        }
    }

    function handleEditAddress() {
        setIsEdit(!isEdit);
    }

    async function handleSaveEdit(newAddress) {

        let token = await Store.getItem("token");

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        await api.put(`/address/${newAddress._id}`, newAddress, config)
            .then(res => {
                if (res.status === 200) {
                    setIsEdit(false);
                }
            })
            .catch(err => console.log(err));

    }

    async function removeAddress(address) {


        let token = await Store.getItem("token");

        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        address.status = 1;

        await api.put(`/address/${address._id}`, address, config)
            .then(res => {
                if (res.status === 200) {
                    setIsEdit(false);
                }
            })
            .catch(err => console.log(err));

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

        if (!isEdit)
            Promise.all([getAddress()]);

    }, [navigation, isEdit])

    //Render Functions
    const renderEditAddress = () => {

        return (
            <ContainerEdit>
                <AddressHeaderInput>Rua/Avenida</AddressHeaderInput>
                <AddressInput value={copySelected.street} onChangeText={t => { setCopySelected({ ...copySelected, street: t }) }} ></AddressInput>
                <AddressHeaderInput>Número</AddressHeaderInput>
                <AddressInput value={copySelected.number} onChangeText={t => { setCopySelected({ ...copySelected, number: t }) }}></AddressInput>
                <AddressHeaderInput>Bairro</AddressHeaderInput>
                <AddressInput value={copySelected.neighborhood} onChangeText={t => { setCopySelected({ ...copySelected, neighborhood: t }) }}></AddressInput>
                <AddressHeaderInput>Cidade: </AddressHeaderInput>
                <AddressInput value={copySelected.city} onChangeText={t => { setCopySelected({ ...copySelected, city: t }) }}></AddressInput>
                <AddressHeaderInput>CEP: </AddressHeaderInput>
                <AddressInput value={copySelected.cep} onChangeText={t => { setCopySelected({ ...copySelected, cep: t }) }}></AddressInput>
                <ButtonCheckout onPress={() => handleSaveEdit(copySelected)}>
                    <Text style={{ color: "white" }}>Salvar</Text>
                </ButtonCheckout>
            </ContainerEdit>
        )
    }

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
                <IconDelete onPress={() => removeAddress(item)}>
                    <MaterialIcons
                        name="remove-circle"
                        size={20}
                        color="red"
                    />
                </IconDelete>
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
            <ButtonCheckout onPress={handleAddPayMethod} disable={addressSelected._id === ""}>
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
            {!isEdit
                ? (
                    <ContainerCards>
                        {renderCards()}
                    </ContainerCards>
                )
                : renderEditAddress()
            }
            {cart && !isEdit && renderFooter()}
        </Container>
    );
}

export default Address;
