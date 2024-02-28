import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { BsCart2 } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from 'C:/Harsh bhosale/React/dunzo/src/Assets/Logo/DunzoLogo.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Header.css'
import 'react-toastify/dist/ReactToastify.css';
import { FaRegUser } from "react-icons/fa";


const Header = () => {


    const userName = localStorage.getItem('userName');

    const [search, setsearch] = useState('');
    const [result, setresult] = useState([]);
   


    useEffect(() => {
        const handelsearch = async () => {
            console.log('sea')
            try {
                const response = await axios.get(`http://localhost:8080/Dunzo/findByName/${search}`)
                setresult(response.data)
                console.log(result)
            } catch (error) {
                console.error(error)
                setresult([{ error: error.response.data }])
            }
        };
        if (search) {
            handelsearch();
        } else {
            setresult([]);
        }
    }, [search])


    const [selectlocation, setlocation] = useState('Set location')
    const handellocation = (location) => {
        setlocation(location);
    };



    return (
        <>

            <div className='header'>
                <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: '50px', padding: '30px', alignItems: 'center' }}>

                    <Container style={{ fontSize: 'larger' }}>
                        <Navbar.Brand href="/"><img src={logo} alt='' style={{ width: '122px', height: '28px' }} ></img></Navbar.Brand>


                        <NavDropdown title={selectlocation} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => handellocation('Bangalore')} href="">Bangalore</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handellocation('Delhi')} href="">Delhi</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handellocation('Mumbai')} href="">Mumbai</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handellocation('Pune')} href="">Pune</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handellocation('Hyderabad')} href="">Hyderabad</NavDropdown.Item>
                        </NavDropdown>
                        <Nav className="me-auto" style={{ display: 'contents', marginLeft: "200px" }}>
                            <Nav.Link href="">Dunzo for Partners</Nav.Link>
                            <NavDropdown title="Business with Dunzo" id="basic-nav-dropdown">
                                <NavDropdown.Item href=""> Need Delivery Partner </NavDropdown.Item>
                                <NavDropdown.Item href=""> Sell Product on Dunzo </NavDropdown.Item>
                            </NavDropdown>
                            <Form className="d-flex">
                                <div>
                                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
                                    {search && (
                                        <div className='custom-dropdown1' >
                                            {result.map((product) => (
                                                'error' in product ? (
                                                    <h4>{product.error}</h4>
                                                ) : (
                                                    <Link to={`/products/${product.productID}`} style={{ textDecoration: 'none' }}>
                                                        <ListGroup>
                                                            <ListGroup.Item action href="" key={product.productID} style={{ height: '200px' }} >
                                                                <img src={product.productImage} alt='' style={{ height: '80px' }}></img>
                                                                <div style={{ textAlign: 'start' }}>
                                                                    <p>{product.productName}</p>
                                                                    <p>₹{product.productPrice}</p>
                                                                </div>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </Form>
                            <h3>
                                <Link to={`/cart`}>

                                    <BsCart2 color="action" />
                                   
                                </Link></h3>

                            {userName ? (
                                <div style={{ display: 'contents' }}>
                                    <span>Hi, {userName}!</span>
                                    <Link to={`/profile`}><FaRegUser style={{ fontSize: 'x-large' }} /></Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to={`/Register`}>
                                        <Button className='Register' variant="danger" style={{ borderRadius: '50px', marginRight: '45px' }}>Register</Button>
                                    </Link>
                                    <Link to={`/LogIn`}>
                                        <Button className='SignIn' variant="success" style={{ borderRadius: '50px', marginLeft: '-35px' }}>SignIn</Button>
                                    </Link>
                                </div>
                            )
                            }


                        </Nav>

                    </Container>

                </Navbar>
            </div>
        </>
    )
}

export default Header;