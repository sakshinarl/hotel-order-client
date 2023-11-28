import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import UserContext from "./UserContext";
import UserForm from "./UserForm";
interface IAddEditUserProps{

}

const  AddEditUser: React.FunctionComponent<IAddEditUserProps> = ({})=>{
    const {open,onClose,operation}= React.useContext(UserContext)
    return <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle> {operation=="add"?"Add":"Edit"} User  </DialogTitle>
            <DialogContent>
                <UserForm/>
            </DialogContent>
       
    </Dialog>
    </>
};
export default AddEditUser;
