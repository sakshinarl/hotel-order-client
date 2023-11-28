// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import EditIcon from "@mui/icons-material/Edit";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import UserContext from './UserContext';
// import { Controller, useForm } from 'react-hook-form';
// import UserService from '../../../services/UserService';
// import { errorMessage, successMessage } from '../../../shared/ui/toasts/Toasts';
// import endpoints from '../../../api/endpoints';
// import FileChooser from '../../../shared/ui/file-chooser/FileChooser';


// //user validation schema
// const userSchema = Yup.object().shape({
//     name:Yup.object().shape({
//         first: Yup.string().min(3,"Too short").max(25,"Too long!"),
//         last: Yup.string().min(3,"Too short").max(25,"Too long!"),

//     }),
//     mobile: Yup.string().matches(/^[7-9]{1}[0-9]{9}$/, "Enter 10 digit mobile number"),
//     email:Yup.string().email("Enter valid email"),
//     status:Yup.number().min(0).max(10),
//     role:Yup.string(),
//     password:Yup.string(),
//     avatar:Yup.string(),      
// })

// interface IUserFormProps{

// }

// const UserForm: React.FunctionComponent<IUserFormProps> = (props) =>{

// const {operation,selectedUser,loadUsers,onClose} = React.useContext(UserContext)

// //state to store  base64 image
// const [profilePic, setProfilePic] = React.useState<string>("https://cdn-icons-png.flaticon.com/512/3682/3682281.png")
// const [avatar,setAvatar] = React.useState<File>()

// const {register, handleSubmit, control, formState:{errors,touchedFields}} = useForm({
//     defaultValues:{
//         name:{
//             first:"",
//             last:""
//         },
//         mobile:"",
//         email:"",
//         status:1,
//         role:"admin",
//         password:"",
//         ...selectedUser

//     },
//     resolver: yupResolver(userSchema)
// })
// const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
//     const {files} = e.target
//     const file = files && files[0]
//     const fr = new FileReader()
//     fr.addEventListener("load",function(){
//         if(fr.result)
//         setProfilePic(fr.result as string)
//     });
//     if(file) {
//         setAvatar(file)
//         fr.readAsDataURL(file)

// }
// }
// const handleAddEditUser = (user:any)=>{

//     const fd = new FormData()
//     if(user?.name?.first) fd.append("name.first",user?.name?.first)
//     if(user?.name?.last) fd.append("name.last",user?.name?.last)
//     if(user?.mobile) fd.append("mobile",user?.mobile)
//     if(user?.email) fd.append("email",user?.email)
//     if(user?.password) fd.append("password",user?.password)
//     if(user?.status) fd.append("status",user?.status)
//     if(user?.role) fd.append("role",user?.role)
//     if(avatar) fd.append("avatar",avatar)
//     if(operation == "edit"){
//         //update the user
//         UserService?.updateUser(selectedUser?._id as string, fd)
//         .then(response=>{
//             const message = response?.data?.message || "User Updated"
//             successMessage(message)
//             loadUsers()
//             onClose()
//         })
//         .catch(err=>{
//             console.error(err);
//             const message = err?.response?.data?.message || "User not  Updated"
//             errorMessage(message)
            
//         })

//     }else{
//         //create the user
//         UserService?.createUser( fd)
//         .then(response=>{
//             const message = response?.data?.message || "User Created"
//             successMessage(message)
//             loadUsers()
//             onClose()
            

//         })
//         .catch(err=>{
//             console.error(err);
//             const message = err?.response?.data?.message || "User not  created"
//             errorMessage(message)
            
//         })
//     }
    
// }
// React.useEffect(()=>{
//     if(selectedUser?.avatar){
//         const url = `${endpoints?.serverBaseUrl}/${selectedUser?.avatar}`;
//         setProfilePic(url)

//     }
// },[selectedUser])

// return <Container>
//     <Card sx={{p:2}} component="form" onSubmit={handleSubmit(handleAddEditUser)}>
//         <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//                 <TextField
//                 fullWidth
//                 variant='outlined'
//                 label="First Name"
//                 {...register("name.first")}
//                 error={errors?.name?.first && touchedFields?.name?.first ? true:false }
//                 helperText={<span>{ touchedFields?.name?.first && errors?.name?.first?.message}</span>}
//                 />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                 <TextField
//                 fullWidth
//                 variant='outlined'
//                 label="Last Name"
//                 {...register("name.last")}
//                 error={errors?.name?.last && touchedFields?.name?.last ? true:false }
//                 helperText={<span>{ touchedFields?.name?.last && errors?.name?.last?.message}</span>}
//                 />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                 <TextField
//                 fullWidth
//                 variant='outlined'
//                 label="Mobile"
//                 {...register("mobile")}
//                 error={errors?.mobile && touchedFields?.mobile ? true:false }
//                 helperText={<span>{ touchedFields?.mobile && errors?.mobile?.message}</span>}
//                 />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                 <TextField
//                 fullWidth
//                 variant='outlined'
//                 label="Email"
//                 {...register("email")}
//                 error={errors?.email && touchedFields?.email ? true:false }
//                 helperText={<span>{ touchedFields?.email && errors?.email?.message}</span>}
//                 />
//                 </Grid>
//                 {operation != "edit" && <Grid item xs={12} md={6}>
//                 <TextField
//                 fullWidth
//                 variant='outlined'
//                 type='password'
//                 label="Password"
//                 {...register("password")}
//                 error={errors?.password && touchedFields?.password ? true:false }
//                 helperText={<span>{ touchedFields?.password && errors?.password?.message}</span>}
//                 />
//                 </Grid>}

//                 <Grid item xs={12}>
//                <FormControl fullWidth>
//                 <InputLabel id="level-label">Status</InputLabel>
//                 <Controller
//                 name="status"
//                 // id="status"
//                 defaultValue={selectedUser?.status}
//                 control={control}
//                 render={({ field })=>(
//                     <Select labelId='level-label' {...field}>
//                         <MenuItem value={1}>Active</MenuItem>
//                         <MenuItem value={0}>Inactive</MenuItem>
//                     </Select>
//                 )}
//                 />
//                </FormControl>
//                </Grid>


//                <Grid item xs={12}>
//                 <Box sx={{
//                     maxWidth:150,
//                     maxHeight:150,
//                     position:"relative",
//                     boxShadow:"0 0 3px 1px #9999",
//                     margin:1

//                 }}>
//                     <img style={{width:"100%",height:"100%"}} src={profilePic? profilePic:"https://cdn-icons-png.flaticon.com/512/3682/3682281.png"}/>
//                                 <IconButton sx={{position:"absolute",bottom:1,right:1,bgcolor:"GrayText"}}>
//                                     <label htmlFor='avatar'>
//                                         <EditIcon/>
//                                     </label>
//                                 </IconButton>
//                                 <FileChooser
//                                  id="avatar"  
//                                  accept='.jpg,.jpeg,.png,.webp'
//                                 // onChange={handleImageChange}
//                                 // requireBase64={true}
//                                 />
//                 </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button variant='contained' type='submit'>{operation=="edit"?"Update":"Create"}</Button>
//                 </Grid>
//         </Grid>

//     </Card>
// </Container>
// };
// export default UserForm;


import * as React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserContext from "./UserContext";
import endpoints from "../../../api/endpoints";
import UserService from "../../../services/UserService";
import { errorMessage, successMessage } from "../../../shared/ui/toasts/Toasts";
import FileChooser, {
  IFileData,
} from "../../../shared/ui/file-chooser/FileChooser";

//user validation schema
const userSchema = Yup.object().shape({
  name: Yup.object({
    first: Yup.string().min(3, "Too short").max(25, "Too Long"),
    last: Yup.string().min(3, "Too short").max(25, "Too Long"),
  }),
  mobile: Yup.string().matches(/^[7-9]{1}[0-9]{9}$/, "Enter a 10-digit number"),
  email: Yup.string().email("Enter a valid Email"),
  status: Yup.number().min(0).max(10),
  role: Yup.string(),
  password: Yup.string(),
});

interface IUserFormProps {}

const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {
  const { operation, selectedUser, loadUsers, onClose, open } =
    React.useContext(UserContext);
  // const to store base64 image url
  const [profilePic, setProfilePic] = React.useState<string>(
    "https://img.freepik.com/premium-vector/man-character_665280-46970.jpg"
  );
  const [avatar, setAvatar] = React.useState<File>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: {
        first: "",
        last: "",
      },
      mobile: "",
      email: "",
      status: 1,
      role: "admin",
      password: "",
      ...selectedUser,
    },
    resolver: yupResolver(userSchema),
  });

  const handleImageChange = ({ file, base64 }: IFileData) => {
    if (file) setAvatar(file);
    if (base64) setProfilePic(base64);
  };

  const handleAddEditUser = (user: any) => {
    console.log("User:", { user, avatar });
    const fd = new FormData();

    if (user?.name?.first) fd.append("name.first", user?.name?.first);
    if (user?.name?.last) fd.append("name.last", user?.name?.last);
    if (user?.mobile) fd.append("mobile", user?.mobile);
    if (user?.email) fd.append("email", user?.email);
    if (user?.password) fd.append("password", user?.password);
    if (user?.status >= 0) fd.append("status", user?.status);
    if (user?.role) fd.append("role", user?.role);
    if (avatar) fd.append("avatar", avatar);

    if (operation == "edit") {
      //update the user
      UserService?.updateUser(selectedUser?._id as string, fd)
        .then((response) => {
          const message = response?.data?.message || "User updated";
          successMessage(message);
          loadUsers();
          onClose();
        })
        .catch((error) => {
          console.error(error);
          const message = error?.response?.data?.message || "User not Updated";
          errorMessage(message);
        });
    } else {
      //create the user
      UserService?.createUser(fd)
        .then((response) => {
          const message = response?.data?.message || "User Created";
          successMessage(message);
          loadUsers();
          onClose();
        })
        .catch((error) => {
          console.error(error);
          const message = error?.response?.data?.message || "User bot created ";
          errorMessage(message);
        });
    }
  };

  React.useEffect(() => {
    if (selectedUser?.avatar) {
      const url = `${endpoints?.serverBaseUrl}/${selectedUser?.avatar}:${profilePic}`;
      setProfilePic(url);
    }
  }, [selectedUser]);
  return (
    <Container>
      <Card
        sx={{ p: 2 }}
        component="form"
        onSubmit={handleSubmit(handleAddEditUser)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              {...register("name.first")}
              error={
                touchedFields?.name?.first && errors?.name?.first ? true : false
              }
              helperText={
                touchedFields?.name?.first && errors?.name?.first
                  ? errors?.name?.first?.message
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              {...register("name.last")}
              error={
                touchedFields?.name?.last && errors?.name?.last ? true : false
              }
              helperText={
                touchedFields?.name?.last && errors?.name?.last
                  ? errors?.name?.last?.message
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="mobile"
              {...register("mobile")}
              error={touchedFields?.mobile && errors?.mobile ? true : false}
              helperText={
                touchedFields?.mobile && errors?.mobile
                  ? errors?.mobile?.message
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              {...register("email")}
              error={touchedFields?.email && errors?.email ? true : false}
              helperText={
                touchedFields?.email && errors?.email
                  ? errors?.email?.message
                  : ""
              }
            />
          </Grid>
          {operation != "edit" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                {...register("password")}
                error={
                  touchedFields?.password && errors?.password ? true : false
                }
                helperText={
                  touchedFields?.password && errors?.password
                    ? errors?.password?.message
                    : ""
                }
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="level-label">Status</InputLabel>
                <Controller
                  name="status"
                  // id="status"
                  defaultValue={selectedUser?.status}
                  control={control}
                  render={({ field }) => (
                    <Select labelId="level-label" {...field}>
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>Inactive</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText error={errors?.status && touchedFields?.status}>
                  {errors.status?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
              
                sx={{
                  maxWidth: 150,
                  maxHeight: 150,
                  position: "relative",
                  boxShadow: "0 0 3px #999",
                  margin: 1,
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  alt="profile avatar"
                  src={profilePic}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    bgcolor: "GrayText",
                  }}
                >
                  <label htmlFor="avatar">
                    <EditIcon />
                  </label>
                </IconButton>

                <FileChooser
                  id="avatar"
                  accept=".jpg,.jpng,.png,.webp"
                  onChange={handleImageChange}
                  requireBase64={true}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                {operation == "edit" ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default UserForm;
