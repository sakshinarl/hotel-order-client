import * as React from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddEditTable from "./AddEditTable";
import TableService from "../../../services/TableService";
import Swal from "sweetalert2";
import Table from "../../../shared/models/TableModel";
import endpoints from "../../../api/endpoints";

import TableContext, { defaultTable } from "./TableContext";
interface ITableProps {}

const Tables: React.FunctionComponent<ITableProps> = (props) => {
  //states
  // user set and fectch
  const [data, setData] = React.useState<Table[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [operation, setOperation] = React.useState<string>("add");
  const [selectedTable, setSelectedTable] = React.useState<Table>(
    defaultTable()
  );

  // executes whwn the dialog is close
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // load all the Tables
  const loadTables = async () => {
    
    const { data } = await TableService.fetchAllTable();
    console.log("data",data);
    
    if (data?.data) setData(data?.data);
  };

  const addTable = () => {
    setOperation("add");
    setSelectedTable(defaultTable());
    setOpenDialog(true);
  };

  const editTable = (u: Table) => {
    setOperation("edit");
    setSelectedTable(u);
    setOpenDialog(true);
  };

  const deleteTable = (id: string) => {
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
        TableService?.deleteTable(id)
          .then((response) => {
            const message = response?.data?.message || "Table Delete";
            Swal.fire("Deleted!", message, "success");
            loadTables();
          })
          .catch((err) => {
            const message = err?.response?.data?.message || "Table deleted";
            Swal.fire("Not Deleted!", message, "error");
          });
      }
    });
  };

  React.useEffect(() => {
    loadTables();
  }, []);

  const columns: MUIDataTableColumn[] = [
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
      },
    },
    
    {
      name: "tableNo",
      label: "TableNo",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "capacity",
      label: "Seating Capacity",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender(status: number) {
          return status == 1 ? "Active" : "Inactive";
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite(dataIndex) {
          const u = data[dataIndex];
          return <>
              <IconButton color="primary" onClick={() => editTable(u)}>
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteTable(u?._id as string)}
              >
                <DeleteIcon />
              </IconButton>
            </>
  
        },
      }
    },
  ]

  return (
    <>
      <TableContext.Provider
        value={{
          open: openDialog,
          onClose: handleDialogClose,
          operation,
          selectedTable,
          loadTables,
        }}
      >
        <AddEditTable />
      </TableContext.Provider>
      <MUIDataTable
        title={
          <Box>
            <Button onClick={addTable} color="secondary" variant="contained">
              New +
            </Button>
            Table List
          </Box>
        }
        data={data}
        columns={columns}
      />
    </>
  );
};

export default Tables;

