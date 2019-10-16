import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #F5F5F5;
`;

//Header
export const Header = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 54;
    background-color: white;
    padding: 0 8px;
`;
export const HeaderTitle = styled.View`
    flex:1;
`;

export const Icon = styled.TouchableOpacity`
    padding: 8px;
`;

//Cards
export const ContainerCards = styled.View`
    flex:1;
    background-color: #F5F5F5;
    padding: 8px;
`;

export const Card = styled.TouchableOpacity`
    padding: 12px;
    margin-bottom: 8px;
    flex-direction:row;
    flex:1;
    background-color: ${ props => props.background ? props.background : 'white'};
    border-radius: 3px;
`;

//Footer
export const Footer = styled.View`
    padding: 16px;
    flex:1;
    width:100%;
    position:absolute;
    bottom: 0;
    background-color: white;
`;

export const ButtonCheckout = styled.TouchableOpacity`
    padding: 12px;
    background-color: #4d7d13;
    color: white;
    justify-content:center;
    align-items:center;
    border-radius: 5px;
`;
