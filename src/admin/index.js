import AdminViewProducts from "./viewproducts";
import AddNewProduct from "../AddNewProduct";
import EditProduct from "./editProduct";
import {useState} from "react";
import Orders from "./orders";

export default function AdminPage(props) {
    const {currentPage, setCurrentPage} = props;
    const [editProduct, setEditProduct] = useState(null);
    console.log(currentPage);
    if (currentPage === 'home') {
        return (<AdminViewProducts setCurrentPage={setCurrentPage} setEditProduct={setEditProduct}/>);
    } else if (currentPage === 'addProduct') {
        return (<AddNewProduct/>);
    } else if (currentPage === "editProduct") {
        return (<EditProduct editProductDetails={editProduct}/>)
    }else if (currentPage === 'orders') {
        return (<Orders/>);
    }

}