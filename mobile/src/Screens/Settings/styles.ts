import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #F5F5F5;
`;

export const ContainerConfig = styled.View`
    flex:1;
    background-color: #F5F5F5;
    padding: 16px;
`;

export const TitleCard = styled.Text`
    color: #ACACAC;
    padding: 0 0 8px 0;
    font-size: 18px;
`;

export const LineContainer = styled.View`
    flex-direction:row;
    justify-content: space-between;
`;

export const ContainerProfile = styled.View`
    background-color: white;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 5px;
`;

export const Icon = styled.TouchableOpacity`
    align-items:center;
    padding: 8px;
`;


export const ContainerEdit = styled.View`
    flex:1;
    margin: 16px;
    padding: 16px;
    background-color: white;
    border-radius: 5px;
`;

export const ProfileHeaderInput = styled.Text`
    color: ${ props => props.color ? props.color : "#4d7d13"};
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 500;
`;

export const ProfileInput = styled.TextInput`
    background-color: white;
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 500;
    border-width:1px;
    border-color: #4d7d13;
    border-radius: 5px;
    padding: 8px 16px;
`;

export const ButtonCheckout = styled.TouchableOpacity`
    padding: 12px;
    background-color: #4d7d13;
    color: white;
    justify-content:center;
    align-items:center;
    border-radius: 5px;
`;
