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
    min-height: 44;
    background-color: white;
    padding: 0 8px;
    elevation: 2;
`;
export const HeaderTitle = styled.View`
    flex:1;
`;

export const Icon = styled.TouchableOpacity`
    padding: 8px;
`;

export const ContainerCard = styled.View`
    margin: 8px;
    padding: ${props => props.p ? props.p : 0}px;
    background-color: white;
`;

//Panel Cart
export const Card = styled.View`
    padding: 12px;
    flex-direction:row;
    flex:1;
    background-color: ${props => props.bgColor ? props.bgColor : 'white'};
    align-items: center;
`;

export const CardImage = styled.Image`
    width:130px;
    height:70px;
`;

export const CardTexts = styled.View`
    flex:1;
    padding: 0 12px;
`;

export const CardTitle = styled.Text`
    color: #222;
    font-size: 18px;
`;

export const CardDesc = styled.Text`
    color: #DDD;
`;

export const ContainerPrice = styled.View`
    flex:1;
    padding: 0 12px;
    justify-content:center;
`;

export const CardPrice = styled.Text`
    font-weight: 500;
    color: #4d7d13;
    font-size: 18px;
`;

export const CardQty = styled.Text`
    font-weight: 500;
    font-size: 18px;
`;

export const CardTotal = styled.View`
    padding: 12px 18px;
    flex-direction:row;
    justify-content:space-between;
    background-color: #4d7d13;
`;


//Panel address
export const AddressContent = styled.View`
    flex:1;
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
