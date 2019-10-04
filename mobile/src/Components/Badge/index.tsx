import React from 'react';

import { Container, Text } from './styles';

interface IProps {
    width?: number,
    padding?: number,
    size?: number,
}

const Badge: React.FC<IProps> = ({ width, padding, size, children }) => {
    return (
        <Container width={width}>
            <Text padding={padding} size={size}>{children}</Text>
        </Container>
    );
}

export default Badge;