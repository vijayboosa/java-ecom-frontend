import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import toast, {Toaster} from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password ) {
            toast.error("fill all the values")
            return
        }
        fetch("/login/", {
            method: "post",
            body: JSON.stringify({email, password})
        }).then(e => e.json()).then(e=>{
            console.log(e)
            if (e.success){
                toast.success("Login successful")
            }
            else {
                toast.error("wrong id or password")
            }
        }).catch(e=>{
            console.log(e)
            toast.error("Login failed")
        })
    }
    return (
        <Form className='mt-5 m-auto' style={{width: 600, marginTop: 50}}>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={email}
                              onChange={event => setEmail(event.target.value)}/>
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