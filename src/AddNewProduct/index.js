import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function AddNewProduct(){
    const [image, setImage] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [min_quantity, setMinQuantity] = useState("");

    const handleChange = (e)=>{
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            setImage(event.target.result);
        });
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!name || !description || !category || !price || !image || !quantity || !min_quantity){
            toast.error("fill all the values")
            return
        }
        fetch("/add/", {
            method: "post",
            body: JSON.stringify({name, description, image, category,
                                        price: parseFloat(price), quantity,
                                        min_quantity})
        }).then(e => e.json()).then(e=>{
            if (e.success){
                toast.success("product added successfully")
            }
            else {
                toast.error("product failed to add")
            }
        }).catch(e=>{
            toast.error("product failed to add")
        })
    }
    return (
        <Form className='mt-5 m-auto' style={{width: 600, marginTop: 50}}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Product Name" value={name}
                              onChange={e=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control  as="textarea" rows={3} placeholder="Description" value={description}
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

            <Form.Group controlId="fromBasicProduct">
                {image && <img src={image} width={200} alt={'selected'}/>}
                <Form.File id="custom-file" label="Image" accept="image/*" onChange={handleChange} custom/>
            </Form.Group>
            <Toaster />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    )
}