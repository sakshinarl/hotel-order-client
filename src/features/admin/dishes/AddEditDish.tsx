import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link, useParams } from "react-router-dom";
import DishForm from "./DishForm";
import Dish from "../../../shared/models/DishModel";
import DishService from "../../../services/DishService";


const defaultDish =()=>({
  type:"",
  category:"",
  description:"",
  dishId:0,
  name:"",
  picture:"",
  price:0,
  qty:"",
  status:0,
  timeToPrepare:0,

});

interface IAddEditDishProps {}

const AddEditDish: React.FunctionComponent<IAddEditDishProps> = (props) => {
  const { operation, id} = useParams();
  const [selectedDish,setSelectedDish] = React.useState<Dish>(defaultDish());
const loadDish = async (id:string)=>{
  const response = await DishService.fetchOneDish(id)
  if(response?.data?.data) setSelectedDish(response?.data?.data);

};
  React.useEffect(()=>{
if(operation == "edit" && id){
  loadDish(id);

}else{
  setSelectedDish(defaultDish());
}

  },[operation,id])
  return (
    <Container maxWidth="xl">
<Grid container>
<Grid item xs={12}>
<Card
sx={{
  bgcolor: (theme)=>theme.palette.secondary.main,
  color: (theme)=>theme.palette.secondary.contrastText,
  py: 1,
  px: 3,
  display:"flex",
  justifyContent:"space-between",
  
}}>
  <span style={{textTransform:"capitalize",fontSize:"1.5em"}}>{operation} Dish </span>
  <Link style={{color: "#fff"}} to="/secured/dishes">Dish List</Link>
</Card>
  </Grid>


<Grid item xs={12}>
<DishForm selectedDish={selectedDish}
operation={operation ? operation : "add"}


/>
</Grid>
</Grid>
    </Container>
  
  );
};

export default AddEditDish;
