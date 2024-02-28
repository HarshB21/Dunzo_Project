import React, { useEffect, useState } from 'react'
import grocerylogo from 'C:/Harsh bhosale/React/dunzo/src/Assets/Logo/grocerylogo.png'
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Groceryshopstyle.css'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useParams } from 'react-router-dom';
import Header from '../Components/Header';


export const GroceryShopsList = () => {

  const [shopList, setShopList] = useState({ mainCategoryName: '', shopdto: [] });
  const {mainCategoryID} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/Dunzo/getListOfShopByMainCategory/${mainCategoryID}`)

      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          setShopList(response.data);
        }
      })
      .catch(error => {
        alert('Caught error all')
      })
  }, [mainCategoryID])

  return (
    <>
    <Header/>
      <div className='main'>
        <div className='color'>
          <div className='head'>
            <div className='imgad'>
              <img src={grocerylogo} alt='' className='imglogo'></img>
            </div>
            <h1 className='heading'>{shopList.mainCategoryName}</h1>
          </div>
        </div>
        <div className='shoplist'>
          {shopList.shopdto.map((shop) => (
            <div key={shop.shopID}>
              
              <Link style={{textDecoration:'none'}} to={`/grocery-stores/${mainCategoryID}/shop/${shop.shopID}/subcategories`}>
              <Card className='gcard' >
                <Card.Body className='gcard-body'>
                  <Card.Title><img className='shoplogo' src={shop.shopLogo} alt='' /></Card.Title>
                  <ListGroup >
                    <ListGroup.Item><h3>{shop.shopName}</h3></ListGroup.Item>
                    <ListGroup.Item>{shop.shopLocation}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              </Link>
            </div>
          ))

          }
        </div>
      </div>
    </>
  )
}


















