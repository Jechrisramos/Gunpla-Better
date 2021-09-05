import React, { Fragment, useState } from "react";
import './App.css';
import './Responsive.css';

//routing
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

//bootstrap
import { Container } from "react-bootstrap";

import UserContext from "./UserContext";

// components
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoFound from "./pages/NoFound";
import Shop from "./pages/shop/Shop";
import CategoryPage from "./pages/shop/CategoryPage";
import Product from "./pages/shop/Product";
import Cart from "./pages/cart/Cart";

import Avatar from "./pages/Avatar";
import User from "./pages/users/User";
import Categories from "./pages/categories/Categories"
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import SpecificOrder from "./pages/orders/SpecificOrder";

import Profile from "./pages/users/Profile";
import UserSpecificOrder from "./pages/users/UserSpecificOrder";

function App() {
  
  /*useStates*/
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    firstName: localStorage.getItem('firstName'),
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  });

  /*useEffects*/

  /*functions*/
  const unsetUser = () => {
    localStorage.clear();
    setUser({
      email:null,
      accessToken:null,
      isAdmin:null
    });
  }
  
  return (

    <Fragment>
      <UserContext.Provider value={{ user, setUser, unsetUser }}>
      <Router>
        < Header />
        <Container fluid>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={(user.email !== null ) ? Home : Register} />
            <Route exact path="/profile" component={(user.email !== null) ? Profile : Login} />
            <Route exact path="/profile/order/:orderId" component={(user.email !== null) ? UserSpecificOrder : Login} />
            <Route exact path="/" component={Home}/>
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/shop/category/:categoryId" component={CategoryPage} />
            <Route exact path="/shop/product/:productId" component={Product} />
            <Route exact path="/cart" component={(user.email !== null) ? Cart : Login}/>

            <Route exact path="/avatar" component={ ((user.accessToken !== null) && (user.isAdmin === true)) ? Avatar : Home }/>
            <Route exact path="/users" component= { ((user.accessToken !== null) && (user.isAdmin === true)) ? User : Home }/>
            <Route exact path="/categories" component= { ((user.accessToken !== null) && (user.isAdmin === true)) ? Categories : Home }/>
            <Route exact path="/products" component= { ((user.accessToken !== null) && (user.isAdmin === true)) ? Products : Home }/>
            <Route exact path="/orders" component= { ((user.accessToken !== null) && (user.isAdmin === true)) ? Orders : Home }/>
            <Route exact path="/orders/order/:orderId" component= { ((user.accessToken !== null) && (user.isAdmin === true)) ? SpecificOrder : Home }/>
            <Route component={NoFound} />
          </Switch>
        </Container>
        < Footer />
      </Router>
      </UserContext.Provider>
    </Fragment>

  ); //end of return

} //end of App()

export default App;
