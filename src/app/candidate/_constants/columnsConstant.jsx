import { renderLink } from "@/components/cells-renderers/link";

export const columns = [
  {
    field: "name",
    headerName: "Наименование",
    flex: 1.5,
    minWidth: 700,
    renderCell: (param) => renderLink(param.row.name, param.row.name)
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
