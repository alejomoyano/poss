import styled from 'styled-components'

import { colors } from '../../utils/colors';

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;
    background-color: ${colors.base.primary};
`;

export {
  Container,
}
