import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const Footer = () => {

    const classes = useStyles()
    return (
        <footer className={classes.footer}>
              <Typography variant="body2">
            © 1996-2020, Amazon.com, Inc. or its affiliates
          </Typography>
        </footer>
    )
}

export default Footer

const useStyles = makeStyles(()=> ({
    footer: {
    position: "relative",
    bottom: "0",
    left: "auto",
    right: "0",
        borderTop: "1px solid #eaeaea",
        boxShadow: "inset 0px 1px 7px #e5e5e5",
        backgroundColor: "#fdfdfd",
        padding: "1rem",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1rem",
        marginTop: "2rem",
zIndex: "-99",
        "& .MuiButtonBase-root": {
            background: "none",
    border: "none",
    padding: "none",
    color: "#069",
    textTransform: "capitalize"
        }
    },
}))