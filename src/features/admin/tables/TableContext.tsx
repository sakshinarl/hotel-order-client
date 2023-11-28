import {createContext} from "react";
import Table from "../../../shared/models/TableModel";

export const defaultTable =()=>({
  type:"",
  tableNo:0,
  capacity:0,
  status:1,
  createdAt:"",
  _id:"",
});

interface ITableContext{
    open:boolean;
    operation:string;
    onClose:(e?: any) => void;
    loadTables: () => void;
    selectedTable: Table;

}
 const TableContext = createContext<ITableContext>({
    open:false,
    operation:"add",
    onClose:()=>{},
    loadTables:()=>{},
    selectedTable: defaultTable(),

 });

 export default TableContext;