console.ignoredYellowBox = ['Remote debugger'];
import React from 'react';
import { Provider } from 'react-redux';

import Routes from './src/Routes';
import store from './src/Store';

import { View, Platform, StatusBar, StyleSheet, YellowBox } from 'react-native';

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


YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

const App = () => (
    <Provider store={store}>
        <View style={styles.container}>
            <Routes />
        </View>
    </Provider>
)

export default App;
