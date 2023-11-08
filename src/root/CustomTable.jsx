import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { addData } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DataTable() {
  const storeData = useSelector((state) => state.app.data);
  const dispatch = useDispatch();
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  const { data, loading, error } = useApi(apiUrl);

  useEffect(() => {
    // Check if data is loaded and not in the Redux store
    if (!loading && data?.products?.length && !storeData?.products?.length) {
      // Dispatch the data to the Redux store
      console.log("dispatching", data);
      dispatch(addData(data));
    }
  }, [loading, data, storeData, dispatch]);

  const loadNextPage = () => {
    setSkip(skip + limit);
  };

  const loadPrevPage = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };

  // console.log('adadadaad', data)
  const columns = [
    { field: "id", headerName: "No.", width: 70 },
    { field: "brand", headerName: "Brand", width: 95 },
    { field: "title", headerName: "Product", width: 130 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "discountPercentage", headerName: "Discount", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "rating", headerName: "Rating", width: 70 },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ height: 615, width: "100%" }}>
      <DataGrid
        rows={storeData?.products || []}
        columns={columns}
        hideFooter={true}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 250 },
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
          },
        }}
        disableDensitySelector
        disableColumnFilter
        disableColumnSelector
      />
      <div className="flex mt-10 gap-10 text-center justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={loadPrevPage}
          disabled={skip === 0}
        >
          Load Previous Page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={loadNextPage}
          disabled={data?.total - skip === limit}
        >
          Load Next Page
        </Button>
      </div>
    </div>
  );
}
