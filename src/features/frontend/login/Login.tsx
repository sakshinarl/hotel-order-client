import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {FieldValues,useForm} from "react-hook-form";
import User from "../../../shared/models/UserModel";
import AuthService from "../../../services/AuthService";
import { errorMessage } from "../../../shared/ui/toasts/Toasts";
import { addUser } from "../../../app/slices/authSlice";
import {useDispatch} from "react-redux";
import { useNavigate,Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {register,handleSubmit} = useForm({
    defaultValues:{
      email:"",
      password:""
    }
  })

  const handleLogin = (user:User) => {
   console.log("User: ",user);
   
    // generate post req.
    AuthService.userLogin(user)
    .then(response=>{
      //get token and store in the sessionStorage...
      // const token = response?.headers["x-token"]
      // console.log("Token:",token);
      // console.log("Response:",response);
      sessionStorage.setItem("accessToken",response?.headers["x-accesstoken"])
      sessionStorage.setItem("refreshToken",response?.headers["x-refreshtoken"])

      
      //get user from res body and store in the redeux state
      const user = response?.data?.data
      console.log("User: ",user);
      
     dispatch(addUser(user))

      // navigate to dashboard
   
      navigate("/secured");
    })
    .catch(err=>{
        const message = err?.response?.data?.message || "could not login , try again"
        errorMessage(message)
    })
  
  };
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            p: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email")}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password")}
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" style={{fontSize:"0.9em"}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="#">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
        };
export default Login;
