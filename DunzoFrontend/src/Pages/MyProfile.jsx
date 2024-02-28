import React, { useEffect } from 'react'
import Header from '../Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Harsh bhosale/React/dunzo/src/Styles/profile.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { AiTwotoneDelete } from "react-icons/ai";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { MdEdit } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { TiCancelOutline } from "react-icons/ti";
export const MyProfile = () => {

    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
    const userPhone = localStorage.getItem('userPhone');
    const userId = localStorage.getItem('userId');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [add, setadd] = useState(false);
    const handleClose1 = () => setadd(false);
    const handleShow1 = () => setadd(true);

    const [editadd, editsetadd] = useState(false);
    const handleClose3 = () => editsetadd(false);
    const handleShow3 = () => editsetadd(true);

    const [support, setsupport] = useState(false);
    const handleClose2 = () => setsupport(false);
    const handleShow2 = () => setsupport(true);

    const [address, setaddress] = useState([]);

    const [order, setorders] = useState([]);

    const [activesec, setactivesec] = useState('Address');

    const [disablebutton, setdisablebutton] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setdisablebutton(false);
        },180000);
    })

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

    useEffect(() => {
        axios.get(`http://localhost:8080/DunzoHB/getOrders/${userId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    setorders(response.data);
                }
            })
            .catch((error) => {
                toast.error('Something went Wrong')
            })
    }, [userId]);

    const deleteOrder = (orderId) => {
        axios.delete(`http://localhost:8080/DunzoHB/delete/${userId}/${orderId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                toast.success('Order Cancelled', { autoClose: 1000 })
                axios.get(`http://localhost:8080/DunzoHB/getOrders/${userId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                 })
                    .then((response) => {
                        console.log(response.data)
                        if (response.status === 200) {
                            setorders(response.data);
                        }
                    })
                    .catch((error) => {
                        toast.error('Something went Wrong')
                    })

            })
            .catch((error) => {
                toast.error('Cant Cancel order', { autoClose: 1000 })
            })
    }

    const returnOrder = (orderId) => {
        axios.delete(`http://localhost:8080/DunzoHB/return/${userId}/${orderId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
              
                axios.get(`http://localhost:8080/DunzoHB/getOrders/${userId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                 })
                    .then((response) => {
                        console.log(response.data)
                        if (response.status === 200) {
                            setorders(response.data);
                        }
                    })
                    .catch((error) => {
                        toast.error('Something went Wrong')
                    })
                    toast.success('Order returned', { autoClose: 1000 })
            })
            .catch((error) => {
                toast.error('Cant returned order After 1 Days', { autoClose: 1000 })
            })
    }

    const [edituser, setedituser] = useState({ userEmail: '', userName: '', userPhone: '' });

    const handelInput = (e) => {
          setedituser({ ...edituser, [e.target.name]: e.target.value });
    }

    const edit = async () => {
        const { userName, userPhone, userEmail } = edituser;
        axios.put(`http://localhost:8080/Dunzo/updateUser/${userEmail}`, { userName, userPhone, userEmail },{
            headers:{
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
            }
         })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Successfully Updated', { autoClose: 1000 })
                    setShow(false);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const [addaddress, setaddaddress] = useState([{ addressType: '', addressLine1: '', addressLine2: '', city: '', state: '', pinCode: '' }])

    const handelAddressInput = (e) => {
        setaddaddress({ ...addaddress, [e.target.name]: e.target.value });
    }

    const addressadd = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/DunzoHB/addAddress/${userId}`;
        await axios.post(url, addaddress,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                console.log(response.data);
                toast.success("Successfully Added Address.", { autoClose: 1000 });
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
            })
            .catch(error => {
                console.log(error);
                toast.error(error.request, { autoClose: 1000 });
            })
    }

    const [editaddress, seteditaddress] = useState([{ addressType: '', addressLine1: '', addressLine2: '', city: '', state: '', pinCode: '' }]);

    const handelInputaddress = (e) => {
        seteditaddress({ ...editaddress, [e.target.name]: e.target.value });
    }

    const edit1 = async (addressID) => {

        const { addressType, addressLine1, addressLine2, city, state, pinCode } = editaddress;

        axios.patch(`http://localhost:8080/DunzoHB/updateAddress/${userId}/${addressID}`, { addressType, addressLine1, addressLine2, city, state, pinCode },null,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Successfully Updated', { autoClose: 1000 })
                    editsetadd(false);
                    setadd(false);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    const handelLogout = () => {
        localStorage.clear();
        toast.success('Successfully Logged Out', { autoClose: 1000 })
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    const removeAddress = (addressID) => {
        axios.delete(`http://localhost:8080/DunzoHB/deleteAddress/${userId}/${addressID}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then(response => {
                setaddress([])
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
            })
            .catch(error => {
                toast.error("Can't Delete", { autoClose: 1000 })
            })
    }

    return (
        <>
            <Header />
            <div style={{ backgroundColor: 'aliceblue' }}>

                <div className='main'>
                    <div className='h'>
                        <div className='titl'>
                            <h3>Hey there! {userName}</h3>
                            <h6>+91 {userPhone}</h6>
                        </div>
                        <div className='but'>
                            <Button onClick={handleShow1} style={{ borderRadius: '50px', marginRight: '10px' }}>+Address</Button>
                            <Button variant='success' onClick={handleShow} style={{ borderRadius: '50px', marginRight: '10px' }}>Edit Profile</Button>
                            <Button className='LogOut' onClick={handelLogout} variant="danger" style={{ borderRadius: '50px' }}>LogOut</Button>
                        </div>
                    </div>
                    <div className='bod'>
                        <div className='scrol'>
                            <div className="col-4">
                                <div id="list-example" className="list-group" style={{ maxHeight: '300px', overflowY: 'auto', width: '192px' }}>
                                    <div className='li'>
                                        <h5 className={`list ${activesec === 'Address' ? 'active' : ''}`} onClick={() => setactivesec('Address')}>Address</h5>
                                        <h5 className={`list ${activesec === 'Orders' ? 'active' : ''}`} onClick={() => setactivesec('Orders')}>Orders</h5>
                                        <h5 className={`list ${activesec === 'Support' ? 'active' : ''}`} onClick={handleShow2}>Support</h5>
                                        <h5 className='list'>Account Setting</h5>
                                        <h5 className='list'>Manage Payments</h5>
                                        <h5 className='list'>Dunzo Cash</h5><h5 className='list'>About</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='con' style={{ display: 'flex' }}>
                            <div data-bs-spy="scroll" data-bs-target="#list-example" style={{ maxHeight: '250px', overflowY: 'auto' }} data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                                {activesec === 'Address' && Array.isArray(address) && address.map((address) => (
                                    <div key={address.addressID}>
                                        <Card className='gcardadd' >
                                            <Card.Title className='addressType'>{address.addressType}
                                                <div className='addressBtn'>
                                                    <Button variant='warning' onClick={handleShow3}><MdEdit /></Button>
                                                    <Button variant='danger' onClick={() => {removeAddress(address.addressID)}}><AiTwotoneDelete /></Button>
                                                </div>
                                            </Card.Title>
                                            <Card.Body className='gcard-body'>
                                                {address.addressLine1}-{address.addressLine2},{address.city}<br></br>
                                                {address.state} - {address.pinCode}
                                            </Card.Body>

                                        </Card>

                                        <div className='editaddress'>
                                            <Modal show={editadd} onHide={handleClose3}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit Address</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                                        <label for="AddressLine1"> AddressLine1</label>
                                                        <input type="text" class="form-control" name="addressLine1" placeholder="Enter addressLine1" value={editaddress.addressLine1} onChange={handelInputaddress} />
                                                    </div>
                                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                                        <label for="AddressLine2"> AddressLine2</label>
                                                        <input type="text" class="form-control" name="addressLine2" placeholder="Enter addressLine2" value={editaddress.addressLine2} onChange={handelInputaddress} />
                                                    </div>
                                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                                        <label for="AddressType"> AddressType</label>
                                                        <input type="text" class="form-control" name="addressType" placeholder="Enter AddressType (WORK Or HOME)" value={editaddress.addressType} onChange={handelInputaddress} />
                                                    </div>
                                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                                        <label for="city"> city</label>
                                                        <input type="text" class="form-control" name="city" placeholder="Enter city" value={editaddress.city} onChange={handelInputaddress} />
                                                    </div>
                                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                                        <label for="state">State</label>
                                                        <input type="text" class="form-control" name="state" placeholder="Enter state" value={editaddress.state} onChange={handelInputaddress} />
                                                    </div>
                                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                                        <label for="pinCode"> pinCode</label>
                                                        <input type="text" class="form-control" name="pinCode" placeholder="Enter pinCode" value={editaddress.pinCode} onChange={handelInputaddress} />
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose3}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => { edit1(address.addressID) }}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                ))}

                                {activesec === 'Orders' && Array.isArray(order) && order.map((order) => (
                                    <div key={order.orderId}>
                                        <Card className='gcardaddorder'>
                                            <div className='ordertitle' style={{ display: 'flex' ,marginTop:'1rem',marginLeft:'-5rem'}}>
                                                <div style={{marginLeft:'8rem'}}>
                                                    <Card.Title className='addressType' >Total Amount: ₹{order.totalAmount}</Card.Title>
                                                    <Card.Title><h6>Order [Date & Time] : {order.orderDatetime}</h6> </Card.Title>
                                                   
                                                </div>
                                                <div style={{marginLeft:'1rem',display:'flex',flexDirection:'column'}}>
                                                    <Button variant='primary' style={{marginBottom:'1rem',fontSize:'1.5rem'}} onClick={() => {returnOrder(order.orderId)}}><TbTruckReturn /></Button>
                                                {disablebutton ? (<Button variant='danger' style={{fontSize:'1rem'}}  onClick={() => {deleteOrder(order.orderId) }}><TiCancelOutline /></Button>): (<div></div>)}    
                                                    
                                                
                                                </div>
                                               
                                               
                                            </div>
                                            <Card.Body className='gcard-body'>
                                                <ul>
                                                    {order.orderitem.map((list) => (
                                                        <div key={list.orderItemId} >
                                                            <div className='orderimg'>
                                                                <img src={list.product.productImage} alt='' style={{ height: '80px' }}></img>
                                                                <div className='orderproduct' >
                                                                    <h6> {list.product.productName} </h6>
                                                                    <p>Quantity:  {list.quantity} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </ul>
                                            </Card.Body>
                                            <Card.Title>Shipping Address</Card.Title>
                                            <Card.Body className='gcard-body'>
                                                {order.shipAddress.addressLine1}-{order.shipAddress.addressLine2},{order.shipAddress.city}<br></br>
                                                {order.shipAddress.state} - {order.shipAddress.pinCode}
                                            </Card.Body>

                                        </Card>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className='editmodal'>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="Name"> Name</label>
                                <input type="text" class="form-control" name="userName" placeholder="Enter UserName" value={edituser.userName} onChange={handelInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="phone">Phone</label>
                                <input type="phone" class="form-control" name="userPhone" placeholder="Enter User Phone Number" value={edituser.userPhone} onChange={handelInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="userEmail" placeholder="Enter Email" value={edituser.userEmail} onChange={handelInput} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={edit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='addaddress'>
                    <Modal show={add} onHide={handleClose1}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="AddressLine1"> AddressLine1</label>
                                <input type="text" class="form-control" name="addressLine1" placeholder="Enter addressLine1" value={addaddress.addressLine1} onChange={handelAddressInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="AddressLine2"> AddressLine2</label>
                                <input type="text" class="form-control" name="addressLine2" placeholder="Enter addressLine2" value={addaddress.addressLine2} onChange={handelAddressInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="AddressType"> AddressType</label>
                                <input type="text" class="form-control" name="addressType" placeholder="Enter AddressType (WORK Or HOME)" value={addaddress.addressType} onChange={handelAddressInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="city"> city</label>
                                <input type="text" class="form-control" name="city" placeholder="Enter city" value={addaddress.city} onChange={handelAddressInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="state">State</label>
                                <input type="text" class="form-control" name="state" placeholder="Enter state" value={addaddress.state} onChange={handelAddressInput} />
                            </div>
                            <div class="form-group" style={{ marginBottom: "1rem" }}>
                                <label for="pinCode"> pinCode</label>
                                <input type="text" class="form-control" name="pinCode" placeholder="Enter pinCode" value={addaddress.pinCode} onChange={handelAddressInput} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={addressadd}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>

                <Offcanvas show={support} onHide={handleClose2} placement='end' style={{ width: '420px' }} >

                    <Offcanvas.Header closeButton style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                        <Offcanvas.Title>Dunzo Support</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Header style={{ backgroundColor: 'rgb(242, 245, 255)', marginBottom: '1.5rem' }}>
                        <Offcanvas.Title >Issues not related to an order</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Accordion style={{ border: 'none' }}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>I have a payment or refund related query</Accordion.Header>
                                <Accordion.Body>
                                    <h3>Contact: +91 9075978234</h3>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>I have a promotion code or Dunzo cash related query</Accordion.Header>
                                <Accordion.Body>
                                    <h3>Contact: +91 9075978234</h3>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Any other query?</Accordion.Header>
                                <Accordion.Body>
                                    <h3>Contact: +91 9075978234</h3>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Offcanvas.Body>

                </Offcanvas>

                <ToastContainer />
            </div>
        </>
    )
}
