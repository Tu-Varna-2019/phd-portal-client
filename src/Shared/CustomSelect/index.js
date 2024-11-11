import { FormControl, FormHelperText, MenuItem, Select, Skeleton } from "@mui/material"
import classNames from "classnames"
import React from "react"

/**
 * Placeholder component for Select component.
 * @param {object} props - Props object.
 * @param {React.ReactNode} props.children - Children to be rendered as placeholder.
 * @returns {JSX.Element} - Placeholder component.
 */
const Placeholder = ({ children }) => {
  return <div className="text-black text-opacity-40">{children}</div>
}

/**
 * Custom select component with additional features like loading state and form integration.
 * @param {import("@mui/material").SelectProps} props - Props object.
 * @param {string|number|Array<string|number>} props.value - Value of the select.
 * @param {string} [props.id=""] - ID of the select.
 * @param {Function<React.FormEvent>} props.onChange - Change event handler or FormEvent.
 * @param {React.ReactNode} props.children - Children elements.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {object} [props.formik] - Formik object for form integration.
 * @param {boolean} [props.isLoading=false] - Whether the select is in loading state.
 * @param {boolean} [props.disabled] - Whether the select is disabled.
 * @param {string} [props.placeholder="Select"] - Placeholder text.
 * @param {boolean} [props.multiple=false] - Whether multiple options can be selected.
 * @param {Array<{value: string|number, label: React.ReactNode}>} [props.options] - Array of select options.
 * @param {string} [props.label=""] - Label for the select.
 * @param {boolean} [props.fullWidth=false] - Whether the select should take full width.
 * @param {("small" | "medium" | "large")} [props.size="small"] - Size of the select.
 * @param {("primary" | "secondary" | "error" | "info" | "success" | "warning")} [props.color="primary"] - Color of the select.
 * @param {boolean} [props.isRequired=false] - Whether the select is required.
 * @param {boolean} [props.isNone=false] - Whether to include a "None" option.
 * @param {import("@mui/material").SelectProps} [props.rest] - Whether to include a "None" option.
 * @returns {JSX.Element} - Custom select component.
 */
const CustomSelect = ({
  value,
  id = "",
  onChange,
  children,
  className = "",
  formik,
  isLoading = false,
  disabled,
  placeholder = "Select",
  multiple = false,
  options,
  label = "",
  fullWidth = false,
  size = "small",
  color = "primary",
  isRequired = false,
  isNone = false,
  ...rest
}) => {
  const selectedValue = formik?.values[id] ?? value ?? ""
  const handleChange = formik?.handleChange ?? onChange

  return (
    <FormControl fullWidth={fullWidth}>
      {label && (
        <p className="m-1 font-semibold whitespace-nowrap">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </p>
      )}
      <Select
        displayEmpty
        color={color}
        value={selectedValue}
        onChange={handleChange}
        id={id}
        disabled={disabled ? disabled : false}
        multiple={multiple}
        size={size}
        error={formik?.errors[id] && formik?.touched[id]}
        onBlur={formik?.handleBlur}
        name={id}
        renderValue={selectedValue?.length !== 0 ? undefined : () => <Placeholder>{placeholder}</Placeholder>}
        className={classNames("!bg-white !bg-opacity-20", className)}
        {...rest}
      >
        {isNone && <MenuItem value="">None</MenuItem>}
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <MenuItem key={index} disabled>
                <Skeleton style={{ width: "100%" }} />
              </MenuItem>
            ))
          : options
          ? options?.map((select) => (
              <MenuItem key={select?.value} value={select?.value}>
                {select?.label}
              </MenuItem>
            ))
          : children}
      </Select>
      {formik?.errors && (
        <FormHelperText sx={{ color: "red" }}>{formik?.touched[id] && formik?.errors[id]}</FormHelperText>
      )}
    </FormControl>
  )
}

export default CustomSelect
