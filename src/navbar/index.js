import { Nav, Navbar} from 'react-bootstrap';

export default function NavigationBar(){
    return (
        <Navbar bg="dark"  variant="dark" expand="lg">
            <Navbar.Brand href="#home">Shopper</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Add New Item</Nav.Link>
                    <Nav.Link href="#link">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}