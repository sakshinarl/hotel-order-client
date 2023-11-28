import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TableContext from "./TableContext";
import TableForm from "./TableForm";
interface IAddEditTableProps{

}

const  AddEditTable: React.FunctionComponent<IAddEditTableProps> = ({})=>{
    const {open,onClose,operation}= React.useContext(TableContext)
    return (
    <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle> {operation=="add"?"Add":"Edit"} Table  </DialogTitle>
            <DialogContent>
                <TableForm/>
            </DialogContent>
       
    </Dialog>
    </>
    );
};
export default AddEditTable;
