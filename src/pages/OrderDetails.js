import React from 'react'
import Header from '../components/Header'
import { Box, Paper, makeStyles, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText,  CircularProgress } from '@material-ui/core'
import Alert from "@material-ui/lab/Alert"
import { useSelector, useDispatch } from 'react-redux'
import { getOrder, payOrder } from '../actions/orderActions'
import { useEffect } from 'react'
import StripeCheckout from "react-stripe-checkout"

const OrderDetails = ({history, match}) => {

    
     const orderPay = useSelector(state => state.orderPay)
     const {success} = orderPay
   const orderId = match.params.id
    //calculate prices 
    const addDecimal = (num) => {
        return +(Math.round(num * 100) / 100).toFixed(2);
      };
     
    const dispatch = useDispatch()
     console.log("helllllo ", process.env.REACT_APP_PUBLIC_KEY)
    const orderDetails = useSelector(state => state.orderDetails)
    const {order} = orderDetails

    if(order) {
        order.itemsPrice = addDecimal(
            order?.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
          );
    }
    console.log({order})

    const handleToken = (token, addresses) => {
        console.log(token, addresses)
        dispatch(payOrder(order._id, token))

    }
      useEffect(() => {
        dispatch(getOrder(orderId))
      }, [success, dispatch, orderId]);
    const classes = useStyles()
    return !order? <CircularProgress /> : (
        <div className={classes.root}>
            <Header />
            <Box mt={4} width="80%"> 
    <Typography variant="h5" >Order: {order._id}</Typography>
            </Box>
            <Box  className={classes.container} display="flex" m={1} mt={4}  width="80%">
                <Box className={classes.box} >
                    <Box className={classes.divider}>
                        <Typography variant="h3">Shipping</Typography>
                        <Typography variant="body2">  {order.shippingAddress.address},{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}</Typography>
    <Typography>{order.isDelivered? <Alert severity="success">delivered on {order.deliveredAt}</Alert> : <Alert severity="warning">Not delivered</Alert>}</Typography>
                    </Box>
                    <Box className={classes.divider}>
                    <Typography variant="h3">Payment method</Typography>
                        <Typography variant="body2">Method: {order.paymentMethod}</Typography>
                        <Typography> {order.isPaid? <Alert severity="success">Paid on {order.paidAt.split("T")[0]}</Alert>: <Alert severity="warning">Not paid</Alert>} </Typography>
                    </Box>
                    <Box>
                    <List>
                        {order?.orderItems?.map(item => (
 <ListItem key={item.product}>
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
                        <Box display="flex" justifyContent="space-between"><Typography variant="h6">Items</Typography> <Typography variant="body2">${order.itemsPrice}</Typography></Box>
                        <Box display="flex" justifyContent="space-between"><Typography variant="h6">Shipping</Typography> <Typography variant="body2">${order.shippingPrice}</Typography></Box>
                        <Box display="flex" justifyContent="space-between"><Typography variant="h6">Tax</Typography> <Typography variant="body2">${order.taxPrice}</Typography></Box>       
                 <Box display="flex" justifyContent="space-between"><Typography variant="h6">Total</Typography> <Typography variant="body2">${order.totalPrice}</Typography></Box>
                 <StripeCheckout amount={order.totalPrice * 100}  name={order.orderItems.map(x => x.name).join(" ")} billingAddress shippingAddress stripeKey={process.env.REACT_APP_PUBLIC_KEY} token={handleToken} style={{width: "100%"}} />
                 {/* <Button fullWidth variant="contained" className={classes.button} onClick={placeOrder} disabled={cart.cartItems.length === 0}>place order</Button> */}
                </Paper>
            </Box>
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
export default OrderDetails
