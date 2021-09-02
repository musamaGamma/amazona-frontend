import React from 'react'
import { Link } from "react-router-dom"
import { Typography, Breadcrumbs, makeStyles } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {



    const classes = useStyles()
    return (
     
            <Breadcrumbs separator={<NavigateNextIcon/>} aria-label="breadcrumb">
                {step1 ? (<Link  className={classes.link} to="/login" >
                    Sign In
  </Link>) : <Typography variant="h2" className={classes.text}>Sign in</Typography>}
                {step2 ? (<Link className={classes.link} to="/shipping" >
                    Shipping
  </Link>) : <Typography variant="h2" className={classes.text}>Shipping</Typography>}
                {step3 ? (<Link className={classes.link} to="/payment" >
                    Payment
  </Link>) : <Typography variant="h2" className={classes.text}>Payment</Typography>}
                {step4 ? (<Link className={classes.link} to="/placeorder" >
                    Place Order
  </Link>) : <Typography variant="h2" className={classes.text}>Place Order</Typography>}

            </Breadcrumbs>
    )
}

const useStyles = makeStyles(()=> ({
    link: {
        textDecoration: "none",
        color: "black",
        fontSize: "1rem"
    },
    text: {
       fontSize: "1rem",
       cursor: "pointer"
    },
}))
export default CheckoutSteps
