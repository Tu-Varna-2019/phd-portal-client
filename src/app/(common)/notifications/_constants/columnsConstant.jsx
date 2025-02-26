export const columns = [
  { field: "title", headerName: "Заглавие", flex: 1.5, minWidth: 400 },
  { field: "description", headerName: "Описание", flex: 1.5, minWidth: 700 },
  {
    field: "severity",
    headerName: "Приоритет",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 70
    // renderCell: (params) => {
    // 	return <>{params.value.severity}</>;
    // },
  },
  {
    field: "creation",
    headerName: "Време",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 400
  }
];
