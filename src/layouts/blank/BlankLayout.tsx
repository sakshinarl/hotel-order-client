// //its for before login form 
// import { Routes, Route } from "react-router-dom";
// import React,{ Suspense } from 'react';
// import Header from './Header';
// import frontendRoutes from "../../shared/routes/frontendRoutes";

// interface IBlankLayoutProps{
// }
 
// //generic syntax
// const BlankLayout:React.FunctionComponent<IBlankLayoutProps> = (props) => {
//   return (
//   <>
//   <Header/>
//   {/* for suspense */}
//   <Suspense fallback={<h3>Loading...</h3>}>
//         <Routes>
//           {/*  for dynamic  */}
//           {Array.isArray(frontendRoutes) && frontendRoutes?.map(({ path, component }, i) => (
//               <Route key={i} path={path} element={component} />
//             ))}
//         </Routes>
//       </Suspense>
//   </>
//   );
// };

// export default BlankLayout;

import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import frontendRoutes from "../../shared/routes/frontendRoutes";
//in props which property you defining
interface IBlackLayoutProps {}

//<IBlackLayoutProps> generic syntax
const BlackLayout: React.FunctionComponent<IBlackLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          {Array.isArray(frontendRoutes) &&
            frontendRoutes?.map(({ path, component }, i) => (
              <Route key={i} path={path} element={component} />
            ))}
        </Routes>
      </Suspense>
     
      
    </>
  );
};

export default BlackLayout;

