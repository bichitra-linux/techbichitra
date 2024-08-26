import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Editor from './pages/editor.page';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';
import { lookInSession } from './common/session';

interface UserAuth {
  access_token: string | null;
  
}

export interface UserContextType {
  userAuth: UserAuth;
  setUserAuth: React.Dispatch<React.SetStateAction<UserAuth>>;
}

export const UserContext = createContext<UserContextType>({
    userAuth: { access_token: null },
    setUserAuth: () => {},
  });
const App: React.FC = () => {
  const [userAuth, setUserAuth] = useState<UserAuth>({ access_token: null });

  useEffect(() => {
    const userInSession = lookInSession('user');
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;