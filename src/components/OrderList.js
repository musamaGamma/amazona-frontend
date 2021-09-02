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

  Box,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import {Clear } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrders } from "../actions/orderActions";
import { useHistory } from "react-router-dom";

const OrderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };
  const orderList = useSelector(state => state.orderList)
  const {orders, loading, error} = orderList
  const history = useHistory()
  
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getOrders())
  }, [dispatch])
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display='flex' width="100%" className={classes.headline} alignItems='center' mb={2} justifyContent='space-between'>
        <Typography variant="h5">My orders</Typography>{" "}
      </Box>
      {loading? <CircularProgress variant="indeterminate"/> :error? error : ( <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>total</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow tabIndex={-1} hover role='checkbox' key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>{order.isPaid? order.paidAt.split("T")[0] : <Clear style={{color: "red"}}/>}</TableCell>
                  <TableCell>{order.isDelivered? order.deliveredAt.split("T")[0] : <Clear style={{color: "red"}}/>}</TableCell>
                  <TableCell><Button onClick={()=> history.push(`/order/${order._id}`) }>Details</Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                // component="div"
                count={orders?.length}
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
export default OrderList;
