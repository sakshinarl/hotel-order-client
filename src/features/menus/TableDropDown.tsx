// import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select,{ SelectChangeEvent } from "@mui/material/Select";
// import TableService from "../../services/TableService";
// import Table from "../../shared/models/TableModel";

// interface ITableDropDownProps{
//     getTable(table: number): void;
// }
// const TableDropDown: React.FunctionComponent<ITableDropDownProps> = ({
// getTable,

// })=>{
//  const [tableData, setTableData] = React.useState<Table[]>([]);
//  const loadTables = async () =>{
//     const { data } = await TableService?.fetchAllTable();
//     if(data?.data) setTableData(data?.data);

//  };
//  React.useEffect(() => {
//     loadTables();

//  },[]);

//  const handleChange = (e: SelectChangeEvent<HTMLInputElement>) => {
//     getTable(e?.target?.value as unknown as number);
//  };
//  return (
//     <>
//     <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Table</InputLabel>
//         <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         label="Table"
//         onChange={handleChange}
//         >
//             {Array.isArray(tableData) &&
//             tableData?.map((tbl)=>{
//                 <MenuItem key={tbl?._id} value={tbl?.tableNo}>
//                     {`${tbl?.tableNo} - ${tbl?.type} (${tbl?.capacity})`}
//                 </MenuItem>
//             })}
//         </Select>

//     </FormControl>
//     </>
//  );

// };
// export default TableDropDown;


import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TableService from "../../services/TableService";
import Table from "../../shared/models/TableModel";
import { useForm, Controller } from "react-hook-form";
import { FormLabel } from "@mui/material";

interface ITableDropDownProps {
  getTable(table: number): void;
}

const TableDropDown: React.FunctionComponent<ITableDropDownProps> = ({
  getTable,
}) => {
  const { register, control } = useForm(); 
  const [tableData, setTableData] = React.useState<Table[]>([]);
  const [selectedTable, setSelectedTable ] = React.useState<any>(0);

  const loadTables = async () => {
    const { data } = await TableService?.fetchAllTable();
    if (data?.data) setTableData(data?.data);
  };

  const updateTableNumber = (num: number) => {
    getTable(num);
    localStorage.setItem("selectedTable",num.toString());
    setSelectedTable(num);

  };


  React.useEffect(() => {
    loadTables();
    const tableNo = localStorage.getItem("selectedTable");
    if(tableNo) updateTableNumber(parseInt(tableNo));
    
  }, []);

  const handleChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    const num = e?.target?.value as string;
    if(num) updateTableNumber(parseInt(num));

  };

  return (
    <>
   <FormControl fullWidth sx={{ bgcolor:"#fff" }}>
    <InputLabel sx={{color:(theme) => theme.palette.primary.main }} id="level-label">Table No.</InputLabel>
    <Controller 
     name="tableNo"
     defaultValue={selectedTable}
     control={control}
     render={({
      field : { onChange, value }
     }) => (
      <Select name="tableNo"
      onChange={handleChange}
      value={selectedTable}
      >
        {Array.isArray(tableData) &&
        tableData?.map((tbl)=>(
          <MenuItem key={tbl?._id} value={tbl?.tableNo}>
            {`${tbl?.tableNo} - ${tbl?.type}(${tbl?.capacity})`}

          </MenuItem>
        ))}



      </Select>
     )}

    
    />

    
   </FormControl>

    </>
  );
};

export default TableDropDown;