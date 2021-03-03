import {useEffect, useState} from "react";
import {Button, InputGroup, Table} from "react-bootstrap";

function OrderShowTalbe(props) {
    const {allOrders} = props;
    return (<>
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

            {allOrders.map((obj) => {
                console.log(obj)
                return (<tr key={obj.id}> // key should be unique
                    <td>
                        <img src={obj.image} width={150}/>
                    </td>
                    <td>
                        {obj.name}
                    </td>
                    <td>
                        {obj.description}
                    </td>
                    <td>
                        {obj.price}
                    </td>
                    {/*<td>*/}
                    {/*    /!*<Button onClick={() => addProductToCart(value)}>Add to Cart</Button>*!/*/}
                    {/*</td>*/}
                </tr>);
            })};


            </tbody>
        </Table>
    </>);
}


export default function Orders(props) {
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('/getorders/',).then(data => data.json()).then((data) => {

            const orderProducts = [];
            data.map(d => {
                const jsonToString = JSON.parse(d.details)
                jsonToString.product_details.map(d => {
                    orderProducts.push(d);
                });
            });
            setAllOrders([]);
            setAllOrders(orderProducts);
        }).catch((error) => {
            console.log("Got an erro : ", error)
        });
    };

    return ((allOrders.length > 0) ? <OrderShowTalbe allOrders={allOrders}/> : <> <h1>No Orders to show</h1> </>);
}