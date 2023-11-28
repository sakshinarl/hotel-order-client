import Dish from "./DishModel";
import User from "./UserModel";

interface Item {
    dish: Dish;
    qty: number;
    status: number;
    _id?: string;
    chef?: User;
}
interface Order {
    _id?:string;
    tableNo: number;
    status: number;
    items: Item[];

}
 export default Order;