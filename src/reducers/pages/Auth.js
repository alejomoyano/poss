import React, {useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function Auth(){

    const [name, setName] = useState(''); //Hook para guardar el name

    const handleSubmit = (event) => { // obtenemos el valor del texfield
        console.log(name);
    }

    return(
        <Box>
            <TextField variant="outlined" label="Nombre" size="small" onChange={e => setName(e.target.value)} required noValidate/>
            <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}


export default Auth;