import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color: white;
    padding: 46px;
`;

export const LoginImage = styled.Image`
    width:200px;
`;

export const LoginButton = styled.TouchableOpacity`
    align-items:center;
    width:100%;
    border-radius: 5px;
    padding: 8px 0;
    background-color: ${props => props.buttonColor || "#F5F5F5"};
    margin: 4px;
`;

export const LoginText = styled.Text`
    color: white;
    padding: 8px 16px;
    font-size:16px;
`;
