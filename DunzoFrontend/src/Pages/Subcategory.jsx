import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Subcategory.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Footer from '../../../dunzo/src/Components/Footer';
import Header from '../Components/Header';

const Subcategory = () => {

    const [subcategory, setsubcategory] = useState({ shopName: '', shopLocation: '', shopLogo: '', subcategorydto: [] });
    const { shopID } = useParams();
    const [selectsubcategoryID, setselectsubcategoryID] = useState(1);
    const [product, setproduct] = useState({ productdto: [] });

    useEffect(() => {
        axios.get(`http://localhost:8080/Dunzo/getListOfSubcategoryFromShop/${shopID}`)

            .then((response) => {
                console.log(response.data)
                if (response.status === 200 ) {
                    setsubcategory(response.data);
                    setselectsubcategoryID(response.data.subcategorydto[0].subCategoryID)
                }
            })
            .catch((error) => {
                alert('Caught error all')
                console.error(error);
            })
    }, [shopID]);


    const fetctproduct = (subCategoryID) => {
        axios.get(`http://localhost:8080/Dunzo/getProductWithSubcategory/${subCategoryID}`)
            .then((response) => {
                if (response.status === 200) {
                    setproduct(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        if (selectsubcategoryID != null) {
            fetctproduct(selectsubcategoryID)
        }
    }, [selectsubcategoryID]);

    const handel = (subCategoryID) => {
        setselectsubcategoryID(subCategoryID);
    }

    return (
        <div>
           <Header/>
            <div className='main'>
                <div className='color1'>
                    <div className='head'>
                        <div className='imgad'>
                            <img src={subcategory.shopLogo} alt='' className='imglogo1'></img>
                        </div>
                        <div className='he'>
                            <h2 className='heading'>{subcategory.shopName}</h2>
                            <h5 className='heading'>{subcategory.shopLocation}</h5>
                        </div>
                    </div>
                </div>
                <div className="row1">
                    <div className="col-4">
                        <div id="list-example" className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {subcategory.subcategorydto.map((sub) => (
                                <div key={sub.subCategoryID}>
                                    <a className="list-group-item list-group-item-action" href={`#list-item-${sub.subCategoryID}`} onClick={() => handel(sub.subCategoryID)}>{sub.subCategoryName}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-8">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" style={{maxHeight: '300px', overflowY: 'auto'}} data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                            {product.productdto.map((product) => (
                                <div key={product.productID}  >
                                    <Link to={`/products/${product.productID}`}>
                                        <Card className='gcard1' >
                                            <Card.Body className='gcard-body'>
                                                <Card.Title><img className='shoplogo1' src={product.productImage} alt='' /></Card.Title>
                                                <ListGroup >
                                                    <ListGroup.Item className='bottom'><h6 className='green'>{product.productName}</h6></ListGroup.Item>
                                                    <ListGroup.Item className='bottom'>{product.productQuantity}</ListGroup.Item>
                                                    <ListGroup.Item className='bottom'><h6>₹{product.productPrice}</h6></ListGroup.Item>
                                                </ListGroup>
                                                <Button className='addbutton' variant="light">+ADD</Button>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Subcategory;