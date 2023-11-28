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
import FileChooser,
{IFileData
} from '../../../shared/ui/file-chooser/FileChooser';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import {useForm, Controller,FieldValues} from "react-hook-form";
import Dish from "../../../shared/models/DishModel";
import endpoints from '../../../api/endpoints';
import DishService from '../../../services/DishService';
import { errorMessage, successMessage } from '../../../shared/ui/toasts/Toasts';
import DataService from '../../../services/DataService';
import { config } from 'process';


interface IDishFormProps{
  selectedDish: Dish;
  operation: string;
}

const DishForm: React.FunctionComponent<IDishFormProps> = ({
    selectedDish,
    operation,

}) =>{
    const [picture,setPicture] = React.useState<IFileData>({});
    const [configData,setConfigData] = React.useState({
        type:["veg","nonveg"],
        category: [],
    });

    const {register,handleSubmit,control,setValue} = useForm({
        defaultValues:{
            ...selectedDish,
        },
    });
    const loadData = async (fields: string[])=>{
        if(fields?.length > 0){
            const response = await DataService?.fetchAllData(
                `?q=${fields?.join(",")}`

            );
            setConfigData((config)=>({
                ...config,
                ...response?.data?.data
            }));
        }
    };
    React.useEffect(()=>{
        loadData(["category","type"]);
    },[]);

    const handleDish =({
        name,
        price,
        qty,
        description,
        type,
        category,
        status,
        timeToPrepare,
    }: FieldValues)=>{
        const fd = new FormData();
        if(name) fd.append("name",name);
        if(price) fd.append("price",price);
        if(qty) fd.append("qty",qty);
        if(description) fd.append("description",description);
        if(type) fd.append("type",type);
        if(category) fd.append("category",category);
        if(status) fd.append("status",status);
        if(timeToPrepare) fd.append("timeToPrepare",timeToPrepare);
        if(picture?.file) fd.append("picture",picture?.file);

        if(operation == "edit"){
            if(selectedDish?._id)
            DishService?.updateDish(selectedDish?._id, fd)
          .then((response)=>{
            const message = response?.data?.message;
            successMessage(message);

          })
          .catch((err)=>{
            console.error(err);
            const message = err?.response?.data?.message;
            errorMessage(message);  
          });
        }else{
            DishService?.createDish(fd)
            .then((response)=>{
            const message = response?.data?.message;
            successMessage(message);

            })
            .catch((err)=>{
                console.error(err);
                const message = err?.response?.data?.message;
                errorMessage(message);  
              });

        }
    };
    const handleImage = (data: IFileData) =>{
        setPicture(data);

    };
    React.useEffect(() => {
        setPicture((pic) => ({
            ...pic,
            base64: selectedDish?.picture
            ? `${endpoints?.serverBaseUrl}/${selectedDish?.picture}`
            : "https://besttastechinesesk.com/img/placeholders/grey_fork_and_knife.png",


        }));

        for(const p of Object.keys(selectedDish)) {
            setValue(p, selectedDish[p]);

        }
    },[selectedDish]);
    

    return(
        <Container maxWidth="xl">
            <Paper sx={{ p:3 }} component="form" onSubmit={handleSubmit(handleDish)}>
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} md={6}>
<Card sx={{ p:3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>

            <TextField
            fullWidth
            variant='outlined'
            label="Name"
            {...register("name")}

            />
            </Grid>

            <Grid item xs={12}>
            <TextField
            fullWidth
            variant='outlined'
            label="Quantity"
            {...register("qty")}
            
            />
            </Grid>

            <Grid item xs={12}>
                <TextField
                fullWidth
                variant='outlined'
                label="Price"
                type='number'
                {...register("price")}
                />
                </Grid>
                
                <Grid item xs={12}>
                <TextField
                fullWidth
                variant='outlined'
                type='number'
                label="Required Time"
                {...register("timeToPrepare")}

                />
                </Grid>

                <Grid item xs={12} md={6}>
               <FormControl fullWidth>
                <InputLabel id="level-label">Category</InputLabel>
                <Controller
                name="category"
                defaultValue={selectedDish?.category}
                control={control}
                render={({ field: {onChange,value} })=>(
                    <Select name='category' onChange={onChange} value={value} disabled={configData?.category?.length == 0}>
                        {Array.isArray(configData?.category) &&
                        configData?.category?.map((cat,i)=>(
                            <MenuItem
                            key={cat + i}
                            value={cat}
                            sx={{ textTransform:"capitalize"}}>
                            {cat}
                            </MenuItem>
                        ))}
                    </Select>)}
                    />
                    </FormControl>
</Grid>


                       {/* <MenuItem value="beverages">Beverages</MenuItem>
                        <MenuItem value="chinese">Chinese</MenuItem>
                        <MenuItem value="dessert">Dessert</MenuItem>
                        <MenuItem value="fastFood">Fast Food</MenuItem>
                        <MenuItem value="main">Main</MenuItem>
                        <MenuItem value="southIndian">South Indian </MenuItem>
                        <MenuItem value="starter">Starter </MenuItem>
                )}
                />
               </FormControl>
               </Grid>  */}

               <Grid item xs={12} md={6}>
               <FormControl fullWidth>
                <InputLabel id="level-label">Veg/Non Veg</InputLabel>
                <Controller
                name="type"
                defaultValue={selectedDish?.type}
                control={control}
                render={({ field:{onChange,value} })=>(
                    <Select name='veg/nonveg' onChange={onChange} value={value}>
                        {Array.isArray(configData?.type) &&
                        configData?.type?.map((typ,i)=>(
                            <MenuItem
                            key={typ + i}
                            value={typ}
                            sx={{ textTransform:"capitalize"}}>
                            {typ}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                />
               </FormControl>
               </Grid>
                
                <Grid item xs={12} md={6}>
               <FormControl fullWidth>
                <InputLabel id="level-label">Status</InputLabel>
                <Controller
                name="status"
                // id="status"
                defaultValue={selectedDish?.status}
                control={control}
                render={({ field:{onChange,value} })=>(
                    <Select name='status' onChange={onChange} value={value}>
                        <MenuItem value={1}>Available</MenuItem>
                        <MenuItem value={0}>Not Available</MenuItem>
                    </Select>
                )}
                />
               </FormControl>
               </Grid>

               
                
        </Grid>




 </Card>
 </Grid>

 <Grid item xs={12} md={6}>
 <Card sx={{ p:3 }}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
             fullWidth
             variant='outlined'
             label="Description"
             multiline
             rows={3}
             {...register("description")}
            />

        </Grid>
        <Grid item xs={12}>
            <Box
            sx={{
                p:1,
                border: "1px solid #000",
                width:200,
                height:200,

            }}
            >
                <img
                style={{width: "100%", height: "100%"}}
                    src={picture?.base64}/>

            </Box>
            <Button type='button'>
                <label htmlFor='picture'>Change</label>
            </Button>
            <FileChooser
            id="picture"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImage}
            requireBase64={true}
            
            />
            </Grid>
               
                <Grid item xs={12} md={6}>
                        <Button type='submit' variant='contained' fullWidth>
                            {operation == "edit" ? "Update" : "Create"}
                        </Button>
                    </Grid>
                  </Grid>
                  </Card>
                  </Grid>
                  </Grid>
            </Paper>

        </Container>
    );
        };
export default DishForm;