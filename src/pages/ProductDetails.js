import React from 'react'
import { makeStyles, List, ListItem, ListItemText, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, IconButton, Box, Card, CardHeader, CardContent } from '@material-ui/core'
import Header from '../components/Header'
import { ArrowBack } from '@material-ui/icons'
import { useEffect } from 'react'
import { getProductDetails, createReview } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addToCart } from '../actions/cartActions'
import Rating from '@material-ui/lab/Rating';
import {Link} from "react-router-dom"
import Footer from '../components/Footer'

const ProductDetails = ({ history, location, match }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const classes = useStyles()
    console.log(location, match)
    const id = match.params.id

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const dispatch = useDispatch()
    console.log({ product })

    const addToCartHandler = (e) => {
        dispatch(addToCart(product, qty))
        history.push(`/cart/${match.params.id}?qty=${qty}`);
      };
   
      const userLogin = useSelector(state => state.userLogin)
      const {userInfo} = userLogin

      const productReview = useSelector(state => state.productReview)
      const {success} = productReview
      const handleReviewSubmit = (e) => {
         e.preventDefault()
         if(userInfo) dispatch(createReview(id, {rating, comment}))
         else history.push("/login")
      }
      console.log({product})
    useEffect(() => {

        dispatch(getProductDetails(id))
    }, [dispatch, success, id])
    return loading ? "loading..." : error ? error : (
        <div >
            <Header />
            <IconButton style={{ marginLeft: "5rem", marginTop: "2rem"}} onClick={() => history.goBack()} >
                <ArrowBack />
            </IconButton>
            <div className={classes.container}>

                <div className={classes.imgContainer}>
                    <img src={product.image} alt={product.name} />
                </div>



                <List className={classes.list}>
                    <ListItem>
                        <ListItemText
                            primary={<Typography variant={3}>{product.name}</Typography>} />
                    </ListItem>

                    <ListItem><Rating  readOnly value={product.rating}/></ListItem>

                    <ListItem>
                        <ListItemText primary={`$${product.price}`} />

                    </ListItem>
                    <ListItem>
                        <Typography variant="body2">{product.description}</Typography>
                    </ListItem>
                </List>
                <Box marginRight="2rem"></Box>
                <Paper className={classes.productInfo}>
                    <div className={classes.product}><Typography variant="body2">Price: </Typography> <Typography variant="body2">${qty * product.price}</Typography > </div>
                    <div className={classes.product}><Typography variant="body2">Status:</Typography>
                        <Typography variant="body2">  {product.countInStock === 0
                            ? "Out Of Stock"
                            : "In Stock"}</Typography >
                    </div>
                    <div className={classes.product}>
                        <Typography variant="body2">Quantity: </Typography>
                           
                           {product.countInStock && (<FormControl>

<Select variant="outlined" value={qty} onChange={(e)=> setQty(e.target.value)}>
    {[...Array(product.countInStock).keys()].map(x => (
        <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
    ))}
</Select>
</FormControl>)}
                        
                    </div>
                    <Button disabled={!product.countInStock} onClick={addToCartHandler} fullWidth variant="contained">Add to cart</Button>
                </Paper>


            </div>
            <Box className={classes.productRating} >
                <Typography variant="h4">Reviews</Typography>
                <Box>
                    {product.reviews.map(review => (<Card>
                    <CardHeader 
                    title={review.name}
                    subheader={review.createdAt.split("T")[0]}
                    action={<Rating readOnly value={review.rating}/>}
                    />
                     <CardContent>
                    <Typography variant="body2">{review.comment}</Typography>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio pariatur repellat consequatur animi minima incidunt quo id ipsa est eius impedit qui aspernatur ipsum, quaerat dolore culpa suscipit laborum harum.
                     </CardContent>
                    </Card>

                    ))}
                </Box>
                <Paper className={classes.paper} elevation={2}>
                    {userInfo? ( <form className={classes.form} onSubmit={handleReviewSubmit}>
                    <Typography variant="body2">Write a customer review</Typography>
                 
                    <FormControl>
                        <InputLabel style={{paddingLeft: "1rem"}} id="rating">Rating</InputLabel>
                        <Select variant="outlined" id="rating" value={rating} onChange={(e)=> setRating(e.target.value)}>
                        <MenuItem value="">Select...</MenuItem>
                          <MenuItem value="1">Poor</MenuItem>
                          <MenuItem value="2">Fair</MenuItem>
                          <MenuItem value="3">Good</MenuItem>
                          <MenuItem value="4">Very Good</MenuItem>
                          <MenuItem value="5">Excellent</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField variant="outlined" type="text" multiline label="Comment" value={comment} onChange={(e)=> setComment(e.target.value)} />
                    <Button type="submit" variant="contained">Submit</Button>
                </form>) : <Typography> Please <Link style={{textDecoration: "none"}} to="/login">sign in</Link> to leave a review</Typography>}
               
                </Paper>
            </Box>
            <Footer />
        </div>
    )
}



const useStyles = makeStyles((theme) => ({
    root: {
        //    display: "flex",
        //    alignItems: "center"
    },
    container: {
        //    display: "grid",
        //    gridTemplateColumns: "1fr 1fr 1fr",
        //    gridGap: "1rem",
        margin: "0 5rem",
        display: "flex",
        // gap: "2rem",
        flexWrap: "wrap"
        // alignItems: "center"
    },
    imgContainer: {
        flex: ".35",
        width: "100%",
        height: "20rem",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "inline-block"
        }
    },
    productInfo: {
        height: "fit-content",
        flex: " .3",
        padding: "1rem",
        width: "80%",
        "& .MuiButtonBase-root": {
            background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
            border: "1px solid #a2a4a9",
            textTransform: "capitalize",
        },
    },
    reviewForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        border: "1px solid #eee",
        padding: "1rem",
        width: "60%",
        "& .MuiTypography-body2": {
            fontSize: "1.3rem",
            marginBottom: "1rem"
        },
        "& .MuiFormControl-root": {
            marginBottom: "1rem"
        },
        "& .MuiButtonBase-root": {
            background: "#131921",
            color: "white",
            padding: ".5rem .7rem"
        }
    },
    productRating: {
        marginLeft: "5rem",
        marginTop: "2rem",
        "& .MuiButtonBase-root": {
            background: "linear-gradient(to bottom, #f5f6f8, #e7e9ec)",
            textTransform: "capitalize",
             border: "1px solid #a2a4a9",
             marginTop: "1rem",
             
        }
    },
    product: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
    },
    list: {
        flex: ".35",
        width: "100%",
        "& .MuiListItem-root": {
            borderBottom: "1px solid #eee"
        }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        // border: "1px solid #eee",
        // padding: "2rem 0",
        // width: "40%",
        width: "100%",
        
        "& .MuiFormControl-root": {
            marginTop: "1rem",
            width: "100%"
        }
    },
    paper: {
        height: "fit-content",
        flex: " .2",
        padding: "1rem",
        width: "30%",
        marginTop: "1rem"
       
    },
    [theme.breakpoints.down("sm")]: {
        container: {
            flexDirection: "column"
        },
        form: {
            width: "100%"
        },
        paper: {
            width: "fit-content"
        }
    },

}))

export default ProductDetails
