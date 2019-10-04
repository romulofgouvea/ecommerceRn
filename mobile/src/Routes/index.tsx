import React from "react";
import { Text, View } from "react-native";

import { NativeRouter, Route, Link } from "react-router-native";

import Main from '../Main';

class Routes extends React.Component {
    render() {
        return (
            <NativeRouter>
                <Route exact path="/" component={Main} />
            </NativeRouter>
        );
    }
}

export default Routes;