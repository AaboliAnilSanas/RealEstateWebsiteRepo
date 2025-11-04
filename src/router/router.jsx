import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import your components
import Navbar from '../components/Homepage/Navbar/navbar.jsx';
import Contactus from '../components/ContactUs/contactUsPage.jsx';
import SellerForm from '../components/SellerForm/SellerForm.jsx';
import FilterComponent from '../components/UIComponents/FilterComponent.jsx';
import PropertyListing from '../components/PropertyPages/PropertListing.jsx';
import HomePage from '../components/Homepage/homepage.jsx';
import Layout from '../components/Layout/layout.jsx';
import RegisterForm from '../components/Authentication/RegisterForm.jsx';
import AuthFlowModal from '../components/Authentication/AuthFlowModal.jsx'; // Import the new flow controller
import PropertyDetails from '../components/PropertyPages/PropertyDetails/PropertyDetails.jsx';
// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Create a layout component
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'properties',
        element: <PropertyListing />,
      },
      {
        path: 'properties/:propertyId', // Dynamic parameter for property ID
        element: <PropertyDetails />,
      },
      {
        path: 'sell',
        element: <SellerForm />,
      },
      {
        path: 'filters',
        element: <FilterComponent />,
      },
      {
        path: 'contact',
        element: <Contactus />,
      },
      {
        path: 'login',
        element: <AuthFlowModal isOpen={true} />
      },
    ],
  },
]);
export default router;