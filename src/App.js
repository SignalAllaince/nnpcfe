import React, { useEffect, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';
import { loginRequest } from "./config";
// import axios from 'axios';
import './App.css';
import Lightmode from './designlight/lightmode'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatlight from './designlight/chatlight';



const WrappedView = () => {
  const { instance, accounts } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [userEmail, setUserEmail] = useState('');

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        account : accounts[0],
        prompt: 'create',
      })
      .catch((error) => console.log(error));
  };
  console.log(accounts)
  const handleLogout = () => instance.logout();
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = instance.getActiveAccount()?.idToken;
  
  //     if (token) {
  //       try {
  //         const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  
  //         console.log('Microsoft Graph API Response:', response.data);
  
          
  //         const decodedToken = instance.getAccountByHomeId(instance.getActiveAccount()?.homeAccountId)?.idTokenClaims;
  //         console.log('Token Claims:', decodedToken);
  
  //         setUserEmail(response.data.mail);
  //       } catch (error) {
  //         console.error('Error fetching user information:', error);
  //       }
  //     }
  //   };
  
  //   fetchUserData();
  // }, [instance]);
  
   const Ename = `${activeAccount?.username}`;  
  //  this is for the useremail showing


  const Vname = activeAccount ? activeAccount.name.split(' ').slice(0, 2).join(' ') : '';
  // const Vname = activeAccount ? activeAccount.name.split(' ')[0] : ''; FOR ONLY FIRST NAME

  // const UName = `${accounts[0].name}` THIS IS FOR THE FULL NAME SHWOING

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <Chatlight handleOut={handleLogout} userName={Vname} userEmail={Ename} />
        ) : null}
      </AuthenticatedTemplate>

      
      <UnauthenticatedTemplate>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Lightmode handleFun={handleRedirect} />} />
            </Routes>
          </Router>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrappedView />
    </MsalProvider>
  );
};

export default App;


// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route exact path='/'Component={Landing}/>
//           <Route path='/Chat' element={<Chat/>}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
