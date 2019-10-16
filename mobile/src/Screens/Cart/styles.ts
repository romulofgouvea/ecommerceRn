import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #F5F5F5
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 54;
    background-color: white;
    padding: 0 8px;
`;

export const Icon = styled.TouchableOpacity`
    padding: 8px;
`;

export const Card = styled.View`
    padding: 12px;
    flex-direction:row;
    flex:1;
    background-color: white;
`;

export const CardImage = styled.Image`
    width:120px;
`;

export const ContainerTexts = styled.View`
    flex:1;
    padding: 0 12px;
`;

export const CardTitle = styled.Text`
    color: #222;
`;

export const CardDesc = styled.Text`
    color: #DDD;
`;

export const CardPrice = styled.Text`
    font-weight: 500;
    color: #4d7d13;
`;

export const ContainerLessMore = styled.View`
    flex-direction:row;
    align-items:center;
    flex:0.5;
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

export const ContainerNoCart = styled.View`
    background-color: #F5F5F5;
    justify-content: center;
    align-items: center;
    text-align:center;
    flex:1;
`;
export const ContainerNoCartText = styled.View`
    padding: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
