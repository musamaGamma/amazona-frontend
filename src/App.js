// import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/shipping" component={Shipping}/>
        <Route path="/payment" component={Payment}/>
        <Route path="/placeorder" component={PlaceOrder}/>
        <Route path="/dashboard"  component={Dashboard}/>
        <Route path="/products/new" component={AddProduct}/>
        <Route path="/products/:id" exact component={ProductDetails}/>
        <Route path="/order/:id" exact component={OrderDetails}/>
        <Route path="/search/:keyword" exact  component={Home}/>
          <Route path="/search/:keyword/page/:pageNumber"  component={Home}/>
          <Route path="/page/:pageNumber"  component={Home}/>
          <Route path="/categories/:category"  component={Home}/>
        <Route  component={Home} path="/" exact />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
