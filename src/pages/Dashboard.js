import React from "react";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { Box, IconButton, Typography, makeStyles, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import Footer from "../components/Footer";

const Dashboard = ({ history }) => {

    const classes = useStyles()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
  return (
    <div>
      <Header />
      <Box display="flex" className={classes.headline} alignItems="center">
        {" "}
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>{" "}
        <Typography variant='h3' className={classes.title} >Dashboard</Typography>{" "}
      </Box>
      <Box mx={4} mb={4} display="flex" className={classes.container}>
          <Box>
              <Box mb={2}>
              <Typography variant="h5">My profile</Typography>
              </Box>
          <Paper className={classes.paper}>
  <Typography variant="h6">Name: {userInfo.name}</Typography>
  <Typography variant="h6">Email: {userInfo.email}</Typography>
          </Paper>
          </Box>
          <Box>
          <ProductsList />
       <div style={{marginTop: "1rem"}} />
       <OrderList />
          </Box>
      
      </Box>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles(()=> ({
   title: {
       fontSize: "1.5rem"
   },
   container: {
       display: "flex",
       justifyContent: "flex-start",
       alignItems: "baseline",
       gap: "4rem",
       flexWrap: "wrap"
       

   },
   paper: {
       padding: "1rem",
    //    marginTop: "3rem"
   },
   headline: {
       marginTop: "6rem"
   }
}))

export default Dashboard;
