import * as React from "react";
import IconButton  from "@mui/material/IconButton";
import EditIcon  from "@mui/icons-material/Edit";
import DeleteIcon  from "@mui/icons-material/Delete";
import UserService from "../../../services/UserService";
import MuiDatatable, { MUIDataTableColumn } from "mui-datatables"
import User from "../../../shared/models/UserModel";
import endpoints from "../../../api/endpoints";
import UserContext from "./UserContext";
import AddEditUser from "./AddEditUser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

interface IUserProps {}

const Users: React.FunctionComponent<IUserProps> = (props) => {
  //states
  const [data,setData] = React.useState<User[]>([])
  const [openDialog,setOpenDialog] = React.useState<boolean>(false)
  const [operation,setOperation] = React.useState<string>("add")
  const [selectedUser,setSelectedUser] = React.useState<User>({})

  //executes when the dialog is close
  const handleDialogClose = ()=>{
    setOpenDialog(false)

  }

  //loads all users
  const loadUsers = async ()=>{
    const {data} = await UserService.fetchAllUser()
    if(data) setData(data?.data)

  }

  const addUser = ()=>{
    setOperation("add")
    setSelectedUser({})
    setOpenDialog(true)
  }
  const editUser = (u:User)=>{
    setOperation("edit")
    setSelectedUser(u)
    setOpenDialog(true)
  }
  const deleteUser = (id:string)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService?.deleteUser(id)
          .then((response) => {
            const message = response?.data?.message || "User Delete";
            Swal.fire("Deleted!", message, "success");
            loadUsers();
          })
          .catch((err) => {
            const message = err?.response?.data?.message || "User deleted";
            Swal.fire("Not Deleted!", message, "error");
          });
      }
    });
  };
  

  React.useEffect(()=>{
    loadUsers();
  },[])

const columns:MUIDataTableColumn[] = [
  // {
  //   name:"userId",
  //   label:"ID"
  // },
  

  {
    name:"avatar",
    label:"Avatar",
    options:{
      customBodyRenderLite(dataIndex, rowIndex){
        const u = data[dataIndex]
        return <img src={`${endpoints?.serverBaseUrl}/${u?.avatar}`} style={{width:80,height:80}}/>
      },
    }
  },
  {
    name:"name",
    label:"Name",
    options:{
      customBodyRenderLite(dataIndex, rowIndex){
        const u = data[dataIndex]
        return `${u?.name?.first} ${u?.name?.last}`
      },
    }
  },
  {
    name:"mobile",
    label:"Mobile",
    options:{
      sort:false,
      filter:false
    }
  },
  {
    name:"status",
    label:"Status",
    options:{
      customBodyRender(status:number){
       
         return status == 1?"Active":"Inactive" 
      },
    }
  },

  {
    name:"action",
    label:"Action",
    options:{
      customBodyRenderLite(dataIndex){
        const u = data[dataIndex]
        return <>
        <IconButton color="primary" onClick={()=>editUser(u)}>
          <EditIcon/>
        </IconButton>
        <IconButton color="error" onClick={()=> deleteUser(u?._id as string)}>
         <DeleteIcon/>
        </IconButton>
        </>
      },
    }
  },
]
  return (
    <>
     <UserContext.Provider value={{
      open:openDialog,
      onClose:handleDialogClose,
      operation,
      selectedUser,
      loadUsers,

     }}>
      <AddEditUser/>
      </UserContext.Provider>
      <MuiDatatable title={<Box><Button onClick={addUser} color="secondary" variant="contained">New + </Button>User List</Box>} data={data} columns={columns} />
    </>
  );
};

export default Users;


