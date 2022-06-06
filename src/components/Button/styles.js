import styled from "styled-components";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
    &.MuiButton-root {
        background-color: purple;
        &:hover{
            background-color: black;
        }
    }
`;

export {
    StyledButton,
};
