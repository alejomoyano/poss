import React from 'react';
import { StyledButton } from './styles';

const Button = ({
    classname,
    variant,
    children,
    ...props
}) => {
    return (
        <StyledButton
            className={classname}
            variant={variant || "contained"}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default Button;