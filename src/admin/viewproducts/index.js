import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";

export default function AdminViewProducts(props) {
    const {setCurrentPage, setEditProduct} = props;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        console.log('Data fetched');
        fetch('/products/',).then(data => data.json()).then((data) => {
            setProduct(data);
        });
    }

    const deleteProduct = (id) => {
        console.log("Delete button clicked", id);
        fetch('/delete/' + id, {
            method: "delete"
        }).then(response => response).then((data) => {
            fetchData();
        }).catch((error) => {
            console.log('Error while deleting product: ', error);
        });
    };
    const editProduct = (value) => {

        const l = {value: value, fetchData: fetchData};
        setEditProduct(l);
        setCurrentPage('editProduct');
    }

    return (<>
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
                            <Button onClick={() => editProduct(value)}>Edit</Button>{' '}
                            <Button onClick={() => deleteProduct(value.id)}>Delete</Button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>

    </>);
}