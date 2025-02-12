import  { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
 // Your main app component
// Import the Redux store
import './index.css';
import App from './App';

// const appRouter = createBrowserRouter ([
//   {
//     path:"/",
//     element:<Layout/>,
//     children:[
//       {
//         path:"/",
//         element:<Body/>
//       }
      
//     ]
//   }
// ])




createRoot(document.getElementById('root')).render(
  <StrictMode>
<App/>
  </StrictMode>
);


