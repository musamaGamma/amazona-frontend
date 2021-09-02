import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  TableFooter,
  TablePagination,
  Fab,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyProducts } from "../actions/productActions";

const ProductsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };
  const productMyList = useSelector(state => state.productMyList)
  const {products, loading, error} = productMyList
  const history = useHistory()
  
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(fetchMyProducts())
  }, [dispatch])
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display='flex' width="100%" className={classes.headline} alignItems='center' mb={2} justifyContent='space-between'>
        <Typography variant="h5">My products</Typography>{" "}
        <Fab color="primary" size='small' onClick={()=> history.push("/products/new")}>
          <Add />{" "}
        </Fab>{" "}
      </Box>
      {loading? <CircularProgress variant="indeterminate"/> :error? error : ( <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>count in stock</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow tabIndex={-1} hover role='checkbox' key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>{item.countInStock}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                // component="div"
                count={products?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                colSpan={3}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>)}
     
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    width: "100%",
  },
  headline: {
   width: "100%"
  },
  table: {
    //    width: "80%"
  },
  [theme.breakpoints.down("sm")]: {
    container: {
        width: "100%",
      },
      headline: {
          width: "100%"
      }
  }
}));
export default ProductsList;
