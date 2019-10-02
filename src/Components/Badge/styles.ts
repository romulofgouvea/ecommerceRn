import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #4d7d13;
    width: ${props => props.width ? props.width : 18};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 4;
    right: 4;
    z-index: 5;
`;

export const Text = styled.Text`
    color: white;
    padding: ${props => props.padding ? props.padding : 2}px;
    font-size: ${props => props.size ? props.size : 10};
    font-weight: 700
`;