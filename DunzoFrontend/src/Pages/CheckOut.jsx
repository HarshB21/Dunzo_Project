import React from 'react'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTypography, } from "mdb-react-ui-kit";
import Header from '../Components/Header';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Radio from '@mui/material/Radio';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export const CheckOut = () => {

    const location = useLocation();
    
    const userId = localStorage.getItem('userId');
    const [address, setaddress] = useState([]);
    const [selectAddressId,setAddressId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('userdata');

    useEffect(() => {
        axios.get(`http://localhost:8080/DunzoHB/getAddress/${userId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    setaddress(response.data);
                }
            })
            .catch((error) => {
                toast.error('Caught error all')
            })
    }, [userId]);

    const handelAddressSelection = (addressID) => {
        console.log('select address id')
        setAddressId(addressID);
    }

    const orderclear = () => {
        postOrder();
        setTimeout(()=>{
            clearCart(userId)
        },1000)
    }

    const clearCart = (userId) => {
        axios.delete(`http://localhost:8080/DunzoHB/afterPayment/${userId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('cart cleared')
                }
            })
            .catch((error) => {
                toast.error('Can not clear Cart');
            })
    }

    const postOrder = () => {
        console.log('post clicked')
        if(selectAddressId){
        axios.post(`http://localhost:8080/DunzoHB/Createorder/${userId}/${selectAddressId}`,null,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment Successfull..",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    setTimeout(()=>{
                        navigate('/')
                    },2000)
                }
            })
            .catch((error) => {
                toast.error('Order Not Placed')
            })}else{
                toast.error('Cart is Empty')
            }
    }

    return (
        <div>
            <Header />
            <div>
                <section className="h-50 h-custom" style={{ backgroundColor: "#eee" }}>
                    <MDBContainer className="py-5 h-50">
                        <MDBRow className="justify-content-center align-items-center h-50" style={{ marginTop: '5rem' }}>
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardBody className="p-4">
                                        <MDBRow>
                                            <MDBCol lg="5">
                                                <MDBCard className="bg-primary text-white rounded-3" style={{ width: '20rem' }}>
                                                    <MDBCardBody>
                                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                                            <MDBTypography tag="h5" className="mb-0">
                                                                Card details
                                                            </MDBTypography>

                                                        </div>



                                                        <form className="mt-4">
                                                            <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                                                                placeholder="Cardholder's Name" />

                                                            <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                                                                minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" />

                                                            <MDBRow className="mb-4">
                                                                <MDBCol md="6">
                                                                    <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                                                                        minLength="7" maxLength="7" placeholder="MM/YYYY" />
                                                                </MDBCol>
                                                                <MDBCol md="6">
                                                                    <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                                                        maxLength="3" placeholder="&#9679;&#9679;&#9679;" />
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </form>

                                                        <hr />

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Subtotal</p>
                                                            <p className="mb-2">₹{location.state.id}</p>
                                                        </div>

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2" style={{textDecoration:'line-through'}}>Shipping</p>
                                                            <p className="mb-2"  style={{textDecoration:'line-through'}}>₹20.00</p>
                                                        </div>

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Total(Incl. taxes)</p>
                                                            <p className="mb-2">₹{location.state.id}</p>
                                                            
                                                        </div>

                                                        <Button variant='success' block size="lg" onClick={orderclear }>
                                                            <div className="d-flex justify-content-between">
                                                                <span>Pay</span>
                                                            </div>
                                                        </Button>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                            <MDBCol lg="5" >
                                                <MDBCard className=" rounded-3" style={{ width: '50rem',height:'36rem', backgroundColor: '#eaeff4', color: 'black', marginLeft: '-10rem' }}>
                                                    <Button variant='danger' href='/profile' style={{ borderRadius: '50px', marginRight: '10px', marginTop: '1rem', width: '9rem', marginLeft: '5px' }}>+New Address</Button>
                                                   
                                                    <div className='con' style={{ display: 'flex', marginTop: '3rem' }}>
                                                   
                                                        <div data-bs-spy="scroll" data-bs-target="#list-example" style={{ maxHeight: '300px', overflowY: 'auto',padding:'2rem',border:'1px solid',borderBottomLeftRadius:'10px',borderTopLeftRadius:'10px' }} data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                                                            {Array.isArray(address) && address.map((address) => (
                                                                <div key={address.addressID} >
                                                                   
                                                                    <Card className='gcardadd' style={{flexDirection:'row' , gap:'80px'}}>
                                                                    <Radio  value={address.addressID} checked={selectAddressId === address.addressID} onChange={()=>handelAddressSelection(address.addressID)} />
                                                                    <div className='addressCard' >
                                                                        <Card.Title className='addressType' >{address.addressType}
                                                                        </Card.Title>
                                                                        <Card.Body className='gcard-body' style={{padding:'0px'}}>
                                                                            {address.addressLine1}-{address.addressLine2},{address.city}<br></br>
                                                                            {address.state} - {address.pinCode}
                                                                        </Card.Body>
                                                                        </div>
                                                                    </Card>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>

                                                </MDBCard>
                                            </MDBCol>

                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
                <ToastContainer />
            </div>
        </div>
    )
}
