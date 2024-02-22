
// import React, { useState, useRef, useEffect } from 'react';
// import logo5 from '../image/image2.png';
// import './chatlight.css';
// import "@fontsource/montserrat";
// import { PiPaperPlaneRightFill } from "react-icons/pi";

// const Chatlight = ({ handleOut, userEmail }) => {
//   const [messages, setMessages] = useState([]);
//   const chatContainerRef = useRef(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }, [messages]);

//   const handleSendMessage = async () => {
//     const currentMessage = inputRef.current.value.trim();

//     // User message
//     const userMessage = { type: 'user', text: currentMessage };
//     setMessages(prevMessages => [...prevMessages, userMessage]);

//     try {
//       const requestBody = { user: currentMessage };
//       const botReplyLoading = { type: 'bot', text: 'Generating reply...', loading: true };
//       setMessages(prevMessages => [...prevMessages, botReplyLoading]);
    
//       const headers = { 'Content-Type': 'application/json', 'Email': userEmail };
//       console.log(headers);
//       const response = await fetch('https://servicesdesk1.azurewebsites.net/bot', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(requestBody),
//       });
      
    
//       const data = await response.json();
     
//       const zemp = data.response.replace('Uchenna Nnamani', userEmail)
//       const botReply = { type: 'bot', text: zemp};
//       setMessages(prevMessages => [...prevMessages.slice(0, -1), botReply]);
//     } catch (error) {
//       console.error('Error fetching bot reply:', error);
//       let errorMessage = 'Please check your internet connection';
//       if (!navigator.onLine) {
//         errorMessage = 'Please check your internet connection';
//       }
//       const botReplyError = { type: 'bot', text: errorMessage };
//       setMessages(prevMessages => [...prevMessages.slice(0, -1), botReplyError]);
//     }
    
//     inputRef.current.value = '';
    
    
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   return (
//     <section style={{background: '#d9d9d9', height: '82.2vh'}}>
//       <div className='nav-header-contents'>
//         <div>
//           <p className='nav-p'>
//             SERVICE DESK
//           </p>
         
//         </div>
//         <div>
//           <img className='navs-nnpc-logo' src={logo5} alt="" srcset="" />
//         </div>
//         <div className='dropdown'>
//           <button className='chat-navs-btn' onClick={toggleDropdown}>
//             {`Welcome ${userEmail}`}
//           </button>
//           {dropdownVisible && (
//             <div>
//               <button className='dropdown-content' onClick={handleOut}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className='chat-container' ref={chatContainerRef}>
//         {messages.map((message, index) => (
//           <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
//             {message.type === 'bot' && message.loading ? (
//               <span className="bot-loading-message">{message.text}</span>
//             ) : (
//               <span>{message.text}</span>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className='chat-inputs'>
//         <div className='chat-inputs-2'>
//           <input
//             className='chat-inputs-placeholder'
//             type="text"
//             placeholder='How may I help you?'
//             ref={inputRef}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleSendMessage(e.target.value);
//                 e.target.value = '';
//               }
//             }}
//           />
//           <button
//             className='chat-inputs-btn'
//             onClick={() => {
//               const inputElement = document.querySelector('.chat-input-placeholder');
//               handleSendMessage(inputElement.value);
//               inputElement.value = '';
//             }}
//           >
//             <PiPaperPlaneRightFill style={{fontSize: "30px", color: "#1a2f3e"}} /> 
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Chatlight;

import React, { useState, useRef, useEffect } from 'react';
import logo5 from '../image/image2.png';
import './chatlight.css';
import "@fontsource/montserrat";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { HiEllipsisVertical } from "react-icons/hi2";

const Chatlight = ({ handleOut, userEmail,}) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    sendWelcomeMessage();
  }, []);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendWelcomeMessage = () => {
    const welcomeMessage = `Welcome ${userEmail}, how may I help you?`;
    const botReply = { type: 'bot', text: welcomeMessage };
    setMessages(prevMessages => [...prevMessages, botReply]);
  };

  const handleSendMessage = async () => {
    const currentMessage = inputRef.current.value.trim();

    const userMessage = { type: 'user', text: currentMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    try {
      const requestBody = { user: currentMessage };
      const botReplyLoading = { type: 'bot', text: 'Generating reply...', loading: true };
      setMessages(prevMessages => [...prevMessages, botReplyLoading]);
    
      const headers = { 'Content-Type': 'application/json', 'Email': userEmail };
      console.log(headers);
      const response = await fetch('https://servicesdesk1.azurewebsites.net/bot', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      
    
      const data = await response.json();
     
      const zemp = data.response.replace('Uchenna Nnamani', userEmail)
      const botReply = { type: 'bot', text: zemp};
      setMessages(prevMessages => [...prevMessages.slice(0, -1), botReply]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      let errorMessage = 'Please check your internet connection';
      if (!navigator.onLine) {
        errorMessage = 'Please check your internet connection';
      }
      const botReplyError = { type: 'bot', text: errorMessage };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), botReplyError]);
    }
    

    inputRef.current.value = '';
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <section style={{background: '#d9d9d9', height: '82.2vh'}}>
      <div className='nav-header-contents'>
        <div>
          <p className='nav-p'>
            SERVICE DESK
          </p>
        </div>
        <div>
          <img className='navs-nnpc-logo' src={logo5} alt="" srcset="" />
        </div>
        <div className=''> 
        <p className='welcome'> {`Welcome ${userEmail}`}</p>
        <button className='chat-navs-btn' onClick={handleOut}>
            Logout
          </button>
          

          {/* <div className='dropdown'>
        <button onClick={toggleDropdown}>
              <HiEllipsisVertical />
           </button>
          {dropdownVisible && (
            <div>
              <button className='dropdown-content' onClick={handleOut}>Logout</button>
            </div>
          )}
        </div> */}
        </div>

        
        
      </div>

      <div className='chat-container' ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
            {message.type === 'bot' && message.loading ? (
              <span className="bot-loading-message">{message.text}</span>
            ) : (
              <span>{message.text}</span>
            )}
          </div>
        ))}
      </div>

      <div className='chat-inputs'>
        <div className='chat-inputs-2'>
          <input
            className='chat-inputs-placeholder'
            type="text"
            placeholder='How may I help you?'
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            className='chat-inputs-btn'
            onClick={() => {
              handleSendMessage(inputRef.current.value);
              inputRef.current.value = '';
            }}
          >
            <PiPaperPlaneRightFill style={{fontSize: "30px", color: "#1a2f3e"}} /> 
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chatlight;
