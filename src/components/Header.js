import React, { useState } from 'react'
import {AppBar, makeStyles,   IconButton, Badge } from "@material-ui/core"
import {Search, ShoppingBasket, Menu} from "@material-ui/icons"
import {Link, useHistory} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar'
import { logout } from '../actions/userActions'
const Header = () => {
  
  

    //get cart items from global state
    const cart =  useSelector(state => state.cart)
    const {cartItems} = cart

    const [open, setOpen]= useState(false)
    const [keyword, setKeyword] = useState("")

    //get userInfo from global state
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSearch = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else {
            history.push("/")
        }
    }
    //style
    const classes = useStyles()
    return (
        <>
        <AppBar className={classes.root}>
            <IconButton onClick={()=> setOpen(!open)}>
            <Menu style={{color: "white"}} className={classes.menuIcon}/>
            </IconButton>
            <Link className={classes.logo} to="/">
         <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" />
         </Link>
         <form className={classes.headerSearch} onSubmit={handleSearch} >
         <input type="text" className={classes.searchInput} value={keyword} onChange={(e)=> setKeyword(e.target.value)} />
              <button className={classes.searchIcon} type="submit">
                  <Search />
              </button>
         </form>
         <div className={classes.headerContent}>
             {userInfo ? ( <div className={classes.headerOption} onClick={()=> dispatch(logout())}>
    <span className="text-muted">Hello, {userInfo.name}</span>
    <span className="link">Sign out</span> 
         </div>) : (<Link to="/login" className={classes.headerOption}>
         <span className="text-muted">Hello, </span>
                    <span className="link">sign in</span> 
         </Link>)}
         
        
         <div className={classes.headerOption}>
         <span className="text-muted">Returns</span>
                    <span className="link">& orders</span> 
         </div>
         <div className={classes.headerOption}>
         <span className="text-muted">Your</span>
                    <span className="link">Prime</span> 
         </div>
         <div className={classes.headerOption}>
         {/* <span className="text-muted">Returns</span>
                    <span className="link">& orders</span>  */}
                    {/* <Link to={user ? "/checkout" : "/login"}> */}
            <div className="header__optionBasket">
                <Badge component={Link} to="/cart" className={classes.link} badgeContent={cartItems.length} color="secondary" >
                <ShoppingBasket/>
                </Badge>
    
            </div>
            {/* </Link> */}
         </div>
         </div>
         <div className={classes.headerBasket}>
         <Badge component={Link} to="/cart" className={classes.link} badgeContent={cartItems.length} color="secondary" >
                <ShoppingBasket/>
                </Badge>
         </div>
        </AppBar>
        <div style={{marginBottom: "4.5rem"}}/>
      <Sidebar open={open} setOpen={setOpen}/>
        </>
    )
}

const useStyles = makeStyles((theme)=> ({
    root: {
    backgroundColor: "#131921",
    flexDirection: "row",
    alignItems: "center",
    // display: "flex",
    // alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
    },
    link: {
  textDecoration: "none",
  color: "white"
    },
    logo: {
        padding: "1rem",
        width: "6rem",
        cursor: "pointer",
        marginTop: "1rem",
        "& img": {
            width: "100%",
            objectFit: "contain"
     
        },
        display: "grid",
        placeItems: "center"
    },
    headerSearch: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flex: "1",
        border: "3px solid transparent",
        "& .MuiInputBase-root": {

        },
       
    },
    searchIcon: {
        backgroundColor: "#febd69",
        height: "42px",
        width: "50px",
        display: "grid",
        placeItems: "center",
        // borderRadius: "1px",
        border: "1px solid transparent",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        "&:hover": {
            backgroundColor: "#f3a847",
            cursor: "pointer",
        },
        "& svg": {
            color: "black",
            fontSize: "2rem"
        }
    },
    menuIcon: {
fontSize: "2.5rem",

    },
    searchInput: {
        height: "40px",
        outlineWidth: "0",
        border: "none",
        width: "100%",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        paddingLeft: "1rem"
    },
    headerContent: {
        display: "flex",
        alignItems: "center",
        // flexWrap: "wrap",
       margin: "auto",
        justifySelf: "center",
    },
    headerOption: {
        display: "flex",
        flexDirection: "column",
        margin:" 0px 10px",
        padding: "7px",
        border: "1px solid transparent",
        overflow: "hidden",
        cursor: "pointer",
        color: "white",
        textDecoration: "none",
        "&:hover": {
            borderColor: "white"
        }
    },
    headerBasket: {
       display: "none"     
    },
    [theme.breakpoints.down("sm")]: {
      headerSearch: {
        //   order: "2",
          margin: "0 1rem",
          flex: ".7",
      },
      logo: {
        flex: ".2",
        padding: "0",
        "& img": {
            height: "2.5rem"
        }
        
      },
      headerContent: {
        //   order: "1",
        //   flex: "1",
          display: "none",
        
      },
      headerBasket: {
          display: "block",
          flex: ".1"
      }
    },
    [theme.breakpoints.down("xs")]: {
      headerSearch: {
        //   order: "2",
          margin: "0 1rem",
          flex: ".6",
      },
      logo: {
        flex: ".3",
        padding: "0",
        "& img": {
            height: "3rem"
        }

      },
      headerContent: {
        //   order: "1",
        //   flex: "1",
          display: "none",
        
      },
      headerBasket: {
          display: "block",
          flex: ".1"
      }
    }
}))

export default Header
