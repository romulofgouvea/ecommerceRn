import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #F5F5F5
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 44;
    background-color: white;
    padding: 0 8px;
`;
export const ImageHeader = styled.View`
    flex:1
`;

export const Icon = styled.TouchableOpacity`
    flex: 0.1;
    align-items:center;
    padding: 8px;
`;

export const ContainerCards = styled.View`
    flex:1;
    padding: 16px;
`;

export const CardEmpty = styled.View`
    background-color: transparent
`;