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

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><App /><ActiveSalesOrder /></>,
  },
  {
    path: "/completedsalesorder",
    element: <><Navbar /><App /><CompletedSalesOrder /></>,
  },
]);
const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

