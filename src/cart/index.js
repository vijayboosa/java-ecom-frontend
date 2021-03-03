import {Button, Container, FormControl, InputGroup, Row, Table,} from "react-bootstrap";
import {useState} from "react";
import CheckOut from "../checkout";


function CartTalbe({props,setCheckOutPageBtn}) {
    const {cartItems, quantityButton,getTotalCartValue} = props
    return (<>
        {(Object.keys(cartItems).length === 0) && <h1 className="text-center mt-4">Your cart looks empty!</h1>}
        <Table id="tableId">
            <thead>
            <tr>
                <th>Product Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            </thead>
            <tbody>

            {cartItems && Object.keys(cartItems).map(keys => {
                const val = cartItems[keys];
                return (<>

                    <tr key={keys}>
                        <td>
                            <img src={val.product.image} width={150}/>
                        </td>
                        <td>
                            {val.product.name}
                        </td>
                        <td>
                            {val.product.description}
                        </td>
                        <td>
                            {val.product.price}
                        </td>
                        <td>
                            <InputGroup className="mx-0 px-0" style={{width: "200px"}}>
                                <InputGroup.Prepend>
                                    <Button variant="outline-danger" onClick={() => {
                                        quantityButton(val.product, "minus")
                                    }} style={{color: 'white', backgroundColor: 'red', fontSize: "22px"}}>-</Button>
                                </InputGroup.Prepend>
                                <div className="p-3 border ">
                                    {val.count}
                                </div>
                                <InputGroup.Append>
                                    <Button variant="outline-success" onClick={() => {
                                        quantityButton(val.product)
                                    }} style={{color: 'white', backgroundColor: 'green', fontSize: "22px"}}>+</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </td>
                    </tr>
                </>);

            })}

            </tbody>
        </Table>
        <hr className="mx-5"/>
        {(Object.keys(cartItems).length !== 0) && <>

            <Container fluid>
                <h2 className="float-left">Total: {getTotalCartValue()}</h2>
                <Button onClick={() => setCheckOutPageBtn()} className="float-right">
                    CheckOut
                </Button>
            </Container>
        </>}
    </> )
}

export default function Cart(props) {
    const [checkOutPage,setCheckOutPage]= useState(false);
    let innerHtml;
    const setCheckOutPageBtn = () => {
        innerHtml = document.getElementById('tableId').innerHTML;
        setCheckOutPage(true);
    };
    const showPage =checkOutPage ? <CheckOut cartItems={props.cartItems} innerHtml ={innerHtml}/> : <CartTalbe props={props} setCheckOutPageBtn={setCheckOutPageBtn}/>;

    // console.log(cartItems);
    return (<>
        {showPage};
    </>);
}