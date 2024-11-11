import { Skeleton } from "@mui/material"
import { dealRevenueByUserFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { useQuery } from "react-query"

const RevenueByUser = () => {
  const { data, isLoading } = useQuery(["dealRevenueByUser"], () => dealRevenueByUserFn())
  const count = data ? data.data : [0]
  return (
    <div className="flex flex-col">
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7, 8]?.map(() => {
            return (
              <CustomDiv className="flex !bg-opacity-10 items-center justify-between w-full p-2 !rounded">
                <Skeleton className="w-full" />
              </CustomDiv>
            )
          })
        : count?.map((user) => {
            return (
              <div className="flex border-b border-black border-opacity-15 !bg-opacity-10 items-center justify-between w-full p-2">
                <p>{user.name}</p>
                <p>{user.total_revenue}</p>
              </div>
            )
          })}
    </div>
  )
}

export default RevenueByUser
