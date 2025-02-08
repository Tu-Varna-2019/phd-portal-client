import { DataGrid } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";

export const metadata = {
  title: "Докторантски център - Tu-Varna",
  description: "Технически университет Варна"
};

export default function Page() {
  return (
    <DataGrid container wrap="nowrap">
      <Skeleton variant="rectangular" width={210} height={118} />
    </DataGrid>
  );
}
