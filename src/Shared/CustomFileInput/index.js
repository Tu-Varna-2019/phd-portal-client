import React from "react"
import CustomButton from "../CustomButton"
import { Avatar } from "@mui/material"
import { Upload } from "@mui/icons-material"
import classNames from "classnames"

const CustomFileInput = ({ id = "", label, value, onChange, className = "", disabled = false, formik }) => {
  return (
    <div className="flex flex-col justify-center">
      {label && <p className="font-semibold  whitespace-nowrap">{label}</p>}
      <CustomButton
        disabled={disabled}
        startIcon={
          <Avatar
            children={<Upload />}
            src={formik.values?.[id] ? URL?.createObjectURL(formik?.values?.[id]) : value}
            className="!h-7 !rounded-sm"
          />
        }
        component="label"
        className={classNames("!flex !justify-start", className)}
      >
        <input
          id={id}
          name={id}
          type="file"
          hidden
          onChange={(event) => (formik ? formik?.setFieldValue(id, event.target.files[0]) : onChange)}
        />
        {formik?.values?.[id]?.name
          ? formik?.values?.[id]?.name?.length > 26
            ? formik?.values?.[id]?.name?.slice(0, 26) + "..."
            : formik?.values?.[id]?.name
          : "Choose Store Logo"}
      </CustomButton>
    </div>
  )
}

export default CustomFileInput
