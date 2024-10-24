import React from 'react';
import './lightmode.css';
import logo5 from '../image/image2.png';
import logo6 from '../image/icon1.png';
import logo7 from '../image/icon2.png';
import logo8 from '../image/icon3.png';
import logo9 from '../image/nnpc.png'
import { Link } from 'react-router-dom';
import "@fontsource/montserrat";

const Lightmode = ({ handleFun }) => {
    const url = "https://login.microsoftonline.com/c9bfec4a-5ccc-4996-bf58-9401877a9892";
    const encoded_url = encodeURIComponent(url);
    console.log(encoded_url);

    return (
        <section className='scroll-container'> 
            <div className='nav-header-content'>
                <div>
                    <img className='nav-nnpc-logo' src={logo9} alt="NNPC Logo" />
                </div>
                <div>
                    <Link to="https://app.powerbi.com/reportEmbed?reportId=8e127d26-98db-45be-89c8-542529dec24c&autoAuth=true&ctid=c9bfec4a-5ccc-4996-bf58-9401877a9892"  rel="noopener noreferrer">
                        <button className='nav-btn'>Reporting</button>
                    </Link>
                </div>
            </div>

            <div className="background-container">
                <div className="background-overlay"></div>
                <div className='home-middle'>
                    <p className='home-middle-first-text'>
                        WELCOME TO <br /> <span className='welcome1'>NNPC SERVICE DESK</span>
                    </p>
                    <p className='home-middle-second-text'>
                        <span>Your one-stop solution for efficient and responsive service support.</span> <br /><span>Have a question or need assistance? We're here to help!</span>
                    </p>

                    <div className='home-middle-third'>
                        <p className='home-middle-third-text'>
                            How can I help you?
                        </p>
                        <button className='login-btn' onClick={handleFun}>
                            Get started
                        </button>
                    </div>
                </div>

                <div className='h-d'>
                    <div className='home-down'>
                        <img className='home-down-icon' src={logo6} alt="Support Icon"/>
                        <p className='home-down-p1'>Seamless Support with NNPC AI Service Desk</p>
                        <p className='home-down-p2'>An advanced application meticulously crafted to transform your internal support system. Embrace a new era of service management.</p>
                    </div>
                    <div className='home-down2'>
                        <img className='home-down-icon' src={logo7} alt="Support Icon" />
                        <p className='home-down-p1'>Timeless Support with NNPC AI Service Desk</p>
                        <p className='home-down-p2'>Embark on a Journey of Effortless Support with NNPC AI Service Desk. Our intricately designed application redefines your internal support system.</p>
                    </div>
                    <div className='home-down3'>
                        <img className='home-down-icon' src={logo8} alt="Support Icon"/>
                        <p className='home-down-p1'>Revolutionizing Support with NNPC Service Desk</p>
                        <p className='home-down-p2'>Our cutting-edge application blends artificial intelligence seamlessly with service management, delivering unparalleled support.</p>
                    </div>
                </div>

                <div className='footer'>
                    <p>@ NNPC</p>
                </div>
            </div>
        </section>
    );
}

export default Lightmode;

