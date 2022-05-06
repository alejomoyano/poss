import React from 'react';
import { Box, TextField, Button } from '@mui/material';

function Auth(){
    return(
        <Box onSubmit={() => {
            console.log("anda");
        }}>
            <TextField variant="outlined" defaultValue="Ingrese un nombre de usuario" required/>
            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    );
}


export default Auth;