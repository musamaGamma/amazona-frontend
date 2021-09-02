import React from 'react'
import { makeStyles, Card, CardMedia, CardContent, Typography, CardActions, IconButton, Paper } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import {Link} from "react-router-dom"

const Product = ({product}) => {

    const classes = useStyles()
    return (
        <Card className={classes.root} component={Paper} >
        <CardMedia
          className={classes.media}
          title={product.name}
          component={Link} 
          to={`/products/${product._id}`}
          image={product.image}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
          </div>
          <Typography
           
            variant="p"
            color="textSecondary"
          >
            {product.description.substring(0, 100) + "..."}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography variant="h5">
            {product.price}$
          </Typography>
          <IconButton 
        //   onClick={()=> onAddToCart(product.id, 1)}
           aria-label="add to cart">
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    )
}


const useStyles = makeStyles((theme)=> ({
    root: {
        maxWidth: '100%',
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        zIndex: "10",
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "fit-content"
      },
      description: {
          margin: "0px 20px",
          overflow: "scroll",
          width: "100px",
          textAlign: "justify"
      }
}))
export default Product
