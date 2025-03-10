import { renderLink } from "@/components/cells-renderers/link";

export const homeColumns = [
  {
    field: "name",
    headerName: "Наименование",
    flex: 1.5,
    minWidth: 700,
    renderCell: (param) => renderLink(param.row.name, "candidate/curriculum/")
  },
  {
    field: "yearPeriod",
    headerName: "Срок за обучение (години)",
    flex: 1.5,
    minWidth: 170
  },
  {
    field: "mode",
    headerName: "Режим на обучение",
    flex: 1.5,
    minWidth: 200
  },
  {
    field: "faculty",
    headerName: "Катедра",
    flex: 1.5,
    minWidth: 400
  }
];

export const contestsColumns = [
  {
    field: "name",
    headerName: "Имена",
    flex: 1.5,
    minWidth: 700
  },
  {
    field: "yearAccepted",
    headerName: "Година на приемане",
    flex: 1.5,
    minWidth: 170
  },
  {
    field: "faculty",
    headerName: "Катедра",
    flex: 1.5,
    minWidth: 400
  }
];
