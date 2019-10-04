import React from 'react';

import Routes from './src/Routes';

import { View, Platform, StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })

    }
})

const App = () => (
    <View style={styles.container}>
        <Routes />
    </View>
)

export default App;