import { Autocomplete } from "@mui/material"
import CustomInput from "Shared/CustomInput"
import { toast } from "react-toastify"

const SearchAndSelect = ({
  options,
  label,
  formik,
  name,
  setValue,
  value,
  isRequired = false,
  className = "",
  loading = false,
  placeholder = "Search and Select ",
}) => {
  const handleChange = (_event, newValue) => {
    const selectedValue = newValue ? newValue.value : null
    if (formik) {
      formik.setFieldValue(name, selectedValue)
    } else {
      setValue ? setValue(selectedValue) : toast.info("Provide setValue Function")
    }
  }

  let selectedOption

  if (formik) {
    selectedOption = options && options.find((option) => option.value === formik.values[name])
  } else {
    selectedOption = options && options.find((option) => option.value === value)
  }

  return (
    <Autocomplete
      options={options || []}
      loading={loading}
      value={selectedOption || null}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <CustomInput
          id={name}
          isRequired={isRequired}
          {...params}
          label={label}
          placeholder={label ? placeholder + label : placeholder}
          className={className}
        />
      )}
    />
  )
}

export default SearchAndSelect
