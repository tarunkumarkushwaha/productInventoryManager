import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App'
import ActiveSalesOrder from './pages/ActiveSalesOrder';
import CompletedSalesOrder from './pages/CompletedSalesOrder';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Usercontext from './userContext';
import Footer from './components/Footer';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><App /><Footer/></>,
  },
  {
    path: "/activesalesorder",
    element: <><Navbar /><ActiveSalesOrder /><Footer/></>,
  },
  {
    path: "/completedsalesorder",
    element: <><Navbar /><CompletedSalesOrder /><Footer/></>,
  },
  {
    path: "/login",
    element: <><Login/></>,
  },
  {
    path: "/signup",
    element: <><Signup/></>,
  },
]);
const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Usercontext>
        <RouterProvider router={router} />
        </Usercontext>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

