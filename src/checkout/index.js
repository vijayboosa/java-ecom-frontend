import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import toast from "react-hot-toast";

export default function CheckOut(props) {
    const {cartItems, innerHtml} = props;

    const handleClick = () => {
        console.log('these are cart items');
        console.log(cartItems);
        let cartItemsList = [];
        Object.keys(cartItems).map((key) => {
            const availableQuantity = cartItems[key].product.quantity;
            const minQuantity = cartItems[key].product.min_quantity;
            const reqQuantity = cartItems[key].count;
            const newQuantity = availableQuantity - reqQuantity;
            let mailStatus = 0;
            if (newQuantity <= minQuantity) {
                mailStatus = 1;
            }
            console.log('Remaining qun', newQuantity);
            console.log("key", key);
            cartItemsList.push({
                ...cartItems[key].product,
                mail_status: mailStatus,
                new_quantity: newQuantity,
            });
        });
        console.log(cartItemsList);
        console.log(localStorage['email'])
        const d = {
            'product_details': cartItemsList, ...{
                html_data: innerHtml,
                to_email: localStorage['email']
            }
        };
        fetch('/order/', {
            method: 'post', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(d),
        }).then(response => response.json()).then((data) => {
            console.log('Response put');
            console.log(data);
            if (data.success === 1) {
                toast.success('Order Placed');
            } else {
                toast.error('Order Placing Failed');
            }
        }).catch((error) => {
            console.log(error)
        });
        ;

    };
    return (<>
        <Card className="m-4">
            <Card.Header>Checkout</Card.Header>

            <Card.Body>
                <Form>
                    <Row>
                        <Col>
                            <h1>Billing Address</h1>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter you name"/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Adress</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <h1>Payment</h1>
                            <div className="text-center">
                                <h3 className="text-center">Accepted Cards</h3>
                                <h5>
                                    VISA, MASTERCARD, AMERICAN EXPRESS, DISCOVER
                                </h5>

                            </div>
                            <Form.Group>
                                <Form.Label>Name on card</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Credit card number</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Expiry moth</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </Col>
                    </ Row>
                    <Row className="justify-content-between">
                        <Col>

                            <Form.Group>
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>zip</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </Col>
                        <Col>

                            <Form.Group>
                                <Form.Label>Expriy Year</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" size='lg' block onClick={() => handleClick()}>Complete Payement</Button>
                </Form>
            </Card.Body>
        </Card>
    </>);
}