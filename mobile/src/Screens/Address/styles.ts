import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #F5F5F5;
`;

export const ContainerCards = styled.View`
    flex:1;
    background-color: #F5F5F5;
    padding: 8px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 44;
    background-color: white;
    padding: 0 8px;

    elevation: 2;

    shadowColor: black;
    /* shadowOffset: 0 2; */
    shadowOpacity: 0.1;
    shadowRadius: 13;
`;
export const HeaderTitle = styled.View`
    flex:1;
`;

export const Icon = styled.TouchableOpacity`
    padding: 8px;
`;


export const Footer = styled.View`
    padding: 16px;
    flex:1;
    width:100%;
    position:absolute;
    bottom: 0;
    background-color: white;
`;

export const FooterTotal = styled.Text`
    color: #4d7d13;
    justify-content:center;
    align-items:center;
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 500;
`;


export const ButtonCheckout = styled.TouchableOpacity`
    padding: 12px;
    background-color: #4d7d13;
    color: white;
    justify-content:center;
    align-items:center;
    border-radius: 5px;
`;


export const Card = styled.TouchableOpacity`
    padding: 12px;
    margin-bottom: 8px;
    flex-direction:row;
    flex:1;
    background-color: ${ props => props.background ? props.background : 'white'};
    border-radius: 3px;
`;

export const AddressCheck = styled.TouchableOpacity`
    height: 20;
    width: 20;
    border-radius: 10px;
    border-width: 1;
    border-color: #ACACAC;
    align-items: center;
    justify-content: center;
`;

export const AddressChecked = styled.View`
    width: 14;
    height: 14;
    border-radius: 7;
    background-color: #4d7d13;
`;

export const AddressContent = styled.View`
    flex:1
`;

export const AddressTitle = styled.Text`
    color: ${ props => props.color ? props.color : "#4d7d13"};
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 500;
`;

export const AddressDesc = styled.Text`
    color: ${ props => props.color ? props.color : "#ACACAC"};
    font-size: 14px;
`;

export const AddressContainerActions = styled.View`
    flex:1
`;
