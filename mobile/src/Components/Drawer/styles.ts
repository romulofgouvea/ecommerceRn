import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    justify-content: center;
`;
export const RowButton = styled.TouchableOpacity`
    padding: 16px;
    flex-direction: row;
    background-color: ${props => (props.selected ? "#4d7d13" : "white")};
    align-items: center;
`;
export const TextButton = styled.Text`
    padding-left: 8px;
    color: ${props => (props.selected ? "white" : "#333")};
`;
