import { Add, Check, Delete, Edit } from "@mui/icons-material"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { employeeAssetFn, updateEmployeeAssetFn } from "Services/HRM/Employee"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomModal from "Shared/CustomModal"
import { TableCell } from "Shared/Table"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"

const EmployeeAsset = ({ employee_id }) => {
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState("")
  const [asset, setAsset] = useState([])

  const handleClose = () => {
    setOpen(false)
    setTarget("")
  }

  const { data, isLoading, refetch } = useQuery(
    ["employeeAsset", open, employee_id],
    () => employeeAssetFn({ employee_id }),
    { enabled: open }
  )

  useEffect(() => {
    data && setAsset(data?.data?.data)
  }, [data])

  const { mutate: updateAsset } = useMutation(updateEmployeeAssetFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setTarget("")
    },
  })

  const handleNumberChange = (index, subIndex, value) => {
    const updatedAssetData = [...asset]
    const updatedNumbers = [...updatedAssetData[index].numbers]
    updatedNumbers[subIndex] = value
    updatedAssetData[index] = { ...updatedAssetData[index], numbers: updatedNumbers }
    setAsset(updatedAssetData)
  }

  const handleDelete = (index, subIndex) => {
    const updatedAssetData = [...asset]
    const updatedNumbers = [...updatedAssetData[index].numbers]
    updatedNumbers.splice(subIndex, 1)
    updatedAssetData[index] = { ...updatedAssetData[index], numbers: updatedNumbers }
    setAsset(updatedAssetData)
  }

  const handleAdd = (index, subIndex) => {
    const updatedAssetData = [...asset]
    const updatedNumbers = [...updatedAssetData[index].numbers]
    updatedNumbers.splice(subIndex + 1, 0, "")
    updatedAssetData[index] = { ...updatedAssetData[index], numbers: updatedNumbers }
    setAsset(updatedAssetData)
  }

  return (
    <>
      <CustomButton size="small" onClick={() => setOpen(true)} className="!whitespace-nowrap">
        View Asset
      </CustomButton>
      <CustomModal
        title="Employee Asset"
        open={open}
        onClose={handleClose}
        padding={0}
        className="!max-w-[80%] !w-auto !min-w-[50%]"
      >
        <TableContainer>
          <Table className="!whitespace-nowrap">
            <TableHead>
              <TableRow>
                <TableCell isHead>Asset Type</TableCell>
                <TableCell isHead>Quantity</TableCell>
                <TableCell isHead>Number 1</TableCell>
                <TableCell isHead>Number 2</TableCell>
                <TableCell isHead>Number 3</TableCell>
                <TableCell isHead>Number 4</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CustomLoader loading={isLoading} row={6} />
              {asset?.map((asset, index) => {
                return (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.asset_type}</TableCell>
                    <TableCell>{asset.numbers?.length}</TableCell>
                    {asset.numbers?.map((number, subIndex) => (
                      <TableCell key={subIndex}>
                        <div className="flex items-center justify-center gap-2">
                          {target !== index ? (
                            number
                          ) : (
                            <>
                              <CustomInput
                                text="xs"
                                type="number"
                                value={number}
                                className="w-32 mkx"
                                onChange={(event) => handleNumberChange(index, subIndex, event.target.value)}
                              />
                              <CustomIconButton color="error" onClick={() => handleDelete(index, subIndex)}>
                                <Delete fontSize="small" />
                              </CustomIconButton>
                            </>
                          )}
                        </div>
                      </TableCell>
                    ))}
                    {Array.from({ length: 4 - (asset.numbers ? asset.numbers.length : 0) }).map((_, subIndex) => (
                      <TableCell key={subIndex}>
                        {subIndex === 0 && target === index ? (
                          <CustomIconButton onClick={() => handleAdd(index, asset.numbers.length)}>
                            <Add />
                          </CustomIconButton>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <CustomIconButton
                          color="success"
                          onClick={() =>
                            target === index ? updateAsset({ employee_asset_id: asset.id, ...asset }) : setTarget(index)
                          }
                        >
                          {index === target ? <Check /> : <Edit />}
                        </CustomIconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomModal>
    </>
  )
}

export default EmployeeAsset
