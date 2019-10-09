import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, View, ActivityIndicator, Text } from "react-native";

import { Card, Badge, SerachBar } from "../../Components";

import { Container, Header, Icon, ImageHeader, ContainerCards } from "./styles";
import api from "../../Services";

function Main({ navigation }) {
  //Variables
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  //Action Functions
  function handleMenu() {
    navigation.toggleDrawer();
  }

  function handleSearch() {
    setIsSearch(!isSearch);
  }

  function handleCart() { }

  //Lifecycle Functions
  useEffect(() => {
    const getProducts = async () =>
      await api
        .get("/products")
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => err);
    getProducts();

    setIsLoading(false);
  }, []);

  //Render Functions
  const renderCardItem = ({ item }) => {
    if (item.empty) {
      return <View style={{ flex: 1 }} />;
    }
    return <Card product={item} />;
  };

  function createRows(data, columns) {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns) {
      data.push({
        // [D]
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
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
        keyExtractor={item => item.id}
        renderItem={renderCardItem}
      />
    );
  };

  const renderHeader = () => (
    <Header>
      <Icon onPress={handleMenu}>
        <MaterialIcons name="format-align-left" size={20} color="#868686" />
      </Icon>
      <ImageHeader />

      <Icon onPress={handleSearch}>
        <MaterialIcons name="search" size={20} color="#868686" />
      </Icon>
      <Icon>
        <MaterialIcons name="local-mall" size={20} color="#868686" />
        <Badge>1</Badge>
      </Icon>
    </Header>
  );

  return (
    <Container>
      {renderHeader()}
      {isSearch && <SerachBar />}
      <ContainerCards>{renderCards()}</ContainerCards>
    </Container>
  );
}

export default Main;
