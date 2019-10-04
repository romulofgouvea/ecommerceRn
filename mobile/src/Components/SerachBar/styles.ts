import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 16px 0 16px;
`;

export const SearchInput = styled.TextInput`
  width: 80%;
  border-radius: 4px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-color: #4d7d13;
  padding: 8px;
  text-decoration: none;
  right: 0;
`;

export const SearchButton = styled.TouchableOpacity`
  border-color: #4d7d13;
  border-width: 1px;
  border-radius: 4px;
  padding: 12px;
  left: 0;
`;
