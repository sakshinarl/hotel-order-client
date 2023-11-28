import axios from "axios";
import endpoints from "./endpoints";
import AuthService from "../services/AuthService";

const API = axios.create({
    baseURL: `${endpoints?.serverBaseUrl}/api/v1`,
});
//client to server to req with..inside tokens...
API.interceptors.request.use((req)=>{
    const token = sessionStorage.getItem("accessToken")
    if(token){
        req.headers["Authorization"] = token;
    }
    //in server side token ala ka ala asel tr valid ahe ka tr ch api will access....
    return req;
})
API.interceptors.response.use(response=>{
    const successCodes = [200,201]
    const code = response?.status
    if(successCodes.includes(code)) return response;
    return Promise.reject(response);

},
(err) => {


    console.log("err?.response?.status :",err?.response?.status);
    if(err?.response?.status == 401){
        // if token is invalid/expired then server returns 401 res status code
        const token = sessionStorage.getItem("refreshToken");
        AuthService?.refreshToken(token as string)
        .then((response) => {
            console.log("refreshed....");
            const { refreshToken, accessToken } = response?.data?.data;


            sessionStorage.setItem(
                "accessToken",
                accessToken);

      sessionStorage.setItem(
        "refreshToken",
        refreshToken);
      })
        .catch(console.error);

    } else if (err?.response?.status == 403){
        sessionStorage.clear();
        // window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(err);
});

export default API;



// import axios from "axios";
// import endpoints from "./endpoints";

// const API = axios.create({
//   baseURL: `${endpoints?.serverBaseUrl}/api/v1`,
// });

// // want to access all access token then add request interceptors
// API.interceptors.request.use((req)=> {
//   const token=sessionStorage.getItem("accessToken")
//   // if token is avaliable then add in req 
//   if (token) {
//     // add token 
//     req.headers["Authorization"] = token;
//     // means this goes in server side  
//   }
//   return req;
// })

// export default API;


// => when token come
// => when token is valid
// =>then we give access to API  

// private la compulsory token and public la compulsory nahi tevaycha 

//delete, update karaych asel tar tithe token compulsory karaycha 

// req madhe Authorization madhe access token display hot 

// Authorization server side recieve karaycha kadhi ja vales user fetch karato / user update karto / order (secured)