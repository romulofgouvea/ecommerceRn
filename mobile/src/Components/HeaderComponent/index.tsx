import React from "react";
import { Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { Header, Icon, HeaderImage, HeaderTitle } from "./styles";
import Badge from "../Badge";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

type icon = {
    name: string
    size?: number,
    color?: string,
    onPress?: any
}

interface IProps {
    qty?: number,
    title?: string,
    image?: string,
    iconLeft?: icon,
    iconRightOne?: icon,
    iconRightTwo?: icon,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const HeaderComponent: React.FC<IProps> = ({ qty, title, image, iconLeft, iconRightOne, iconRightTwo, navigation }) => {

    function handleMenu() {
        navigation.toggleDrawer();
    }

    return (
        <Header>
            <Icon onPress={iconLeft && iconLeft.onPress ? iconLeft.onPress : handleMenu} disable={iconLeft && !iconLeft.name}>
                <MaterialIcons
                    name={iconLeft && iconLeft.name ? iconLeft.name : "format-align-left"}
                    size={20}
                    color="#868686"
                />
            </Icon>

            {image && <HeaderImage />}
            {title && <HeaderTitle><Text>{title}</Text></HeaderTitle>}

            {iconRightOne
                ? (
                    <Icon onPress={iconRightOne.onPress} disable={!iconRightOne.name}>
                        {iconRightOne.name && <MaterialIcons
                            name={iconRightOne.name ? iconRightOne.name : "search"}
                            size={20}
                            color="#868686"
                        />}
                    </Icon>
                )
                : (<Icon />)
            }
            {iconRightTwo
                ? (
                    <Icon onPress={iconRightTwo.onPress} disable={!iconRightTwo.name}>
                        {iconRightTwo.name && <MaterialIcons
                            name={iconRightOne.name ? iconRightOne.name : "local-mall"}
                            size={20}
                            color="#868686"
                        />}
                        {qty && <Badge>{qty}</Badge>}
                    </Icon>
                )
                : (<Icon />)
            }

        </Header>
    );
};

export default HeaderComponent;
