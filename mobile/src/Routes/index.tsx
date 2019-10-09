import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

//Screens
import Main from '../Screens/Main';
import Welcome from '../Screens/Welcome';
import Login from '../Screens/Login';
import Cart from '../Screens/Cart';

const stackMain = createStackNavigator({
    Main,
    Cart
}, {
    defaultNavigationOptions: {
        header: null
    }
})

const MainDrawer = createDrawerNavigator({
    MainTabs: {
        screen: stackMain,
        navigationOptions: () => ({ title: "Início" })
    },
});

const Screens = createSwitchNavigator({
    Welcome,
    Login,
    App: MainDrawer
}, {
    initialRouteName: "Login",
    defaultNavigationOptions: {
        header: null
    }
})

export default createAppContainer(Screens);