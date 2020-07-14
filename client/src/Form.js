import React, {useState, useEffect} from "react"
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "auto",
    display: "block",
    marginTop: '40px',
    padding: '40px',
    minHeight: '200px',
    '&  div': {
      marginBottom: '5px'
    },
    TextField: {
      width: "100%"
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#eee'
    },
    [theme.breakpoints.up("md")]: {
      width: '400px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },

  

  }

}))


const Form = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoader] = useState(false);
  const [user, setUser] = useState('');


  const onSubmit = data =>  {

    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }

    const body = JSON.stringify(data);

    setLoader(true);
    axios.post('/register', data, {headers: config}).then((data) => {
      setLoader(false);
      if(data.token) {
        localStorage.setItem('user',data.token)
        setUser(data.token)
      }
      else {
        throw new Error("El usuario no esta disponible");
      }
     
    }).catch(err => {
      setLoader(false);
      console.error(err) })
  };
  return (

    <Paper className={classes.form}>
      {isLoading ?     
      <Grid container alignItems="center" justify="center" style={{ height: "100%"}}>
          <CircularProgress  />
      </Grid> : 
      <>
     <Typography variant="h4" gutterBottom>Formulario de Registro</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={errors.name}
          inputRef={register({ required: true })}
          name="name" label="Nombre" 
          helperText={errors.name && 'El nombre es requerido'} 
          fullWidth/>
        <br></br>
          <TextField 
          error={errors.email}
          inputRef={register({ required: true, pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/})} 
          name="email" 
          label="Email"
          helperText={errors.email && 'El email es incorrecto'} 
          fullWidth/>
        <br></br>
          <TextField 
           error={errors.password}
            inputRef={register({ required: true})} 
            name="password" 
            type="password" 
            label="Contraseña" 
            helperText={errors.password && 'La contraseña es requerida'} 
            fullWidth/>

        <br></br>
        <Button fullWidth type="submit" variant="contained" color="primary">
          Enviar
        </Button>

      </form> 
      </>
    
    }
  
     
    </Paper>

  )
}

export default Form;