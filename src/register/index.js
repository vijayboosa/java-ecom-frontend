import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import toast, {Toaster} from 'react-hot-toast';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !password ) {
            toast.error("fill all the values")
            return
        }
        fetch("/register/", {
            method: "post",
            body: JSON.stringify({name, email, phone, password})
        }).then(e => e.json()).then(e=>{
            console.log(e)
            if (e.success){
                toast.success("product added successfully")
            }
            else {
                toast.error("product failed to add")
            }
        }).catch(e=>{
            console.log(e)
            toast.error("product failed to add")
        })
    }
    return (
        <Form className='mt-5 m-auto' style={{width: 600, marginTop: 50}}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Product Name" value={name}
                              onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={email}
                              onChange={event => setEmail(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Phone" value={phone}
                              onChange={event => setPhone(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                              onChange={event => setPassword(event.target.value)}/>
            </Form.Group>

            <Toaster/>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    )
}