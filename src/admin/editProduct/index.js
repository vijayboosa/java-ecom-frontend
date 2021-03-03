import {useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Button, Form} from "react-bootstrap";

export default function EditProduct(props) {
    const {editProductDetails} = props;
    const [image, setImage] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [min_quantity, setMinQuantity] = useState("");

    useEffect(() => {
        console.log(editProductDetails);
        if (editProductDetails.value) {
            setImage(editProductDetails.value.image);
            setName(editProductDetails.value.name);
            setDescription(editProductDetails.value.description);
            setCategory(editProductDetails.value.category);
            setPrice(editProductDetails.value.price);
            setQuantity(editProductDetails.value.quantity);
            setMinQuantity(editProductDetails.value.min_quantity);
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !category || !price || !image || !quantity || !min_quantity) {
            toast.error("fill all the values")
            return
        }
        console.log('Edit Product value')
        const update = {
            id: Number(editProductDetails.value.id),
            image: image,
            name: name,
            description: description,
            category: category,
            price: Number(price),
            min_quantity: Number(min_quantity),
            quantity: Number(quantity)
        };
        console.log(update);
        fetch('/update/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        }).then(response => response.json()).then((data) => {
            console.log('Response put');
            if (data.success === 1) {
                toast.success('Successfully Edited');
            }else {
                toast.error('Failed Edit');
            }
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <Form className='mt-5 m-auto' style={{width: 600, marginTop: 50}}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Product Name" value={name}
                              onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description" value={description}
                              onChange={event => setDescription(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" value={category}
                              onChange={event => setCategory(event.target.value.toLowerCase())}/>
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price" value={price}
                              onChange={event => setPrice(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicQty">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Quantity" value={quantity}
                              onChange={event => setQuantity(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicMinQty">
                <Form.Label>Min Quantity</Form.Label>
                <Form.Control type="number" placeholder="Min Quantity" value={min_quantity}
                              onChange={event => setMinQuantity(event.target.value)}/>
            </Form.Group>
            {/*<Form.Group controlId="fromBasicProduct">*/}
            {/*    {image && <img src={image} width={200} alt={'selected'}/>}*/}
            {/*    <Form.File id="custom-file" label="Image" accept="image/*" onChange={handleChange} custom/>*/}
            {/*</Form.Group>*/}
            <Toaster/>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Edit
            </Button>
        </Form>
    )
}