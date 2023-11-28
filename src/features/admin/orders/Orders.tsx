import * as React from "react";
import OrderService from "../../../services/OrderService";
import Order from "../../../shared/models/OrderModel";
import User from "../../../shared/models/UserModel"
import UserService from "../../../services/UserService";
import { Container, Grid } from "@mui/material";
import OrderItem from "./OrderItem";
import { loadAllOrders } from "../../frontend/order-checkout/thunk-actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { selectOrders } from "../../../app/slices/orderSlice";
interface IDashboardProps {}

const Orders: React.FunctionComponent<IDashboardProps> = (props) => {
  const dispatch = useDispatch();
  const [selectedChef,setSelectedChef] = React.useState<string>();
  const [isOrderAccepted,setIsOrderAccepted] = React.useState<boolean>(false);
  // const [rawOrders,setRawOrders] = React.useState<Order[]>();
  const [users, setUsers] = React.useState<User[]>([]);

const rawOrders = useSelector(selectOrders);


  // get chef id from order item
  const getChef = (id: string) => {
    setSelectedChef(id);
  };

//   const loadOrders = async (query: string)=>{
// const {data} = await OrderService?.fetchAllOrder( query );
// console.log("Data: ", data);
//      if(data?.data) setRawOrders(data?.data);
//   };

  const loadUsers = async(query: string)=>{
    const { data } = await UserService?.fetchAllUser(query);
    if(data?.data) setUsers(data?.data);

    // dispatch(loadAllOrders("?status=0,1"));
    
  };

  // to modify dish status
  const modifyDish = (orderId: string, itemId: string ,status: number,
    callback?: ()=>void)=>{
  // get an order by _id
  const query = `?itemId=${itemId}&status=${status}`;
  console.log("modifyDish");

  OrderService?.updateOrder(orderId,{ chef: selectedChef },query)
  .then(({ data }) => {
    if(status==1){
      //order is accepted
      // setIsOrderAccepted(true);

    }
   dispatch(loadAllOrders("?status=0,1"));
   if(typeof callback == "function") callback();

  })
  .catch((err)=>{
    console.error(err);

  });
  };

  React.useEffect(()=>{
    // loadOrders("?status=0,1");
    dispatch(loadAllOrders("?status=0,1"));
    loadUsers("?status=1&role=admin");

  },[]);

  const handleOrderReject = (orderId:string,itemId:string)=>{
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
        
        modifyDish(orderId,itemId, 2,()=>dispatch(loadAllOrders("?status=0,1")));
        
      }
    });
  };

  
  return (
<Container>
<Grid container spacing={2}>
  {Array.isArray(rawOrders)&&
  rawOrders?.map((order)=>{
  const { tableNo, items } = order;
  return (
      
        items?.length <=0 ? <h4> order dishes are not available</h4>:
      

    Array.isArray(items) &&
    items?.filter((item)=>item?.status != 2 && item?.status != 3 )
    .map((item,index)=>(
      <Grid item xs={12} key={item?.dish?._id}>
        <OrderItem
        tableNo={tableNo}
        qty={item?.qty}
        image={item?.dish?.picture}
        name={item?.dish?.name}
        timeToPrepare={item?.dish?.timeToPrepare}
        users={users}
        status={item?.status}
        selectedChef={selectedChef as string}
        getChef={getChef}
        handleAccept={()=>
          modifyDish(order?._id as string, item?._id as string, 1)
        }
        
        handleReject = {()=>handleOrderReject(order?._id as string,item?._id as string )}          
        handleCompleted = {()=>
          modifyDish(order?._id as string,  item?._id as string, 3)
          
        }
        />
        </Grid>

    ))
  )

  })}

</Grid>
    </Container>

);
  
};

export default Orders;






// import * as React from "react";
// import OrderService from "../../../services/OrderService";
// import Order from "../../../shared/models/OrderModel";
// import User from "../../../shared/models/UserModel";
// import UserService from "../../../services/UserService";
// import { Container, Grid } from "@mui/material";
// import OrderItem from "./OrderItem";
// import { loadAllOrders } from "../../frontend/order-checkout/thunk-actions";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { selectOrders } from "../../../app/slices/orderSlice";
// interface IDashboardProps {}

// const Orders: React.FunctionComponent<IDashboardProps> = (props) => {
//   const dispatch = useDispatch();
//   const [selectedChef, setSelectedChef] = React.useState<string>();
//   //const [rawOrders, setRawOrders] = React.useState<Order[]>();
//   const [users, setUsers] = React.useState<User[]>([]);
//   const [isOrderAccepted, setIsOrderAccepted] = React.useState<boolean>(false);
//   const rawOrders = useSelector(selectOrders);
//   // get chef id from order item
//   const getChef = (id: string) => {
//     setSelectedChef(id);
//   };

//   // const loadOrders = async (query: string) => {
//   //   const { data } = await OrderService?.fetchAllOrder(query);
//   //   console.log("Data: ", data);
//   //   if (data?.data) setRawOrders(data?.data);
//   // };

//   const loadUsers = async (query: string) => {
//     const { data } = await UserService?.fetchAllUser(query);
//     if (data?.data) setUsers(data?.data);
//   };

//   // to modify dish status
//   const modifyDish = (
//     orderId: string,
//     itemId: string,
//     status: number,
//     callback?: () => void
//   ) => {
//     // get an order by _id
//     const query = `?itemId=${itemId}&status=${status}`;
//     console.log("modifyDish");

//     OrderService?.updateOrder(orderId, { chef: selectedChef }, query)
//       .then(({ data }) => {
//         if (status == 1) {
//           //order is accepted
//           setIsOrderAccepted(true);
//         }
//         dispatch(loadAllOrders("?status=0,1"));
//         if (typeof callback == "function") callback();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   React.useEffect(() => {
//     //loadOrders("?status=0,1");
//     dispatch(loadAllOrders("?status=0,1"));

//     loadUsers("?status=1&role=admin");
//   }, []);
//   const handleOrderReject = (orderId: string, itemId: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         modifyDish(orderId, itemId, 2, () =>
//           dispatch(loadAllOrders("?status=0,1"))
//         );
//       }
//     });
//   };
//   return (
//     <Container>
//       <h1>ggggg</h1>
//       <Grid container spacing={2}>
//         {Array.isArray(rawOrders) &&
//           rawOrders?.map((order) => {
//             const { tableNo, items } = order;
//             return items?.length <= 0 ? (
//               <h4>order dishes not available</h4>
//             ) : (
//               Array.isArray(items) &&
//                 items
//                   ?.filter((item) => item?.status != 2 && item?.status != 3)
//                   .map((item, index) => (
//                     <Grid item xs={12} key={item?.dish?._id}>
//                       <OrderItem
//                         tableNo={tableNo}
//                         qty={item?.qty}
//                         image={item?.dish?.picture}
//                         name={item?.dish?.name}
//                         timeToPrepare={item?.dish?.timeToPrepare}
//                         status={item?.status}
//                         users={users}
//                         selectedChef={selectedChef as string}
//                         getChef={getChef}
//                         handleAccept={() =>
//                           modifyDish(
//                             order?._id as string,
//                             item?._id as string,
//                             1
//                           )
//                         }
//                         handleReject={() =>
//                           handleOrderReject(
//                             order?._id as string,
//                             item?._id as string
//                           )
//                         }
//                         handleCompleted={() =>
//                           modifyDish(
//                             order?._id as string,
//                             item?._id as string,
//                             3
//                           )
//                         }
//                       />
//                     </Grid>
//                   ))
//             );
//           })}
//       </Grid>
//     </Container>
//   );
// };

// export default Orders;