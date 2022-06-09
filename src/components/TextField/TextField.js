import React from "react";
import { StyledTextField } from "./styles";

const TextField = ({
    classname,
    variant,
    ...props
}) => {
    return (
        <StyledTextField
            className={classname}
            variant={variant || "standard"}
            {...props}
        />
    )
};

export default TextField;