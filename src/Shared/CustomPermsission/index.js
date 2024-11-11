import { DoDisturb } from "@mui/icons-material"

const CustomPermission = ({ label = "meetings", isPermit }) => {
  return !isPermit ? (
    <span className="flex flex-col items-center justify-center gap-5 p-5 text-lg font-semibold h-96">
      <DoDisturb color="error" className="!text-5xl" />
      You don't have permission for view {label}.
    </span>
  ) : null
}

export default CustomPermission
