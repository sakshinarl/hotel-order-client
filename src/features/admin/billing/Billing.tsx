import * as React from 'react';

import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TableDropDown from '../../menus/TableDropDown';
import { Paper } from '@mui/material';
import Order from '../../../shared/models/OrderModel';
import OrderService from '../../../services/OrderService';

interface IBillingProps {
}

const Billing: React.FunctionComponent<IBillingProps> = (props) => {

    const [selectedTable,setSelectedTable] = React.useState<number>();
    // fetch order based on tableno and order status
    const [currentOrder,setCurrentOrder] = React.useState<Order>();
    const loadOrder = async () =>{
    const {data} = await OrderService?.fetchOneOrder(`?status=0&tableNo=${selectedTable}`);
    
    const order = data?.data

    if(order){
        const items = order?.items
        .filter((item:any)=>item?.status == 3).map((item:any)=>{
            return {name:item?.dish?.name, price:item?.dish?.price, qty:item?.qty};

        });
        order.items = items;
        setCurrentOrder(order);
    }
};
React.useEffect (()=>{
    loadOrder();

},[selectedTable]);




    const getTable = (table: number) => {
        setSelectedTable(table);

    };

    const columns : MUIDataTableColumnDef[] = [
        {
            name:"name",
            label:"Particular",          
        },
        {
            name:"qty",
            label:"Quantity",          
        },
        {
            name:"price",
            label:"Price",          
        },
        {
            name:"subTotal",
            label:"Sub Total",          
        },
     ];

  return (
      <Container>
    <Card sx={{p:2,bgcolor:(theme) => theme.palette.secondary.main}}>
        <TableDropDown getTable={getTable}/>
    </Card>
    <Paper>
       
<MUIDataTable title="Billing" columns={columns} data={Array.isArray(currentOrder?.items)?currentOrder?.items: []} />
    </Paper>
  </Container>

  );
};

export default Billing;
