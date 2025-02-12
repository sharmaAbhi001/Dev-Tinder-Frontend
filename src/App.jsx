
import Body from './components/Body';  // Assuming Body is your main content page// Static Create Account page
import { createBrowserRouter, createRoutesFromElements, RouterProvider ,Route } from 'react-router';
import LoginAndSignup from './components/LoginAndSignup';
import Feed from './components/Feed';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import { Provider } from 'react-redux';
import store from './utils/appStore';
import Profile from './components/Profile';
import Connection from './components/Connection';
import Request from './components/Request';
import Chat from './components/Chat';

const App = () => {


  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Body />}> 
        <Route path="/login" element={<LoginAndSignup />} /> 
        <Route path="/" element={<Feed/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/connection' element={<Connection/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='request' element={<Request/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
      </Route>
    )
  );

  return (
<Provider store={store}>  
            <div className="App">
                <RouterProvider router={appRouter} />
            </div>
        </Provider>
  );
}

export default App;

