import React from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, FormControl, Select, Paper, Box, makeStyles, Typography, MenuItem, Button } from '@material-ui/core'
import { Delete, ArrowBack } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header'
import { removeFromCart, addToCart } from '../actions/cartActions'
import {Link} from "react-router-dom"
import Footer from '../components/Footer'

const Cart = ({ history }) => {
    //getting cart items from global state
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()

    //styles
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Header />
            <Box flexWrap="wrap" display="flex" width="80%" mt={4} gap="2rem" >
                {cartItems.length ? (<List className={classes.list}>
                    {cartItems ? cartItems.map(item => (<ListItem component={Link} key={item.product} to={`/products/${item.product}`} >
                        <ListItemAvatar>
                            <Avatar variant="square" src={item.image} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} secondary={"$" + item.price}></ListItemText>
                        <ListItemSecondaryAction>
                            {item.countInStock ? (<><FormControl >
                                
                                <Select value={item.qty} variant="outlined" onChange={(e) => dispatch(addToCart(item, e.target.value))}>
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <MenuItem key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => dispatch(removeFromCart(item.product))}>
                                <Delete />
                            </IconButton>
                            </>) : <Typography>product out of stock</Typography>}
                            
                         
                        </ListItemSecondaryAction>
                    </ListItem>)) : "there is no items in the cart"
                    }

                </List>) : (
                        <Box flex=".70" justifyContent="center">
                            <Typography variant="h5" ><IconButton><ArrowBack onClick={() => history.goBack()} /> </IconButton> Your cart is empty</Typography></Box>)}

                <div className={classes.gap} />
                <Paper className={classes.paper}>
                    <Typography variant="h3">Subtotal ({cartItems.filter(x=> x.qty !==0).length}) Items</Typography>
                    <Typography variant="h5"> $
                {cartItems.reduce((a, b) => a + +b.qty * b.price, 0).toFixed(2)}</Typography>
                    <Button fullWidth variant="contained" disabled={cartItems.length === 0} onClick={() => history.push("/login?redirect=shipping")}>proceed to checkout</Button>
                </Paper>
            </Box>
            <Footer />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        placeItems: "center"
    },
    list: {
        flex: ".70",


    },
    paper: {
        flex: ".20",
        padding: "1rem",

        "& .MuiTypography-h3": {
            fontSize: "1.7rem",
            //    padding: "1rem"
        },
        "& .MuiTypography-h5": {
            //   padding: "1rem",
            fontsize: "1.5rem",
            marginTop: "1rem"
        },
        "& .MuiButtonBase-root": {
            background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
            border: "1px solid #a2a4a9",
            textTransform: "capitalize",
            marginTop: "2rem",
        },
    },
    gap: {
        flex: ".10"
    },
    [theme.breakpoints.down("sm")]: {
        paper: {
            width: "40%",
            margin: "1rem",
            flex: "none"

        },
        list: {
            width: "90%",
            margin: "1rem",
            marginTop: "6rem",
            // width: "20rem",
            "& .MuiListItemSecondaryAction-root": {
                display: "none"
            },
            flex: "none"

        }
    },
    [theme.breakpoints.down("xs")]: {
        paper: {
            width: "80%",
            margin: "1rem",
            flex: "none"

        },
        list: {
            width: "90%",
            margin: "1rem",
            marginTop: "6rem",
            // width: "20rem",
            "& .MuiListItemSecondaryAction-root": {
                display: "none"
            },
            flex: "none"

        }
    }
}))
export default Cart
