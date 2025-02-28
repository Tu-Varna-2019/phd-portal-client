export const columns = [
  { field: "oid", headerName: "Oid", flex: 1.5, minWidth: 200 },
  {
    field: "name",
    headerName: "Име",
    flex: 1,
    minWidth: 150
  },
  {
    field: "email",
    headerName: "Имейл",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80
  },
  {
    field: "formattedTimestamp",
    headerName: "Време на достъп",
    headerAlign: "right",
    align: "right",
    flex: 2,
    minWidth: 300
  }
];

export const optionsEN = [
  "докторант",
  "член на комитета",
  "ръководител на докторант"
];
export const optionsBG = ["phd", "committee", "supervisor"];
