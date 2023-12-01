import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import UserService from "../../API/UserService";
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const UsersList = ({showMessage}) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "user_id", headerName: "ID",flex: 0.5, width: 90 },
    {
      field: "login",
      headerName: "Login",
      flex: 1,
      width: 150,
      editable: true,
    },
    {
      field: "full_name",
      headerName: "Full Name",
      width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 100,
      flex: 1,
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      type: "number",
      width: 110,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AccountCircleIcon />}
          label="Go to profile"
          showInMenu
          onClick={() => navigate(`/user/${params.row.login}`)}
        />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label={params.row.role === "admin" ? "Make user" : "Give admin rights"}
          showInMenu
          onClick={() => toggleAdmin(params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete User"
          onClick={() => deleteUser(params)}
          showInMenu
        />,
        
      ],
    },
  ];

  const toggleAdmin = (params) => {
    UserService.toggleAdmin(params.row.user_id, params.row.role).then((response) => {

      const updatedRole = params.row.role === "admin" ? "user" : "admin";
      const rowIndex = rows.findIndex((row) => row.user_id === params.row.user_id);

      if (rowIndex !== -1) {
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[rowIndex] = { ...prevRows[rowIndex], role: updatedRole };
          return updatedRows;
        });
      }

      showMessage(`User is now have role ${updatedRole}`, "success")
    });
  };

  const deleteUser = (params) => {
    UserService.deleteUser(params.row.user_id).then((response) => {
      const rowIndex = rows.findIndex((row) => row.user_id === params.row.user_id);

      if (rowIndex !== -1) {
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows.splice(rowIndex, 1);
          return updatedRows;
        });
      }

      showMessage("User deleted successfully", "success")
    }).catch((error) => {
      showMessage(error.response.data.message, "error");
    });
  };

  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => {
        const rowsWithId = response.data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithId);
      })
      .catch((error) => {
        showMessage(error.response.data.message, "error");
      });
  }, [showMessage]);

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          getRowId={(row) => row.user_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          processRowUpdate={(updatedRow, originalRow) => {
            UserService.updateProfile(updatedRow.user_id, updatedRow.full_name, updatedRow.email, updatedRow.login).then((response) => {
              showMessage("User updated successfully", "success")
            });
          }}
          onProcessRowUpdateError={(error) => {
            showMessage("User update failed", "error")
          }}
          pageSizeOptions={[10]}
          
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default UsersList;
