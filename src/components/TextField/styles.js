import styled from 'styled-components';
import {TextField } from '@mui/material';

import { colors } from '../../utils/colors';

const StyledTextField = styled(TextField)`
    &.MuiTextField-root {
        background-color: ${colors.base.alpha};
        border-radius: 5px;
        padding: 5px;
    }
    & label {
        font-family: 'Montserrat', sans-serif;
        padding: 5px;
    }
    & input {
        font-family: 'Roboto', sans-serif;
    }
    & label.Mui-focused {
        color: ${colors.base.secondary};
    }
    & .MuiInput-underline:after {
        border-bottom-color: ${colors.base.secondary};
    }
`;

export {
    StyledTextField
};