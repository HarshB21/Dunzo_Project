import React, { useEffect,useState } from 'react'
import dunzodaily from 'C:/Harsh bhosale/React/dunzo/src/Assets/Images/dunzoDaily.png'
import Card from 'react-bootstrap/Card';
import grocery from 'C:/Harsh bhosale/React/dunzo/src/Assets/Images/grocery.png'
import pickup from 'C:/Harsh bhosale/React/dunzo/src/Assets/Images/pickupdrop.png'
import fruit from 'C:/Harsh bhosale/React/dunzo/src/Assets/Images/fruitvegetable.png'
import meat from 'C:/Harsh bhosale/React/dunzo/src/Assets/Images/meatfish.png'
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Styledash.css'
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';


const DashBoard = () => {

  
    

    return (
        <>
           <Header/>
            <div className='main'>
                
                <div className='m2'>
                    <img src={dunzodaily} alt='' style={{ position: 'relative', height: 'auto', width: '1024px', borderRadius: '10px' }} />
                </div>
                <div className='content'>
                    <div className='content-1'>
                        <h1>Bangalore</h1>
                        <p>Why step out when you can get everything delivered home with the tap of a button? Bangalore’s favourite delivery app gets you Food, Grocery, Medicine, Pet Supplies, Fruits & Vegetables, Meat & Fish, Health & Wellness, Gifts and Send Packages from one end of the city to the other. From your local kirana stores to your favourite brands, grocery shopping to your forgotten charger, we are always on the move for you. Why worry about your chores, when you can get it all Dun!</p>
                    </div>

                    <div className='content-1'>
                        <Link to={'/grocery-stores/1'} >
                            <Card className="bg-light  text-white">
                                <Card.Img src={grocery} alt="Card image" className='imgcard' />
                            </Card>
                        </Link>
                        <Link to={'/grocery-stores/3'} >
                        <Card className="bg-light  text-white">
                            <Card.Img src={fruit} alt="Card image" className='imgcard' />
                        </Card>
                        </Link>
                        <Card className="bg-light  text-white" >
                            <Card.Img src={meat} alt="Card image" className='imgcard' />
                        </Card>
                        <Card className="bg-light  text-white">
                            <Card.Img src={pickup} alt="Card image" className='imgcard' />
                        </Card>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default DashBoard;