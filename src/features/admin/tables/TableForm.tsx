import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from 'react-hook-form';
import TableService from '../../../services/TableService';
import { errorMessage, successMessage } from '../../../shared/ui/toasts/Toasts';
import TableContext from './TableContext';
import endpoints from '../../../api/endpoints';


//table validation schema
const tableSchema = Yup.object().shape({
    type: Yup.string(),
    tableNo: Yup.number().min(1).max(1000),
    capacity: Yup.number().min(1).max(100),
    status:   Yup.number().min(0).max(10),
    
        
});

interface ITableFormProps{
}

const TableForm: React.FunctionComponent<ITableFormProps> = (props) =>{

const {operation,selectedTable,loadTables,onClose} = React.useContext(TableContext);
const {register, handleSubmit, control, formState:{errors,touchedFields},
} = useForm({
    defaultValues:{        
        ...selectedTable,
    },
    resolver: yupResolver(tableSchema),
});

const handleAddEditTable = ({type,capacity,status,tableNo}: any)=>{
// console.log("table: ",{...table,avatar });
const table = {type,capacity,status,tableNo};
console.log("Table: ",table);
    if(operation == "edit"){
        //update the table
        TableService?.updateTable(selectedTable?._id as string, table)
        .then((response)=>{
            const message = response?.data?.message || "table Updated"
            successMessage(message)
            loadTables();
            onClose();
        })
        .catch((err)=>{
            console.error(err);
            const message = err?.response?.data?.message || "table not  Updated";
            errorMessage(message)
            
        });
    }  else{
        //create the table
        TableService?.createTable(table)
        .then((response)=>{
            const message = response?.data?.message || "table Created";
            successMessage(message);
            loadTables();
            onClose();
            

        })
        .catch((err)=>{
            console.error(err);
            const message = err?.response?.data?.message || "table not  created";
            errorMessage(message);
            
        });
    }
    
};


return (
<Container>
    <Card sx={{p:2}} component="form" onSubmit={handleSubmit(handleAddEditTable)}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                variant='outlined'
                label="Type"
                {...register("type")}
                error={errors?.type && touchedFields?.type ? true:false }
                helperText={<span>{ touchedFields?.type && errors?.type?.message}</span>}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                variant='outlined'
                type='number'
                label="Seating Capacity"
                {...register("capacity")}
                error={errors?.capacity && touchedFields?.capacity ? true:false }
                helperText={<span>{ touchedFields?.capacity && errors?.capacity?.message}</span>}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                variant='outlined'
                label="Table No"
                type='number'
                {...register("tableNo")}
                error={errors?.tableNo && touchedFields?.tableNo ? true:false }
                helperText={<span>{ touchedFields?.tableNo && errors?.tableNo?.message}</span>}
                />
                </Grid>
               
                <Grid item xs={12}>
               <FormControl fullWidth>
                <InputLabel id="level-label">Status</InputLabel>
                <Controller
                name="status"
                // id="status"
                defaultValue={selectedTable?.status}
                control={control}
                render={({ field:{onChange,value} })=>(
                    <Select name='status' onChange={onChange} value={value}>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                    </Select>
                )}
                />
               </FormControl>
               </Grid>


               {/* <Grid item xs={12}>
                <Box sx={{
                    maxWidth:150,
                    maxHeight:150,
                    position:"relative",
                    boxShadow:"0 0 3px 1px #9999",
                    margin:1

                }}>
                    <img style={{width:"100%",height:"100%"}} src={profilePic? profilePic:"https://cdn-icons-png.flaticon.com/512/3682/3682281.png"}/>
                                <IconButton sx={{position:"absolute",bottom:1,right:1,bgcolor:"GrayText"}}>
                                    <label htmlFor='avatar'>
                                        <EditIcon/>
                                    </label>
                                </IconButton>
                                <input id="avatar" style={{display:"none"}} type='file' accept='.jpg,.jpeg,.png,.webp' {...register("avatar")} onChange={handleImageChange}/>
                </Box>
                </Grid> */}
                <Grid item xs={12}>
                    <Button variant='contained' type='submit'>{ operation == "edit" ? "Update" : "Create" }</Button>
                </Grid>
        </Grid>

    </Card>
</Container>
);
};
export default TableForm;

