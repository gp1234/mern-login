import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

export default function RegisterForm({handleSubmit,onSubmit,register,errors,changeState}) {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={1} mt={1} >
                    <TextField 
                    error={errors.email}
                    inputRef={register({ required: true, pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/})} 
                    name="email" 
                    label="Email"
                    helperText={errors.email && 'El email es incorrecto'} 
                    fullWidth/>
                </Box>
                <Box mb={1} mt={1} >
                    <TextField 
                    error={errors.password}
                    inputRef={register({ required: true})} 
                    name="password" 
                    type="password" 
                    label="Contraseña" 
                    helperText={errors.password && 'La contraseña es requerida'} 
                    fullWidth/>
                </Box>
                <Box mb={2} mt={2} >
                    <Button fullWidth type="submit" variant="contained" color="primary">
                    Enviar
                    </Button>
                </Box>
                <Button onClick={() => changeState("register")} fullWidth  variant="outlined"  color="primary">
                    Registrarse
                    </Button>
        
                </form> 
        </div>
    )
}
