import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList, Alert } from "react-native";
import { useDispatch } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Container, Header, HeaderTitle, Icon, Footer, ButtonCheckout, Card, AddressContent, ContainerCards, AddressTitle, AddressDesc, ContainerEdit, AddressHeaderInput, AddressInput, IconDelete } from "./styles";

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
    const [addressSelected, setAddressSelected] = useState({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "", status: 0 });
    const [copySelected, setCopySelected] = useState({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "", status: 0 });

    //Action Functions
    const storeAddress = useCallback(
        (ad) => dispatch(Actions.addAddress(ad)),
        [dispatch]
    );

    function handleArrowBack() {
        if (!isEdit) {
            navigation.toggleDrawer();
        } else {
            setIsEdit(!isEdit);
        }
    }

    function handleAddPayMethod() {
        storeAddress(addressSelected);
        navigation.push('Payment', { addressSelected });
    }

    function clearAllState() {
        setAddressSelected({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "", status: 0 });
        setCopySelected({ _id: "", street: "", number: "", complement: "", cep: "", neighborhood: "", city: "", status: 0 });
    }

    function handleSelectAddress(item) {
        if (item._id === addressSelected._id) {
            clearAllState()
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
        if (isEdit && addressSelected._id !== "") {

            await api.put(`/address/${newAddress._id}`, newAddress, config)
                .then(res => {
                    if (res.status === 200) {
                        Alert.alert(
                            'Endereço alterado',
                            `Seu endereço ${newAddress.street} foi alterado :)`,
                            [
                                {
                                    text: 'Obrigado por avisar :)', onPress: () => {
                                        setIsEdit(false);
                                    }
                                }
                            ],
                            { cancelable: false },
                        );
                    }
                })
                .catch(err => console.log(err));
        } else {
            await api.post(`/address`, { address: [newAddress] }, config)
                .then(res => {
                    if (res.status === 200) {
                        clearAllState();

                        Alert.alert(
                            'Endereço cadastrado',
                            `Seu endereço ${newAddress.street} foi cadastrado :)`,
                            [
                                {
                                    text: 'Obrigado por avisar :)', onPress: () => {
                                        setAddress(res.data.address);
                                        setIsEdit(false);
                                    }
                                }
                            ],
                            { cancelable: false },
                        );
                    }
                })
                .catch(err => console.log(err));
        }

    }

    async function removeAddress(oldAddress) {

        Alert.alert(
            'Remover Endereço',
            `Deseja realmente remover o endereço ${oldAddress.street} ?`,
            [
                {
                    text: 'Sim, eu quero :|', onPress: async () => {
                        let token = await Store.getItem("token");

                        let config = {
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        }

                        oldAddress.status = 1;

                        await api.put(`/address/${oldAddress._id}`, oldAddress, config)
                            .then(res => {
                                if (res.status === 200 && Object.keys(res.data).length === 0) {
                                    let copyAddres = [...address];

                                    Alert.alert(
                                        'Removido',
                                        `Endereço removido :)`,
                                        [
                                            {
                                                text: 'Obrigado', onPress: () => {
                                                    setIsLoading(true);
                                                    let idx = copyAddres.findIndex(x => x._id === oldAddress._id);
                                                    if (idx > -1) {
                                                        copyAddres.splice(idx, 1);
                                                        setAddress(copyAddres);
                                                        setIsLoading(false);
                                                    }
                                                }
                                            }
                                        ],
                                        { cancelable: false },
                                    )
                                }
                            })
                            .catch(err => console.log("Err ", err.response.data));
                    }
                },
                {
                    text: 'Não quero mais', onPress: () => { }
                }
            ],
        );



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
                <AddressHeaderInput>Complemento</AddressHeaderInput>
                <AddressInput value={copySelected.complement} onChangeText={t => { setCopySelected({ ...copySelected, complement: t }) }}></AddressInput>
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
                {!cart && (
                    <IconDelete onPress={() => removeAddress(item)}>
                        <MaterialIcons
                            name="remove-circle"
                            size={20}
                            color="red"
                        />
                    </IconDelete>
                )}
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
                    name={isEdit ? "arrow-back" : "format-align-left"}
                    size={20}
                    color="#868686"
                />
            </Icon>
            <HeaderTitle style={{ flex: 1 }}>
                <Text>{!cart ? "Meus endereços" : "Endereço de entrega"}</Text>
            </HeaderTitle>
            <Icon onPress={handleEditAddress}>
                {addressSelected._id !== ""
                    ? (
                        <MaterialIcons
                            name="edit"
                            size={20}
                            color="#868686"
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="plus"
                            size={20}
                            color="#868686"
                        />
                    )
                }
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
