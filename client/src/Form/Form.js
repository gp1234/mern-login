import React, {useState, useEffect} from "react"
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "auto",
    display: "block",
    marginTop: '40px',
    padding: '40px',
    minHeight: '200px',
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
  const [stateForm, setStateForm] = useState('register');


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
      </Grid> : stateForm=="register" ? <RegisterForm  changeState={setStateForm} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors}/> : <LoginForm changeState={setStateForm} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors}/>

    
    }
  
     
    </Paper>

  )
}

export default Form;