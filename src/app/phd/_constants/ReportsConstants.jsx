import Translate from "@/lib/helpers/Translate";

export default function ReportsConstants() {
  const { tr } = Translate();

  const reportColumns = [
    {
      field: "orderNumber",
      headerName: tr("Order number")
    },
    {
      field: "name",
      headerName: tr("Name"),
      display: "flex",
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "conduct",
      headerName: tr("Conduct"),
      display: "flex",
      minWidth: 50
    },
    {
      field: "enrollmentDate",
      headerName: tr("Enrollment date"),
      flex: 1
    }
  ];

  return {
    reportColumns
  };
}
