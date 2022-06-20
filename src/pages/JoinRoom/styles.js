import styled from 'styled-components'
import { Typography } from '@mui/material';

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

const ErrorMessage = styled.div`
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: black;
`;

const Title = styled(Typography)`
    &.MuiTypography-root {
        font-family: 'Montserrat', sans-serif;
    }
`;

export{
    Container,
    ErrorMessage,
    Title,
}