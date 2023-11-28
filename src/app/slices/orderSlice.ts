import { createSlice } from "@reduxjs/toolkit";
import Order from "../../shared/models/OrderModel";
import { RootState } from "../store";
import Dish from "../../shared/models/DishModel";

const initialState: Order[] = [];

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    addAll: (state,{payload}) => payload,

    //this will be used a new order is created at server side
    addNewOrder(state,{payload}){
      //state is array of order
      //remove existing order of current tableno if available
      const orders = state?.filter((o) => o?.tableNo != payload?.tableNo);
      //add new order
      return [...orders, payload];

    },
    cancelOrder: (state,{payload:{ tableNo }})=>{
      return state?.filter((order)=> order?.tableNo != tableNo);

    },

    //to add a dish in the order
    addItem:(state,{payload})=>{
      const {tableNo,status,item} = payload;
      //clone the state
      const newState = [...state];

      //get the index of an order to update an item based on tableno
      const orderIndex = newState && newState?.findIndex((order)=> order?.tableNo === tableNo);

      //order is not available,then add new order
      if(orderIndex == -1 && item){
        //add new order
        newState.push({
          tableNo,
          status:0,
          items: [item],

        });
      }else{
        //check whether the dish is already available, if available then increment 'qty' by 1
        //otherwise add new dish

        //get an order based on index
        const newOrder = {...newState[orderIndex] };

        //clone an array of order items/dishes
        const dishes = [...newOrder.items];

        //get the index of a dish in the order
        const dishIndex = dishes?.findIndex(
          ({ dish }) => dish?._id == item?.dish?._id
        );

        //if a dish already exists
        if(dishIndex != -1){
        //access single dish
        const dish =  { ...dishes[dishIndex]};
      //increment qty of existing dish
      if(dish && dish?.qty){
        dish.qty += 1;

        //replace the existing dish after changes

       dishes?.splice(dishIndex,1,dish);
      }
      newOrder.items = [...dishes];


      }else{
        //add new dish in the order
        dishes?.push(item);
        newOrder.items = dishes;

      }
      newState?.splice(orderIndex,1,newOrder);


      }
      return newState;

    },
    removeItem: (state, { payload }) => {
      const { tableNo , dish , isDelete} = payload;

      console.log("Payload: ",payload);

      //clone the state
      const newState = [...state];

      //get order index by table number
      const orderIndex = newState?.findIndex((o) => o?.tableNo == tableNo);
      //get order by index
      const order = {...newState?.at(orderIndex) };
      //get order item index by dish id

      const dishIndex = 
      order && order?.items?.findIndex((i) => i?.dish?._id == dish?._id);

      // console.log("order index: ",dishIndex);
      //if dish exists
      if(dishIndex != undefined && dishIndex != -1){
        //decrement quantity by 1

        //get the order dish by index
        const dishItem = order?.items?.at(dishIndex);

        //if quantity is greater than 1 and isDelete is false decrement quantity by 1
        if(dishItem && dishItem.qty && dishItem.qty > 1 && !isDelete){
          dishItem.qty = dishItem?.qty - 1;
          order?.items?.splice(dishIndex,1,dishItem);
          //if isdelete is true or quantity is less than or equals to 1 then remove dishItem
        
        }else if(isDelete || (dishItem && dishItem?.qty  && dishItem?.qty <= 1)){
          //remove dish from order
          order?.items?.splice(dishIndex, 1);
        }
      }  
    },

    updateOrder: (state,{payload:{id,order}} )=>{
      const ind = state && state?.findIndex((o)=> o._id == id);
      if(ind != -1) state?.splice(ind, 1, order);


    },
  },
});

export const { addItem, removeItem,updateOrder,addNewOrder,cancelOrder,addAll} = orderSlice?.actions;
export const selectOrders = (state: RootState) => state?.orders;
export default orderSlice?.reducer;
