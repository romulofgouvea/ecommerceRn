import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

//Screens
import Main from "../Screens/Main";
import Welcome from "../Screens/Welcome";
import Login from "../Screens/Login";
import Cart from "../Screens/Cart";
import Orders from "../Screens/Orders";
import Address from "../Screens/Address";
import Settings from "../Screens/Settings";
import Payment from "../Screens/Payment";
import Summary from "../Screens/Summary";

import DrawerContainer from "../Components/Drawer";

const stackMain = createStackNavigator(
    {
        Main,
        Cart,
        Orders,
        Address,
        Settings,
        Payment,
        Summary
    },
    {
        defaultNavigationOptions: {
            header: null
        }
    }
);

const MainDrawer = createDrawerNavigator(
    {
        MainTabs: {
            screen: stackMain,
            navigationOptions: () => ({ title: "Início" })
        }
    },
    {
        contentComponent: DrawerContainer
    }
);

const Screens = createSwitchNavigator(
    {
        Welcome,
        Login,
        App: MainDrawer
    },
    {
        initialRouteName: "Welcome",
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default createAppContainer(Screens);
