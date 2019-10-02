import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList, View } from 'react-native';

import { Card, Badge } from '../Components';

import { Container, Header, Icon, ImageHeader, ContainerCards } from './styles';

function Main() {


    const renderCardItem = ({ item }) => {
        if (item.empty) {
            return <View style={{ flex: 1 }} />;
        }
        return <Card />
    }

    function createRows(data, columns) {
        const rows = Math.floor(data.length / columns);
        let lastRowElements = data.length - rows * columns;
        // while (lastRowElements !== columns && rows > 1) {
        while (lastRowElements !== columns) {
            data.push({ // [D]
                id: `empty-${lastRowElements}`,
                name: `empty-${lastRowElements}`,
                empty: true
            });
            lastRowElements += 1;
        }
        return data;
    }

    const renderCards = () => {
        const columns = 2;
        const arr = [...Array(5).fill(0)];

        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={columns}
                data={createRows(arr, columns)}
                keyExtractor={item => (item + Math.random().toString())}
                renderItem={renderCardItem}
            />
        )
    }

    const renderHeader = () => (
        <Header>
            <Icon>
                <MaterialIcons name="format-align-left" size={20} color="#868686" />
            </Icon>
            <ImageHeader />

            <Icon>
                <MaterialIcons name="search" size={20} color="#868686" />
            </Icon>
            <Icon>
                <MaterialIcons name="local-mall" size={20} color="#868686" />
                <Badge>5</Badge>
            </Icon>
        </Header>
    )

    return (
        <Container>
            {renderHeader()}
            <ContainerCards>
                {renderCards()}
            </ContainerCards>
        </Container>
    );
}

export default Main;