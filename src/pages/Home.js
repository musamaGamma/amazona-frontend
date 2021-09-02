import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
// import products from "./products"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { fetchProducts } from "../actions/productActions";
import Footer from "../components/Footer";

const Home = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([])
  const [page, setPage] = useState(1);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  const category = match.params.category;
  const productList = useSelector((state) => state.productList);
  const { products, pages, loading } = productList;
  console.log({ pageNumber });
  const handlePageChange = (event, value) => {
    setPage(value);
    if (keyword) history.push(`/search/${keyword}/page/${value}`);
    else history.push(`/page/${value}`);
  };
  useEffect(() => {
    dispatch(fetchProducts(category, keyword, pageNumber));
  }, [keyword, dispatch, category, pageNumber]);
  return (
    <div className={classes.home}>
      <Header />
      <div className={classes.hero}>
        <Carousel
    
          className={classes.carousel}
          autoPlay
          showThumbs={false}
          infiniteLoop
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          interval={4000}
        >
          <div >
            <img src='/images/banner1.jpg' alt="banner1" />
          </div>
          <div >
            <img src='/images/banner2.jpg' alt="banner2" />
          </div>
          <div >
            <img src='/images/banner3.jpg' alt="banner3" />
          </div>
        </Carousel>
      </div>

      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='center'
        mt={2}
        justifyContent='center'
        width='80%'
      >
        {loading && <CircularProgress />}
        {products?.map((product) => (
          // <Product  product={product} />
          <Box
            key={product._id}
            className={classes.product}
            component={Paper}
            m={2}
          >
            <Link
              className={classes.imgContainer}
              to={`/products/${product._id}`}
            >
              <img src={product.image} alt={product.name} />
            </Link>
            <Typography variant='h6'>{product.name}</Typography>
            <Button
              fullWidth
              variant='contained'
              onClick={() => dispatch(addToCart(product))}
            >
              add to cart
            </Button>
          </Box>
        ))}
      </Box>
      {pages > 1 && (
        <Pagination
          count={pages}
          page={page}
          onChange={handlePageChange}
          variant='outlined'
          shape='round'
        />
      )}
  <div style={{marginTop: "1rem"}}/>
<Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  home: {
    //  backgroundColor: "#eaeded",
    width: "100%",
    display: "grid",
    placeItems: "center",
    zIndex: "-10"
  },
  carousel: {
    //    height: "300px"
    // width: "80%",
    // height: "100%",
  },
  imgContainer: {
    flex: ".5",
    width: "100%",
    "& img": {
      width: "100%",
      height: "200px",
      objectFit: "contain",
      display: "block",
    },
  },
  hero: {
    width: "100%",
    maskImage: "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
    margin: "auto",
    marginTop: "-10px",
    display: "flex",
    justifyContent: "center",
    zIndex: "-9",

    marginBottom: "-150px",
    height: "400px"
  },
  product: {
    width: "300px",
    "& .MuiTypography-h6": {
      fontSize: "1rem",
      margin: ".7rem",
    },
    "& .MuiButtonBase-root": {
      background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
      border: "1px solid #a2a4a9",
      textTransform: "capitalize",
    },
  },
  
}));

export default Home;
