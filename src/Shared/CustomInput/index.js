import { Search, Visibility, VisibilityOff } from "@mui/icons-material"
import { FormHelperText, IconButton, InputAdornment, TextField } from "@mui/material"
import classNames from "classnames"
import { useState } from "react"

/**
 * Custom input component with additional features like visibility toggle for passwords.
 * @param {import("@mui/material").TextFieldProps} props - Props object.
 * @prop {("start" | "end" | "center" | "justify" | "left" | "right")} [props.textAlign="start"] - Text alignment.
 */

const CustomInput = ({
  type = "",
  value,
  onChange,
  label = "",
  className = "",
  id = "",
  formik,
  size = "small",
  InputProps,
  onBlur,
  isRequired = false,
  text = "base",
  paddingX = 3,
  paddingY = 2,
  textAlign = "start",
  multiline = false,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState({ [id]: false })
  const selectedValue = formik?.values[id] ?? value
  const handleChange = formik?.handleChange ?? onChange

  return (
    <div className="flex flex-col justify-center">
      {label && (
        <p className="m-1 font-semibold whitespace-nowrap">
          {label}
          {isRequired && <span className="text-red-600">*</span>}
        </p>
      )}
      <TextField
        id={id}
        name={id}
        type={type !== "password" ? type : isVisible[id] ? "text" : "password"}
        size={size}
        multiline={multiline}
        inputProps={{
          className:
            type === "file"
              ? `!pt-1.5 !pl-1.5 !pb-3`
              : `!text-${text} text-${textAlign} !py-${paddingY} !px-${multiline ? 1 : paddingX}`,
        }}
        InputProps={{
          ...InputProps,
          ...(type === "search" && { endAdornment: <Search className="!text-black !text-opacity-40" /> }),
          ...(type === "password" && {
            endAdornment: (
              <InputAdornment>
                <IconButton size="small" onClick={() => setIsVisible({ [id]: !isVisible[id] })}>
                  {isVisible[id] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
        error={formik?.errors?.[id] && formik?.touched?.[id] ? true : false}
        onBlur={onBlur || formik?.handleBlur}
        value={selectedValue}
        onChange={handleChange}
        className={classNames(
          "!outline-none placeholder:!text-gray-100 !capitalize !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white",
          className
        )}
        {...rest}
      />
      {formik?.touched?.[id] && formik?.errors?.[id] && (
        <FormHelperText className="!text-red-500 !mx-1">{formik?.touched?.[id] && formik?.errors?.[id]}</FormHelperText>
      )}
    </div>
  )
}

export default CustomInput
