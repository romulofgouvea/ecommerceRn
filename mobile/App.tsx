import React from 'react';
import { Provider } from 'react-redux';

import Routes from './src/Routes';
import store from './src/Store';

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
    <Provider store={store}>
        <View style={styles.container}>
            <Routes />
        </View>
    </Provider>
)

export default App;
