import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, View, ActivityIndicator } from "react-native";

import { Card, Badge, SerachBar } from "../../Components";

import { Container, Header, Icon, ImageHeader, ContainerCards } from "./styles";
import api, { BASE_URL } from "../../Services";
import { Actions } from "../../Store/ducks/main";

const socket = io(BASE_URL);

function Main({ navigation }) {

    //Variables
    const dispatch = useDispatch();
    const [copyProducts, setCopyProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const qty = useSelector(state => state.cart.qty_total);

    //Action Functions
    const setRoute = useCallback(
        (page) => dispatch(Actions.setRouteDrawer(page)),
        [dispatch]
    );

    function handleMenu() {
        setRoute('Main');
        navigation.toggleDrawer();
    }

    function handleSearch() {
        setProducts(copyProducts);
        setIsSearch(!isSearch);
    }

    function handleCart() {
        navigation.push('Cart');
    }

    function handleQuerySearch(query) {
        let filter = copyProducts.filter(fil => fil.name.toLowerCase().includes(query.toLowerCase()) && fil);
        if (query || filter) {
            setProducts(filter);
        } else {
            setProducts(copyProducts);
        }
    }

    function registerSocket() {
        socket.on('product', pdt => {

            let idx = copyProducts.findIndex(x => x._id === pdt._id);
            if (idx < -1) {
                setCopyProducts([pdt, ...copyProducts]);
                setProducts([pdt, ...copyProducts]);
            }

            getProducts();
        });
    }

    async function getProducts() {
        try {
            const response = await api.get("/products");
            if (response.status === 200) {
                setProducts(response.data);
                setCopyProducts(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (error) alert('Não conseguimos buscar os produtos :(');
        }
    }

    //Lifecycle Functions
    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        registerSocket();

        return () => {
            socket.off('product')
        }
    }, [products]);


    //Render Functions
    const renderCardItem = ({ item }) => {
        if (item.empty) {
            return <View key={item._id} style={{ flex: 1 }} />;
        }
        return <Card key={item._id} product={item} />;
    };

    function createRows(data, columns) {
        const rows = Math.floor(data.length / columns);
        let lastRowElements = data.length - rows * columns;
        while (lastRowElements !== columns) {
            data.push({
                _id: `empty-${lastRowElements}-${Math.abs(Math.random())}`,
                name: `empty-${lastRowElements}-${Math.abs(Math.random())}`,
                empty: true
            });
            lastRowElements += 1;
        }
        return data;
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
                    <ActivityIndicator />
                </View>
            );
        }

        const columns = 2;
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={columns}
                data={createRows(products, columns)}
                keyExtractor={item => item._id}
                renderItem={renderCardItem}
            />
        );
    };

    const renderHeader = () => (
        <Header>
            <Icon onPress={handleMenu}>
                <MaterialIcons
                    name="format-align-left"
                    size={20}
                    color="#868686"
                />
            </Icon>
            <ImageHeader />

            <Icon onPress={handleSearch}>
                <MaterialIcons name="search" size={20} color="#868686" />
            </Icon>
            <Icon onPress={handleCart}>
                <MaterialIcons name="local-mall" size={20} color="#868686" />
                <Badge>{qty}</Badge>
            </Icon>
        </Header>
    );

    return (
        <Container>
            {renderHeader()}
            {isSearch && <SerachBar query={handleQuerySearch} />}
            <ContainerCards>{renderCards()}</ContainerCards>
        </Container>
    );
}

export default Main;
