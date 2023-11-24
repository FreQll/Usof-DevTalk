import React, { useEffect, useState } from "react";
import CategoriesService from "../../API/CategoriesService";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CategoriesGridList = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "category_id", headerName: "ID", flex: 0.5, width: 90 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      flex: 2,
      editable: true,
    },
  ];

  useEffect(() => {
    CategoriesService.getAllCategories()
      .then((response) => {
        const rowsWithId = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(rowsWithId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          getRowId={(row) => row.category_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          processRowUpdate={(updatedRow, originalRow) => {
            CategoriesService.updateCategory(
              updatedRow.category_id,
              updatedRow.title,
              updatedRow.description,
            ).then((response) => {
              console.log(response);
            });
          }}
          onProcessRowUpdateError={(error) => {
            console.error(error);
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default CategoriesGridList;
