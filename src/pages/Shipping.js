import React  from 'react'
import { Typography, TextField, Button, makeStyles } from '@material-ui/core'
import {  useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Header from '../components/Header'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Footer from '../components/Footer'


const Shipping = ({history}) => {
     

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
   
      const dispatch = useDispatch()
    const handleSubmit = (e)=> {
        e.preventDefault()
        
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push("/payment")
    }
    const classes = useStyles()
    return (
        <div className={classes.root}>
             
                <Header />
                <CheckoutSteps step1 step2 />
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h3">Shipping</Typography> 
                <TextField type="text" variant="outlined" label="Address" value={address} onChange={(e)=> setAddress(e.target.value)} />
                <TextField type="text" variant="outlined" label="City" value={city} onChange={(e)=> setCity(e.target.value)} />
                <TextField type="text" variant="outlined" label="PostalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} />
                <TextField type="text" variant="outlined" label="Country" value={country} onChange={(e)=> setCountry(e.target.value)} />
                <Button type="submit">Continue</Button>
            </form>
           <Footer />
        </div>
    )
}


const useStyles = makeStyles((theme)=> ({

    root: {
     display: "flex",
    justifyContent: "center",
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
        // border: "1px solid #f0f0f0",
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
export default Shipping
