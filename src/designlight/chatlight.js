
import React, { useState, useRef, useEffect } from 'react';
// import logo5 from '../image/image2.png';
import './chatlight.css';
import "@fontsource/montserrat";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { HiEllipsisVertical } from "react-icons/hi2";
// import logo6 from '../image/image 1.png';
import logo7 from '../image/nnpc.png';

const Chatlight = ({ handleOut, userName, userEmail }) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    sendMessages();
  }, []);

  const sendMessages = async () => {
    const welcomeMessage = `Welcome ${userName}, I am INEO service desk assistant.`;
    const additionalMessage = `Do you have a question or need assistance?`;

    const botReplies = [
      { type: 'bot', text: welcomeMessage },
      { type: 'bot', text: additionalMessage }
    ];

    setMessages(prevMessages => [...prevMessages, ...botReplies]);
  };

  const handleSendMessage = async () => {
    const currentMessage = inputRef.current.value.trim();
    const userMessage = { type: 'user', text: currentMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    try {
      const requestBody = { user: currentMessage };
      const botReplyLoading = { type: 'bot', text: 'Generating Reply...', loading: true, isLoading: true };
      setMessages(prevMessages => [...prevMessages, botReplyLoading]);
      const headers = { 'Content-Type': 'application/json', 'userEmail': "userEmail", 'userName': userName };
      const response = await fetch('https://nnpchelpdeskbe.azurewebsites.net/bot', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      const processedResponse = data.response.replace('Uchenna Nnamani', userName);
      const botReply = { type: 'bot', text: processBotReply(processedResponse) };
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

//  const processBotReply = (response) => {
//   const urlRegex = /(https?:\/\/[^\s\)\.]+)/g;
//   const processedResponse = response.replace(urlRegex, '<button class="link-button" data-url="$1">Click Here</button>');
//   return processedResponse;
// };

function processBotReply(response) {
  const urlRegex = /\[.*?\]\((https?:\/\/[^\s]+)\)/;
  const processedResponse = response.replace(urlRegex, '<button class="link-button" data-url="$1">Click Here</button>');
  return processedResponse;
}

  useEffect(() => {
    const handleButtonClick = (event) => {
      const url = event.target.dataset.url;
      if (url) {
        window.location.href = url;
      }
    };

    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });

    return () => {
      linkButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, [messages]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogoutConfirm = (confirm) => {
    if (confirm) {
      handleOut();
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <section>
      <div className='nav-header-contents'>
        <div>
          <img className='navs-nnpc-logo' src={logo7} alt="" srcset="" />
        </div>
        <div>
          <p className='nav-p'>INEO</p>
        </div>
        <div className='nazz'>
          <p className='welcome'>Hi, {userName}</p>
          <button className='nazz-dots' onClick={toggleModal}>
            <HiEllipsisVertical />
           
          </button>
        </div>
      </div>

      <div className='chat-container' ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
            {message.type === 'bot' && message.loading ? (
              <div className="bot-loading-container">
                <div className="spinner-border"></div>
                <span className="bot-loading-message">{message.text}</span>
              </div>
            ) : (
              <span className='formatted-message' dangerouslySetInnerHTML={{ __html: message.text }}></span>
            )}
          </div>
        ))}
      </div>
      
      <div className="input-container">
  <input
    type="text"
    placeholder="Type a message..."
    id="inputText"
    ref={inputRef}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSendMessage(inputRef.current.value);
        inputRef.current.value = '';
      }
    }}
  />
  <button
    onClick={() => {
      handleSendMessage(inputRef.current.value);
      inputRef.current.value = '';
    }}
  >
    <PiPaperPlaneRightFill style={{ fontSize: '25px', color: '#159351' }} />
  </button>
</div>


      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{userName}, Do you want to logout?</p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={() => handleLogoutConfirm(true)}>Yes</button>
              <button className="modal-button" onClick={() => handleLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Chatlight;
