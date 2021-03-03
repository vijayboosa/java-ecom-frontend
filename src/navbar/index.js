import {Nav, Navbar} from 'react-bootstrap';

export default function NavigationBar(props) {
    const {
        currentPage,
        handleChange,
        handleLogout,
        loginState,
        userType,
        noOfCartItems,
        cartOrHomepage,
        setAdminCurrentPage
    } = props;
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Shopper</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {loginState && (
                        <>
                            {userType && <>
                                <Nav.Link onClick={() => setAdminCurrentPage('home')}>Home</Nav.Link>
                                <Nav.Link onClick={() => setAdminCurrentPage('addProduct')}>Add New Item</Nav.Link>
                                <Nav.Link onClick={() => setAdminCurrentPage('orders')}>Orders</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>}
                            {!userType && <>
                                <Nav.Link onClick={() => cartOrHomepage('home')}>Home</Nav.Link>
                                <Nav.Link onClick={() => cartOrHomepage('cart')}>Cart {noOfCartItems()}</Nav.Link>
                                <Nav.Link onClick={() => cartOrHomepage('orders')}>Orders</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>}

                        </>
                    )}
                    {!loginState && (
                        <>
                            <Nav.Link onClick={handleChange}>{currentPage}</Nav.Link>
                        </>
                    )}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}