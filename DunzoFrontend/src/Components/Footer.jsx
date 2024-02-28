import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import footer1 from 'C:/Harsh bhosale/React/dunzo/src/Assets/Logo/footerlogo1.png';
import footer2 from 'C:/Harsh bhosale/React/dunzo/src/Assets/Logo/footer2.png'
import 'C:/Harsh bhosale/React/dunzo/src/Styles/Styledash.css'

 const Footer = () => {
    return (
        <div>
            <MDBFooter  className='text-center text-lg-start text-muted' style={{backgroundColor:'rgb(23, 30, 48)',marginTop:'50px'}} >
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'  style={{display:'flex',maxWidth:'1024px',marginLeft:'120px',flexWrap:'wrap'}}>
                    <div className='me-5 d-none d-lg-block' style={{color:'white'}}>
                        <h5>You can’t stop time, but you can save it!</h5>
                        <span style={{color:'rgb(183, 186, 195)'}}>Living in the city, there is never enough time to shop for groceries, pick-up supplies, grab food and wade through traffic on the way back home. How about we take care of all of the above for you? What if we can give you all that time back? Send packages across the city and get everything from food, groceries, medicines and pet supplies delivered right to your doorstep. From any store to your door, just make a list and we’ll make it disappear. Just Dunzo It!</span>
                    </div>
                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'  style={{display:'flex',maxWidth:'1024px',marginLeft:'120px',marginTop:'30px'}}>
                        <img src={footer1} alt='' style={{width:'7opx',height:'70px',marginRight:'50px'}}/>

                        <MDBRow className='mt-7'>

                            <MDBCol md="5" lg="5" xl="3" className='mb-7' style={{color:'white',marginRight:'100px'}}>
                                <h6 className='text-uppercase fw-bold mb-4' >DUNZO</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        About
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Jobs
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Contact
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Terms & Conditions
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Privacy Policy
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Dunzo for partner
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Dunzo for business
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="5" lg="5" xl="2" className=' mb-7' style={{color:'white',marginRight:'100px'}}>
                                <h6 className='text-uppercase fw-bold mb-4'>SERVICEABLE CITIES</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Banglore
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Pune
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Gurgaon
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Hyderabad
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Delhi
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Chennai
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Mumbai
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="5" lg="5" xl="2" className='mb-7' style={{color:'white'}}>
                                <h6 className='text-uppercase fw-bold mb-4'>GET IN TOUCH</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Email
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Media Queries
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Twitter
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Facebook
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Instagram
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        LinkedIn
                                    </a>
                                </p>
                                
                            </MDBCol>
                        </MDBRow>
                        <img src={footer2} alt='' style={{width:'260px',height:'200px'}}/>
                    </MDBContainer>
                </section>

            
            </MDBFooter>

        </div>
    )
}

export default Footer;