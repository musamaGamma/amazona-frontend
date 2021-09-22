import React from 'react'
import { makeStyles, Drawer, List,  ListItem, ListItemText } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../actions/productActions'
import {Link, useHistory} from "react-router-dom"
import { logout } from '../actions/userActions'

const Sidebar = ({open, setOpen}) => {
  

    const categoryList = useSelector(state=> state.categoryList)
    const {categories} = categoryList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
   const history = useHistory()
const dispatch = useDispatch()

const handleClose = () => {
    setOpen(false)
}
const handleLogout = () => {
    dispatch(logout())
    setOpen(false)
}
    useEffect(()=> {
     dispatch(fetchCategories())
   
    },[dispatch])

    const classes = useStyles()
    return (
        <Drawer open={open} className={classes.sidebar} anchor="left" variant="persistent">
           {/* <IconButton onClick={()=> setOpen(false)}>
           <ArrowBackIos />
           </IconButton> */}
           <List>
               <ListItem button onClick={handleClose} key="home" component={Link} to="/">
                <ListItemText style={{color: "white"}} primary="Home"/>
               </ListItem>
               <ListItem button onClick={handleClose} key="dashboard" component={Link} to={userInfo? "/dashboard" : "/login"}>
                <ListItemText style={{color: "white"}} primary={userInfo? "Dashboard" : "Login"}/>
               </ListItem>
               {userInfo && ( <ListItem button onClick={handleLogout}  >
                <ListItemText style={{color: "white"}} primary="Logout"/>
               </ListItem>)}
              
               <ListItem button onClick={handleClose} key="cart" component={Link} to="/cart">
                <ListItemText style={{color: "white"}} primary="Cart"/>
               </ListItem>
               <ListItem button onClick={handleClose} key="categories" >
                <ListItemText style={{color: "white"}} primary="Categories"/>
               </ListItem>
               <List disablePadding className={classes.nested}>
                {/* <ListSubheader style={{color: "white"}}>
                    Categories
                </ListSubheader> */}
                {Array.isArray(categories) && categories?.map(category => (<ListItem key={category._id} button onClick={handleClose}> 
                    <ListItemText style={{color: "white"}} primary={category.name} onClick={()=> history.push(`/categories/${category._id}`)}/>
                </ListItem>))}
            </List>
           </List>
           
        </Drawer>
    )
}

const useStyles = makeStyles((theme)=> ({
sidebar: {
    "& .MuiDrawer-paper": {
        top: "64px",
        width: "20%",
        backgroundColor: "#131921",
    },
    color: "white",

},
nested: {
    paddingLeft: theme.spacing(4),
  },
[theme.breakpoints.down("sm")]: {
    sidebar: {
        "& .MuiDrawer-paper": {
            top: "64px",
            width: "35%",
            backgroundColor: "#131921",
        },
    }
},
[theme.breakpoints.down("xs")]: {
    sidebar: {
        "& .MuiDrawer-paper": {
            top: "64px",
            width: "60%",
            backgroundColor: "#131921",
        },
    }
}
}))
export default Sidebar
