import styled from 'styled-components';
import {TextField } from '@mui/material';

const StyledTextField = styled(TextField)`
    background-color: white;
    & label.Mui-focused {
        color: purple;
    }
    & .MuiInput-underline:after {
        border-bottom-color: purple;
    }
`;

export {
    StyledTextField
};