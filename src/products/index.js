import {useEffect, useState} from "react";
import {Button, Card, Table} from "react-bootstrap";

export default function Products(props) {
    const {addProductToCart} = props;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('/products/',).then(data => data.json()).then((data) => {
            console.log(data);
            setProduct(data);
        });
    }, []);

    return <>
        <Table>
            <tbody>
            {product && product.map(value => {
                return (
                    <tr key={value.id}>
                        <td>
                            <img src={value.image} width={150}/>
                        </td>
                        <td>
                            {value.name}
                        </td>
                        <td>
                            {value.description}
                        </td>
                        <td>
                            {value.price}
                        </td>
                        <td>
                            <Button onClick={() => addProductToCart(value)}>Add to Cart</Button>
                        </td>
                    </tr>

                )
            })}
            </tbody>
        </Table>

    </>
}