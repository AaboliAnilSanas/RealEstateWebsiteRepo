// // Removed Radix imports to resolve build errors as the package is not recognized:
// // import { Theme } from "@radix-ui/themes"; 
// // import "@radix-ui/themes/styles.css";

// import Navbar from './components/Navbar/navbar.jsx' 
// import Video from './components/Navbar/Video/video.jsx'
// import Contactus from './components/ContactUs/contactUsPage.jsx'
// import SellerForm from './components/SellerForm/SellerForm.jsx'
// import FilterComponent from './components/UIComponents/FilterComponent.jsx'
// import ListingCard from './components/UIComponents/ListingCard.jsx'
// import PropertyListing from './components/PropertyPages/PropertListing.jsx'
// function App() {
//   return (
//     <>
//     {/* <ListingCard/> */}
//     <PropertyListing/>
//     {/* <FilterComponent/> */}
//       {/* <Navbar /> 
//       <Video/> */}
//       {/* <Contactus/> */}
//       {/* <SellerForm/> */}
//       {/* The rest of your application content will go here */}

    
//     </>
//   )
// }

// export default App


// Removed Radix imports to resolve build errors as the package is not recognized:
// import { Theme } from "@radix-ui/themes"; 
// import "@radix-ui/themes/styles.css";

import { RouterProvider } from 'react-router-dom';
import router from './router/router';
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App