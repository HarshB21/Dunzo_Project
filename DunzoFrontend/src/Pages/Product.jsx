import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Product.css'
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';


const Product = () => {

    const [product, setproduct] = useState({});
    const { productID } = useParams();
    const userId = localStorage.getItem('userId');
    const [added, setadded] = useState(false);
    const token = localStorage.getItem('userdata');

    useEffect(() => {
        axios.get(`http://localhost:8080/Dunzo/getProductById/${productID}`)

            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    setproduct(response.data);
                }
            })
            .catch((error) => {
                alert('Caught error all11')
            })
    }, [productID])


    const handeladdTocart = async () => {
        await axios.post(`http://localhost:8080/DunzoHB/addProduct/${userId}/${productID}`,null, {
            headers: {
                "Content-Type": "application/json",
                "Access-Contol-Allow-Headers": "Content-Type",
                "Access-Contol-Allow-Origin": "*",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Product Added", { autoClose: 1000 })
                    setadded(true);
                }
            })
            .catch((error) => {
                console.log(error)
                //toast.error(error.response.data.message, { autoClose: 1000 });
                toast.error("Can't Add please LogIn", { autoClose: 1000 })
            })
    }



    return (
        <div>
            <Header />
            <div className='main'>
                <div className='head'>
                    <div className='horizontal'>
                        <div className='product'>
                            <div className='proimg'>

                                <img className='productimagemain' src={product.productImage} alt='' />
                            </div>
                            <div className='proinfo'>
                                <h1 className='protitle'>{product.productName}</h1>
                                {!added ? (
                                    <Button className='addbutton' variant="light" onClick={handeladdTocart}>+ADD</Button>
                                ) : (
                                    <Button href='/cart' className='gotocart' variant="light">Go To Cart</Button>
                                )}

                                <h6 className='quantity'>{product.productQuantity}</h6>
                                <h5>₹{product.productPrice}</h5>
                            </div>
                        </div>
                        <div className='prodes'>
                            <h2>Important Information</h2>
                            <h6 className='quantity'>{product.productDescription}</h6>
                        </div>
                    </div>


                </div>

                <ToastContainer />
            </div>
            <Footer />
        </div>
    )
}

export default Product;