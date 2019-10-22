import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #F5F5F5;
`;

export const ContainerOrders = styled.View`
    flex:1;
    background-color: #F5F5F5;
    padding: 16px;
`;

export const StatusCard = styled.Text`
    color: #ACACAC;
    padding: 8px;
    margin-bottom: 8px;
    font-size: 18px;
    background-color: white;
    text-align:center;
    justify-content: center;
    align-items: center;
    border-top-width:1;
    border-top-color: #ACACAC;
`;


export const TitleCard = styled.Text`
    color: #ACACAC;
    padding: 0 0 8px 0;
    font-size: 18px;
`;

export const CardOrders = styled.View`
    background-color: white;
    padding: 8px 16px;
    flex-direction:row;
    align-items: center;
`;

export const CardOrdersProducts = styled.View`
    flex: 1;
    flex-wrap:wrap;
`;

//Panel address
export const AddressContent = styled.View`
    flex:1;
    margin-bottom: 8px;
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

//Painel Prodcts
export const ProductsName = styled.Text`
    color: ${ props => props.color ? props.color : "#ACACAC"};
    font-size: 16px;
    margin: 0 0 12px 0;
    font-weight: 500;
`;


//Container no Order
export const ContainerNoData = styled.View`
    background-color: #F5F5F5;
    justify-content: center;
    align-items: center;
    text-align:center;
    flex:1;
`;
export const ContainerNoDataText = styled.View`
    padding: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const ButtonCheckout = styled.TouchableOpacity`
    padding: 12px;
    background-color: #4d7d13;
    color: white;
    justify-content:center;
    align-items:center;
    border-radius: 5px;
`;
