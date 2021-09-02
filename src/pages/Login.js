import React, { useEffect } from 'react'
import { Typography, TextField, Button, makeStyles } from '@material-ui/core'
import { Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/userActions'
import { useState } from 'react'
const Login = ({history, location}) => {
     
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //getting userinfo from global state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, error} = userLogin
     //
    const redirect = location.search ? location.search.split("=")[1] : "/"
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }
    useEffect(() => {
        if(userInfo) history.push(redirect) 
     }, [userInfo, history, redirect]);
 
    const classes = useStyles()
    return (
        <div className={classes.root}>
             
             
            <Link to="/" className={classes.logo}>
              <img
                className="img-fluid"
                src="https://leanchange.org/wp-content/uploads/2014/10/amazon_logo_large.png"
                alt=""
              />
           </Link>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h3">Sign-In</Typography> 
                {error && <Typography className={classes.error} variant="body2" style={{color: "#c40000"}}>{error}</Typography>}
                <TextField type="email" variant="outlined" label="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <TextField type="password" variant="outlined" label="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <Button type="submit">Sign in</Button>
                <Typography variant="body2">By continuing, you agree to Amazon's <span style={{color: "#0066c0"}}> Conditions of Use</span>  and <span style={{color: "#0066c0"}} >Privacy Notice</span> .</Typography>
            </form>
            <div className={classes.divider}>
                New to amazon?
            </div>
            <Button component={Link} to="/register" className={classes.signupBtn}>Create your amazon account</Button>

            <footer className={classes.footer} >
          <div className="mt-3">
            <Button className="footer__btn">Conditions of Use</Button>
            <Button className="footer__btn">Privacy Notice</Button>
            <Button className="footer__btn">Help </Button>
          </div>
          <p className="mt-3">
            © 1996-2020, Amazon.com, Inc. or its affiliates
          </p>
        </footer>
        </div>
    )
}


const useStyles = makeStyles((theme)=> ({

    root: {
     display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
     height: "100vh"
    },
    logo: {
    width: "10rem",
    margin: ".5rem 0",
    marginTop: "2rem",
    "& img": {
        width: "100%",
        display: "block"
    }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "25%",
        border: "1px solid #f0f0f0",
        padding: "1rem",
        "& .MuiTypography-h3": {
          textAlign: "start",
          marginBottom: "1rem",
          fontSize: "1.7rem"
        },
        "& .MuiTypography-body2": {
           marginTop: "1rem",
        },
        "& .MuiTextField-root": {
            marginBottom: "1rem",
            "& .Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                 borderColor: "#e77600"
                }
            }
        },
        "& .MuiButtonBase-root": {
            background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
            border: "1px solid #a2a4a9",
            textTransform: "capitalize",
            fontWeight: "500"
        }
    },
    divider: {
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#767676",
        "&::before": {
            content: '""',
  display:"inline-block",
    width: "100px",
  height: "1px",
  margin: "0 5px",
  backgroundColor: "#cfcfcf"
        },
        "&::after": {
            content: '""',
  display:"inline-block",
    width: "100px",
  height: "1px",
  margin: "0 5px",
  backgroundColor: "#cfcfcf"
        }
    },
    signupBtn: {
        background: "linear-gradient(to bottom, #f5f6f8, #e7e9ec)",
        textTransform: "capitalize",
         border: "1px solid #a2a4a9",
         marginTop: "1rem",
         width: "25%",
    },
    error: {
        textAlign: "center",
        marginBottom: "1rem",
        fontSize: "1.2rem"
    },
    [theme.breakpoints.down("sm")]: {
        form: {
            width: "50%"
        },
        signupBtn: {
            width: "50%"
        },
    },
    [theme.breakpoints.down("xs")]: {
        form: {
            width: "70%"
        },
        signupBtn: {
            width: "70%"
        },
    },

    footer: {
        borderTop: "1px solid #eaeaea",
        boxShadow: "inset 0px 1px 7px #e5e5e5",
        backgroundColor: "#fdfdfd",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1rem",
        marginTop: "2rem",
        height: "100%",
        "& .MuiButtonBase-root": {
            background: "none",
    border: "none",
    padding: "none",
    color: "#069",
    textTransform: "capitalize"
        }
    }
}))
export default Login
