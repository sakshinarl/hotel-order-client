import * as React from "react";
import PageNotFound from './shared/ui/404/PageNotFound';
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import BlankLayout from './layouts/blank/BlankLayout';
import FullLayout from './layouts/full/FullLayout';

import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from "./app/slices/authSlice";
import AuthService from "./services/AuthService";

interface IProtectedRoutes{
 children:React.ReactElement
}
const ProtectedRoute: React.FunctionComponent<IProtectedRoutes> = ({children})=>{
   
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const clearSession = ()=>{
    sessionStorage.clear();
    dispatch(addUser({}));
    navigate("/login");

  }


  React.useEffect(()=>{
    //validate token
    const token = sessionStorage.getItem("accessToken");
    if(token){
      AuthService.validateToken(token)
      .then(data=>{
        //token is valid
        console.log("token then: ",data);
        
      })
      .catch(err=>{
        console.error("Error",err);
        clearSession()
        
      })
    }else{
      clearSession()
    }

  },[])
   //get logged user from redux state
   const loggedUser =  useSelector(selectUser)
   return loggedUser?._id ? children : <Navigate to="/login" />
}
interface IAppProps {}
const App: React.FunctionComponent<IAppProps> = (props) => {
  return ( 
      <>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <Routes>
      <Route path='/*' element={<BlankLayout/>}/>
      <Route path='secured/*' element={<ProtectedRoute><FullLayout /></ProtectedRoute>}/>
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
    
    
    </>
    
  );
};
export default App;