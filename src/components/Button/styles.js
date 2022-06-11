import styled from "styled-components";
import { Button } from "@mui/material";

import { colors } from "../../utils/colors";

const StyledButton = styled(Button)`
    &.MuiButton-root {
        text-transform: none;
        font-family: 'Montserrat', sans-serif;
        background-color: ${colors.base.secondary};
        border-radius: 5px;
        &:hover{
            background-color: ${colors.shades.secondary2};
        }
    }
`;

export {
    StyledButton,
};
