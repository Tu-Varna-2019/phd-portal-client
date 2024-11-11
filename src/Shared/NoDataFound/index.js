const NoDataFound = ({ data }) => {
  if (data?.data?.data?.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
        <img src={process.env.PUBLIC_URL + "/nodatafound.svg"} alt="" className="w-1/3" />
        <p className="text-3xl font-semibold">No Data Found</p>
      </div>
    )
}

export default NoDataFound
