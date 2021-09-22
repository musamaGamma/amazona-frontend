import React, { useEffect } from 'react'
import { Typography, TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem, Snackbar, FormHelperText, Modal, Fab, Box, Paper, IconButton } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
import { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Header from '../components/Header'
import { fetchCategories, addProduct, createCategory } from '../actions/productActions'
import axios from 'axios'
import getError from '../utils/formatError'
import Footer from '../components/Footer'
import { Close } from '@material-ui/icons'

const AddProduct = ({history, location}) => {
     
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
 
    const [imageUrl, setImageUrl] = useState("")
    const [imageFile, setImageFile] = useState(null)
    
    const [uploading, setUploading] = useState(false)
    const [open, setOpen] = useState(false)
    const [openCategory, setOpenCategory] = useState(false)
    const [categoryName, setCategoryName] = useState("")
     

    const dispatch = useDispatch()
    //get login info from global state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin
   
    const categoryList = useSelector(state => state.categoryList)
    const {categories} = categoryList
    const productCreate = useSelector(state => state.productCreate)
    const {errors, success} = productCreate
   
    const categoryCreate = useSelector(state => state.categoryCreate)
    const {success:successCategory} = categoryCreate
  console.log({category})
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        console.log({file}, "frontend")
        formData.append("image", file)
        console.log('hllo',  formData)
        setUploading(true)
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
            
          }
          const { data } = await axios.post("/api/upload", formData, config) 
        
          setImageFile(data)
          setUploading(false)
        } catch (error) {
          console.log(error.message)
          setUploading(false)
        }
      
    }
     
    const handleSubmit = (e)=> {
        e.preventDefault()
        const image = imageUrl ? imageUrl : imageFile
       dispatch(addProduct({name, price, description, brand, image, category, countInStock}))
      
       setName("")
       setPrice(0)
        // setBrand("")
    //   setCountInStock(0)
       setDescription("")
        // setCategory("")
    
      setImageUrl("")
       setImageFile(null)
       
      
    }
    const handleAddCategory = ()=> {
        dispatch(createCategory(categoryName))
        setOpenCategory(false)
        // setCategoryName("")
    }
    useEffect(() => {
       if(!userInfo) history.push("/login") 
       dispatch(fetchCategories())
       if(success || errors) setOpen(true)
    
    }, [userInfo, history, dispatch, success, errors, successCategory]);

    const classes = useStyles()
    return (
        <div className={classes.root}>
      <Header />
             
            <form className={classes.form} onSubmit={handleSubmit} >
                <Typography variant="h3">Add product</Typography> 
    {/* {error && <Typography className={classes.error} variant="body2" style={{color: "#c40000"}}>{error}</Typography>} */}
                 
                <TextField required type="text" InputLabelProps={{className: classes.label}} error={Boolean(getError(errors, "name"))} helperText={getError(errors, "name")} variant="outlined" label="Name" value={name} onChange={(e)=> setName(e.target.value)} />
                <TextField required type="number" InputLabelProps={{className: classes.label}}  variant="outlined" label="Price" value={price} onChange={(e)=> setPrice(e.target.value)} />
                <TextField required type="text" InputLabelProps={{className: classes.label}} error={Boolean(getError(errors, "brand"))} helperText={getError(errors, "brand")} variant="outlined" label="Brand" value={brand} onChange={(e)=> setBrand(e.target.value)} />
                <TextField required type="number" InputLabelProps={{className: classes.label}} variant="outlined" label="Count in stock" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} />
                <TextField required type="text" InputLabelProps={{className: classes.label}} error={Boolean(getError(errors, "description"))} helperText={getError(errors, "description")} variant="outlined" label="Description" value={description} onChange={(e)=> setDescription(e.target.value)} />
                <TextField disabled={imageFile} required type="text" InputLabelProps={{className: classes.label}} error={Boolean(getError(errors, "image"))} helperText={getError(errors, "image")} variant="outlined" label="Image Url" value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} />
                <Typography className={classes.divider}>OR</Typography>
                <TextField required type="file" InputLabelProps={{ shrink: true, className: classes.label }} disabled={Boolean(imageUrl)} variant="outlined" label="Choose image"  onChange={handleFileUpload} />
                {uploading && "uploading..."}
                <Box display="flex" > 
                    <Fab size="small" onClick={()=> setOpenCategory(true)} style={{marginRight: ".5rem", margintBottom: "1rem"}}>
                    <AddIcon />
                    </Fab>
                <FormControl className={classes.formControl} fullWidth error={Boolean(getError(errors, "category"))} >
        <InputLabel id="category" style={{color: "black", paddingLeft: "1rem"}}>Category</InputLabel>
        <Select
          labelId="category"
          error={Boolean(getError(errors, "category"))}
          className={classes.select}
          value={category}
          variant="outlined"
         onChange={(e)=> setCategory(e.target.value)}
        >
            {categories && categories.map(category => (
<MenuItem  className={classes.li} key={category._id} value={category._id}>{category.name}</MenuItem>
            ))}
          
        
        </Select>
            <FormHelperText>{getError(errors, "category")}</FormHelperText>
      </FormControl> 
      </Box>
                <Button disabled={uploading} type="submit">Add product</Button>
               
               
              
            </form>
           <Snackbar open={open} message={errors? "an error occured" : "product added successfully"} autoHideDuration={3000}  onClose={()=> setOpen(false)}/>
           <Footer />
           <Modal open={openCategory}
          
           
           >
               <Paper className={classes.modal}>
                   <Box display="flex" mb={1} justifyContent="space-between" alignItems="center"><Typography variant="h5">Create category</Typography> <IconButton onClick={()=> setOpenCategory(false)}><Close /></IconButton> </Box>
               <form className={classes.formModal} onSubmit={handleAddCategory}>
                   <TextField  type="text" variant="outlined" required  label="Category name" value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} />
                   <Button type="submit" variant="contained" className={classes.button}>Create category</Button>
               </form>
               </Paper>
           </Modal>
        </div>
    )
}


const useStyles = makeStyles((theme)=> ({

    root: {
     display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
     height: "100vh"
    },
    logo: {
    width: "10rem",
    margin: ".5rem 0",
    marginTop: "2rem",
    "& img": {
        width: "100%",
        display: "block"
    }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        border: "1px solid #f0f0f0",
        padding: "1rem",
       
       
        "& .MuiTypography-h3": {
          textAlign: "start",
          marginBottom: "1rem",
          fontSize: "1.7rem"
        },
        "& .MuiTypography-body2": {
           marginTop: "1rem",
        },
        "& .MuiTextField-root": {
            marginBottom: "1rem",
           
            "& .Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                 borderColor: "#e77600"
                },
               
            }
        },
        "& .MuiButtonBase-root": {
            background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
            border: "1px solid #a2a4a9",
            textTransform: "capitalize",
            fontWeight: "500"
        }
    },
    button: {
        background: "linear-gradient(to bottom, #f6dc9d, #f1c559)",
        border: "1px solid #a2a4a9",
        textTransform: "capitalize",
        fontWeight: "500"
    },
    label: {
    color: "black !important",
   
    },
    formControl: {
        color: "black",
        marginBottom: "1rem",
        "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
             borderColor: "#e77600"
            }
        }
    },
    divider: {
        margin: "1rem",
        marginTop: "-.1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#767676",
        "&::before": {
            content: '""',
  display:"inline-block",
    width: "100px",
  height: "1px",
  margin: "0 5px",
  backgroundColor: "#cfcfcf"
        },
        "&::after": {
            content: '""',
  display:"inline-block",
    width: "100px",
  height: "1px",
  margin: "0 5px",
  backgroundColor: "#cfcfcf"
        }
    },
   

    loginLink: {
        borderTop: "1px solid #eaeaea",
        boxShadow: "inset 0px 1px 7px #e5e5e5",
        paddingTop: "1rem",
        paddingBottom: ".5rem"
    },
    error: {
        textAlign: "center",
        marginBottom: "1rem",
        fontSize: "1.2rem"
    },
    [theme.breakpoints.down("sm")]: {
        form: {
            width: "40%"
        },
        signupBtn: {
            width: "40%"
        },
    },
    [theme.breakpoints.down("xs")]: {
        form: {
            width: "70%"
        },
        signupBtn: {
            width: "70%"
        },
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "22rem",
        height: "12rem",
        transform: "translate(-50%, -50%)",
        padding: "1rem 1.5rem",
     //    "& .MuiIconButton-root": {
     //     position: "absolute",
     //     top: "1rem",
     //     right: "1rem",
     //     "& svg": {
     //         fontSize: "2.3rem"
     //     },
         
     //    },
      
       },
       formModal: {
           display: "flex",
           flexDirection: "column",
           "& .MuiTextField-root": {
               marginBottom: "1.5rem"
           }
       }
    // [theme.breakpoints.up("sm")]: {
    //     form: {
    //         width: "50%"
    //     },
    //     signupBtn: {
    //         width: "50%"
    //     },
    // },

    
}))
export default AddProduct

