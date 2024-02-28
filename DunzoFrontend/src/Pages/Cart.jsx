import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Cart.css'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import emptycart from 'C:/Harsh bhosale/React/dunzo/src/Assets/Logo/EmptyCart.png'

export const Cart = () => {

    
    const [Cart, setCart] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userdata');
    


    useEffect(() => {
        axios.get(`http://localhost:8080/DunzoHB/getProductList/${userId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                //const cartItemId = response.data;
                console.log(response.data)
                if (response.status === 200) {
                    setCart(response.data);
                }
            })
            .catch((error) => {
                // toast.error('Caught error all123')
            })
    }, [userId]);

    const removeFromCart = (cartItemId) => {
        axios.delete(`http://localhost:8080/DunzoHB/removeFromCart/${userId}/${cartItemId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then(response => {
                setCart([])
                axios.get(`http://localhost:8080/DunzoHB/getProductList/${userId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                 })
                .then((response) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        setCart(response.data);
                    }
                })
                .catch((error) => {
                    toast.error('Caught error all',{autoClose:1000})
                })
            })
            .catch(error=>{
                toast.error("Can't Delete",{autoClose:1000})
            })
    }


    const handelquantity = (productID, quantity) => {
        axios.put(`http://localhost:8080/DunzoHB/updateCount/${userId}/${productID}/${quantity}`,null,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then(response => {
                setCart([])
                axios.get(`http://localhost:8080/DunzoHB/getProductList/${userId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                 })

                    .then((response) => {
                        console.log(response.data)
                        if (response.status === 200) {
                            setCart(response.data);
                        }
                    })
            })
            .catch((error) => {
                toast.error('Caught error all',{autoClose:1000})
            })
    }

    const add = (productID) => {
        const itemupdate = Cart.find(item => item.product.productID === productID);
        if (itemupdate  && itemupdate.quantity < 5) {
            const newquantity = itemupdate.quantity + 1;
            handelquantity(productID, newquantity);
        }
    }

    const sub = (productID) => {
        const itemupdate = Cart.find(item => item.product.productID === productID);
        if (itemupdate && itemupdate.quantity > 1) {
            const newquantity = itemupdate.quantity - 1;
            handelquantity(productID, newquantity);
        }
    };

     const calculateitemprice = (item) => {
        return item.product.productPrice * item.quantity;
    }

    const totalprice = () => {
        let total = 0;
        Cart.forEach((item) => {
            total += calculateitemprice(item);
        })
        return total;
    }
    const id = totalprice();
    const navigate = useNavigate()

    const price = () => {
        navigate("/checkout" ,{state: {id:id}})
    }

    return (
        <>
            <Header />
            <div className='main'>
                <div className='ca>'>
                    <div className='cart'>
                        <div className='scrol'>
                            <div className="col-4">
                                <div id="list-example" className="list-group" style={{ maxHeight: '400px', overflowY: 'auto', width: '700px' }}>
                                    <h4 className='c'>Your Cart</h4>

                                    
                                    
                                    {Cart.length === 0 ? ( <img src={emptycart} alt='' style={{ width: '25rem', height: '20rem',marginLeft:'10rem' }} ></img>) : (
                                                 <div>
                                                 {Array.isArray(Cart) && Cart.map((item) => (
                                                     <div key={item.product.productID}  >
                                                         <Card className='gcard123' >
                                                             <Card.Body className='gcard-body' style={{justifyContent:'space-between'}}>
                                                             <Card.Title><img className='shoplogo1' src={item.product.productImage} alt='' /></Card.Title>
                                                                 <ListGroup  >
                                                                    
                                                                     <ListGroup.Item className='bottom'><h6 className='green'>{item.product.productName}</h6></ListGroup.Item>
                                                                     <ListGroup.Item className='bottom'>{item.product.productQuantity}</ListGroup.Item>
                                                                   
                                                                 </ListGroup>
                                                         
                                                                 <div className='button'>
                                                                     <div className='button121'>
                                                                     <Button className='sub' onClick={() => sub(item.product.productID)} variant="light">-</Button>
                                                                     <span>{item.quantity}</span>
                                                                     <Button className='add1' onClick={() => add(item.product.productID)} variant="light">+</Button>
                                                                     </div>
                                                                     <div style={{marginLeft:'1rem'}}>
                                                                      ₹{calculateitemprice(item)}
                                                                      </div>
                                                                 </div>
                                                                 <Button  variant="danger" className='remove' onClick={()=>{removeFromCart(item.cartItemId)}}><AiTwotoneDelete /></Button>
                                                              
                                                             </Card.Body>
                                                         </Card>
                                                     </div>
                                                 ))}</div>
                                    )}
                                  

                                </div>
                            </div>
                        </div>
                        <div className='total'>
                           
                            <h3>Cart Price</h3>
                            <h5>Total Price:  ₹{totalprice()}</h5>

                            {Cart.length ===0 ? <Button href='/'>Continue Shopping</Button> : 
                             <Button  onClick={price} variant='success' style={{marginLeft:'7rem',width:'7rem'}}>PayNow</Button> }
                        </div>
                    </div>

                </div>
               
            </div>
       
        </>
        
    )
}

