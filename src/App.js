import NavigationBar from "./navbar";
import Login from "./login";

import Products from "./products";
import {useState} from "react";
import Register from "./register";
import Cart from "./cart";
import AdminPage from "./admin";
import Orders from "./orders";


function App() {
    const [loginState, setLoginState] = useState(false);
    const [adminState, setAdminState] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');
    const [cartProducts, setCartProduct] = useState({});
    const [userPageToShow, setHomeOrCartPage] = useState('home');
    const [adminCurrentPage, setAdminCurrentPage] = useState('home');
    let pageToShow;


    const handleLogin = (user) => {
        if (user) {
            setAdminState(true);
        }
        setLoginState(true);
    }

    const totalCartItemsValue = () => {
        let price = 0;
        Object.keys(cartProducts).map(key => {
            const cartItem = cartProducts[key];
            console.log('hee');
            console.log(cartItem);
            console.log(Number(cartItem.product.price) * cartItem.count);
            price = price +  (Number(cartItem.product.price) * cartItem.count)
        });
        return price;
    }
    const addProductToCart = (product, type = 'add') => {

        if (cartProducts[product.id]) {
            let value;
            if (type === 'add') {
                value = cartProducts[product.id].count + 1;

            } else {
                value = cartProducts[product.id].count - 1;
            }
            console.log('value value is : ', value, product.quantity);
            if (value > Number(product.quantity)) {
                return
            } else if (value === 0) {
                removeItemFromCart(product);
                return
            }
            console.log(cartProducts);
            setCartProduct(Object.assign({}, cartProducts, {
                [product.id]: {
                    product: product,
                    count: value
                }
            }));
        } else {
            setCartProduct(Object.assign({}, cartProducts, {[product.id]: {product: product, count: 1}}));
        }

    }
    const changeToCartPage = (page) => {
        setHomeOrCartPage(page);
    }

    const noOfCartItems = () => {
        return Object.keys(cartProducts).length;
    }

    const logout = () => {
        setAdminState(false);
        setLoginState(false);
        setCartProduct({});
        setHomeOrCartPage('home');
        setAdminCurrentPage('home');
    }

    const loginAndRegister = () => {
        (currentPage === "login") ? setCurrentPage('register') : setCurrentPage('login');
    }

    const removeItemFromCart = (product) => {
        const cartItems = cartProducts;
        if (cartItems) {
            const obj = Object.keys(cartItems).reduce((obj, key) => {

                const ke = Number(key);
                if (ke !== (product.id)) {
                    obj[ke] = cartItems[ke];
                }

                return obj;
            }, {});
            setCartProduct(obj);
        }
    }
    if (loginState) {
        if (adminState) {
            pageToShow = <AdminPage currentPage = {adminCurrentPage} setCurrentPage={setAdminCurrentPage}/>
        } else {
            if (userPageToShow == 'cart') {
                pageToShow = <Cart cartItems={cartProducts} quantityButton={addProductToCart} getTotalCartValue={totalCartItemsValue}/>
            } else if (userPageToShow  == "orders") {
                pageToShow = <Orders/>
            }
            else {
                pageToShow = <Products addProductToCart={addProductToCart}/>
            }
        }
    } else {
        pageToShow = (currentPage === "register") ? <Login handleLogin={handleLogin}/> : <Register/>;
    }


    return (<>
        <NavigationBar handleLogout={logout} handleChange={loginAndRegister}
                       currentPage={currentPage} loginState={loginState} userType={adminState}
                       noOfCartItems={noOfCartItems} cartOrHomepage={changeToCartPage} setAdminCurrentPage={setAdminCurrentPage}/>

        {pageToShow}
    </>);
}

export default App;

