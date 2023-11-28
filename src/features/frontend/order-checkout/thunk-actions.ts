import { AppDispatch, RootState } from "../../../app/store" ;
import OrderService from "../../../services/OrderService";
import { updateOrder as updateOrderAction,addNewOrder, addAll} from "../../../app/slices/orderSlice";
import Order from "../../../shared/models/OrderModel";
import { errorMessage, successMessage } from "../../../shared/ui/toasts/Toasts";
import orderSlice from "../../../app/slices/orderSlice";

export const updateOrder: (id:string, order:any) => any = (
id: string,
order: any
    ): any => {   
    return async (dispatch: AppDispatch) => {
        
// update the order from Server...
if (id) 
await OrderService?.updateOrder(id, order)
.then(({ data }) => {
    const message = data?.message;
    successMessage(message);
    //update the redux state
    const order = data?.data;

if(order){
    dispatch(updateOrderAction({id: order?._id, order }));
}

})
.catch((err)=>{
    console.error(err);
    const message = err?.response?.data?.message;
    errorMessage(message);

    
});
    };
};

export const createOrder: (order:Order)=> any = (order: Order)=>{
    return async (dispatch: AppDispatch) => {
    
// update the order from Server...
 OrderService?.createOrder(order)
 .then(({data}) => {
    const message = data?.message;
    successMessage(message);
    dispatch(addNewOrder(data?.data));
 })
 .catch((err) =>{
    console.error(err);
    const message = err?.response?.data?.message;
    errorMessage(message);    
 });
};
};

export const loadAllOrders: (query: string) => any = (query:string): any => {
    return async (dispatch: AppDispatch) => {
    
// update the order from Server...
 await OrderService?.fetchAllOrder(query)

 .then(({data}) => {
    //update the redux state
    const orders = data?.data;
    if(orders){
        dispatch(addAll(orders));
        }
 })
 .catch((err) =>{
    console.error(err);
   
 });
};
};

