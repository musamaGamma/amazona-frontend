import React from 'react'
import Header from '../components/Header'
import { Box, Paper, makeStyles, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { useEffect } from 'react'
import { removeFromCart } from '../actions/cartActions'
import Footer from '../components/Footer'

const PlaceOrder = ({history}) => {

    const cart = useSelector(state => state.cart)


    //calculate prices 
    const addDecimal = (num) => {
        return +(Math.round(num * 100) / 100).toFixed(2);
      };
      //calculate Prices
      const itemsPrice = addDecimal(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    
     const shippingPrice = addDecimal(itemsPrice > 100 ? 0 : 100);
    
      const taxPrice = addDecimal(+(0.15 * itemsPrice).toFixed(2));
    
      const totalPrice = addDecimal(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    const dispatch = useDispatch()
      const placeOrder = () => {
          console.log("cart", cart.cartItems)
          dispatch(createOrder({
            orderItems: [...cart.cartItems],
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice ,
            shippingPrice,
            taxPrice,
            totalPrice,
          }))
      }
      const orderCreate = useSelector(state => state.orderCreate)
      const {order,  success} = orderCreate
      useEffect(() => {
         if(success) history.push(`/order/${order._id}`)

         cart.cartItems.forEach(x => {
             if(x.qty === 0) dispatch(removeFromCart(x.product))
         })
      }, [success, history, order, dispatch, cart.cartItems]);
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Header />
            <Box mt={4}>
            <CheckoutSteps step1 step2 step3 step4 />
            </Box>
            <Box  className={classes.container} display="flex" m={1} mt={4}  width="80%">
                <Box className={classes.box} >
                    <Box className={classes.divider}>
                        <Typography variant="h3">Shipping</Typography>
                        <Typography variant="body2">  {cart.shippingAddress.address},{cart.shippingAddress.city} ,
                {cart.shippingAddress.postalCode} ,
                {cart.shippingAddress.country}</Typography>
                    </Box>
                    <Box className={classes.divider}>
                    <Typography variant="h3">Payment method</Typography>
                        <Typography variant="body2">Method: {cart.paymentMethod}</Typography>
                    </Box>
                    <Box>
                    <List>
                        {cart.cartItems.map(item => (
 <ListItem>
 <ListItemAvatar>
     <Avatar src={item.image} variant="square"/>
 </ListItemAvatar>
 <ListItemText primary={item.name} secondary={`${item.qty} x $${item.price} = $${item.qty * item.price}`}/>
</ListItem>
                        ))}
                       
                    </List>
                    </Box>
                </Box>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Order Summary</Typography>
                        <Box display="flex" justifyContent="space-between"><Typography variant="h6">Items</Typography> <Typography variant="body2">${itemsPrice}</Typography></Box>
                        <Box display="flex" justifyContent="space-between"><Typography variant="h6">Shipping</Typography> <Typography variant="body2">${shippingPrice}</Typography></Box>
                        <Box display="flex" justifyContent="space-between"><Typography variant="h6">Tax</Typography> <Typography variant="body2">${taxPrice}</Typography></Box>       
                 <Box display="flex" justifyContent="space-between"><Typography variant="h6">Total</Typography> <Typography variant="body2">${totalPrice}</Typography></Box>
                 <Button fullWidth variant="contained" className={classes.button} onClick={placeOrder} disabled={cart.cartItems.length === 0}>place order</Button>
                </Paper>
            </Box>
            <Footer />
        </div>
    )
}

const useStyles = makeStyles((theme)=> ({
    root: {
        display: "grid",
        placeItems: "center"
      },
  container: {
    //   display: "flex",,
    minWidth: "500px",
    flexWrap: "wrap",
    gap: "1rem",
    "& .MuiTypography-h3": {
        fontSize: "1.3rem"
    },
    "& .MuiTypography-body2": {
        fontSize: "1rem",
        marginTop: ".5rem",
        marginBottom: "1rem"
    },
  },
  divider: {
  borderBottom: "1px solid rgba(0,0,0,.125)",
  marginBottom: ".5rem"
  },
  paper: {
      flex: ".30",
      height: "fit-content",
      padding: "1rem",
      "& .MuiTypography-h4": {
     fontSize: "1.5rem",
     marginBottom: ".4rem"
      },
      "& .MuiTypography-6": {
          fontSize: "1rem"
      }
  } ,
  box: {
  flex: ".70"
  },
  button: {
    background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
    border: "1px solid #a2a4a9",
    textTransform: "capitalize",
    fontWeight: "500",
    marginTop: "1rem"
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
        width: "90%",
        margin: "1rem",
        flex: "none"
    
    },
    box: {
        width:  "90%",
        margin: "1rem",
        marginTop: "2rem",
        // width: "20rem",
        flex: "none"
        
}
  }
}))
export default PlaceOrder
