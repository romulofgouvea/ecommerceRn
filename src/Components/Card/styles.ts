import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: white;
    border-radius: 5px;
    flex:1;
    justify-content:center;
    align-items: center;
    flex-basis: 0;
    margin: 12px;
`;

export const Image = styled.Image`
    height:130;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export const Price = styled.Text`
    color: #4d7d13;
    padding: 8px 0 0 0;
`;

export const Name = styled.Text`
    color: #bab9b9;
`;

export const MeasureItem = styled.Text`
    color: #C6C6C6;
    padding-bottom: 8px;
`;

export const Icon = styled.TouchableOpacity`
    padding: 7px;
`;

export const FooterCard = styled.View`
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    border-top-width: 1px;
    border-top-color: #bab9b9;
    padding: 8px;
`;

export const ButtonAddToCart = styled.TouchableOpacity`
    flex-wrap: wrap;
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`;

export const ContainerAddLessCart = styled.View`
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
`;