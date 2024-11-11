import { Close } from "@mui/icons-material"
import { Checkbox, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Tab, Tabs } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import { useDataHRM } from "Services/HRM"
import { addEmployeeFn, employeeDetailFn, updateEmployeeFn } from "Services/HRM/Employee"
import { useCountry } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import { randomArray } from "Shared/RandomArray"
import SearchAndSelect from "Shared/SearchAndSelect"
import TabPanel from "Shared/TabPanel"
import TabProvider from "Shared/TabProvider"
import { useFormik } from "formik"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"

const ManageEmployee = () => {
  const { manage } = useParams()
  const { state: employee_id } = useLocation()
  const [value, setValue] = useState("1")
  const navigate = useNavigate()
  const isUpdate = manage === "update"

  const { mutate: addEmployee, isLoading } = useMutation(addEmployeeFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate("/employee")
    },
  })

  const { mutate: updateEmployee, isLoading: isLoadingUpdate } = useMutation(updateEmployeeFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate("/employee")
    },
  })

  const { data } = useQuery(["employee", employee_id], () => employeeDetailFn({ employee_id }))

  const employee = data?.data?.data
  const address = employee?.address
  const residential_address = address?.[0]
  const permanent_address = address?.[1]

  const initialValues = {
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    joining_date: employee?.joining_date || "",
    email: employee?.email || "",
    dob: employee?.dob ? moment(employee?.dob).format("YYYY-MM-DD") : "2000-01-01",
    mobile: employee?.mobile || "",
    gender: employee?.gender || "",
    marital_status: employee?.marital_status || "",
    department_id: employee?.department || "",
    role_id: employee?.role || "",
    manager_id: employee?.manager || "",
    is_manager: "False",
    father_name: employee?.father_name || "",
    mother_name: employee?.mother_name || "",
    emergency_contact_no: employee?.emergency_contact_no || "",
    emergency_contact_name: employee?.emergency_contact_name || "",
    relation: employee?.relation || "",
    adhaar: employee?.adhaar || "",
    pan: employee?.pan || "",
    bank_name: employee?.bank_name || "",
    account_no: employee?.account_no || "",
    ifsc_code: employee?.ifsc_code || "",
    account_holder_name: employee?.account_holder_name || "",
    salary: employee?.salary || 0,
    uan_number: employee?.uan_number || 0,
    other_allowances: employee?.other_allowances || 0,
    bank_cancelled_cheque: "",
    conveyance: employee?.conveyance || 0,
    esic_code: employee?.esic_code || 0,
    probation_status: employee?.probation_status || "No",
    probation_date: employee?.probation_date ? moment(employee?.probation_date).format("YYYY-MM-DD") : "",
    same_as_residential: false,
    high_school: "",
    inter: "",
    graduation: "",
    post_graduation: "",
    other_docs: "",
    offer_letter: "",
    salary_revision: "",
    relieving: "",
    pan_pdf: "",
    adhaar_pdf: "",
    photo: "",
    residential_area: residential_address?.area || "",
    residential_address_id: residential_address?.id || "",
    residential_country_id: residential_address?.country_id || "",
    residential_state_id: residential_address?.state_id || "",
    residential_city_id: residential_address?.city_id || "",
    residential_pincode: residential_address?.pincode || "",
    permanent_area: permanent_address?.area || "",
    permanent_address_id: permanent_address?.id || "",
    permanent_country_id: permanent_address?.country_id || "",
    permanent_state_id: permanent_address?.state_id || "",
    permanent_city_id: permanent_address?.city_id || "",
    permanent_pincode: permanent_address?.pincode || "",
    hra: employee?.hra || 0,
    health_and_medical: employee?.health_and_medical || 0,
    telephone_allowances: employee?.telephone_allowances || 0,
    epf: employee?.other_allowances || 0,
    insurance: employee?.other_allowances || 0,
    asset_data: [
      { id: "", asset_type: "Phone", quantity: 0, numbers: [], placeholder: "IMEI" },
      { id: "", asset_type: "Sim Card", quantity: 0, numbers: [], placeholder: "Sim" },
      { id: "", asset_type: "Laptop & charger", quantity: 0, numbers: [], placeholder: "IMEI" },
      { id: "", asset_type: "Mobile", quantity: 0, numbers: [], placeholder: "Mobile" },
    ],
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      mobile: Yup.string().min(10).max(10).required("Mobile is required."),
      residential_pincode: Yup.string().min(6).max(6).required("Pincode is required."),
      permanent_pincode: Yup.string().min(6).max(6).required("Pincode is required."),
    }),

    enableReinitialize: true,
    onSubmit: (values) => {
      const residential_address = {
        address_type: "Residential",
        address_id: values.residential_address_id,
        area: values.residential_area,
        country_id: values.residential_country_id,
        state_id: values.residential_state_id,
        city_id: values.residential_city_id,
        pincode: values.residential_pincode,
      }
      const permanent_address = {
        address_type: "Permanent",
        address_id: values.permanent_address_id,
        area: values.permanent_area,
        country_id: values.permanent_country_id,
        state_id: values.permanent_state_id,
        city_id: values.permanent_city_id,
        pincode: values.permanent_pincode,
      }

      const reqBody = new FormData()
      isUpdate && reqBody.append("employee_id", employee_id)
      reqBody.append("first_name", values.first_name)
      reqBody.append("last_name", values.last_name)
      reqBody.append("joining_date", values.joining_date)
      reqBody.append("email", values.email)
      reqBody.append("dob", values.dob)
      reqBody.append("photo", values.photo)
      reqBody.append("mobile", values.mobile)
      reqBody.append("gender", values.gender)
      reqBody.append("marital_status", values.marital_status)
      reqBody.append("department_id", values.department_id)
      reqBody.append("role_id", values.role_id)
      reqBody.append("manager_id", values.manager_id)
      reqBody.append("is_manager", values.is_manager)
      reqBody.append("father_name", values.father_name)
      reqBody.append("mother_name", values.mother_name)
      reqBody.append("emergency_contact_no", values.emergency_contact_no)
      reqBody.append("emergency_contact_name", values.emergency_contact_name)
      reqBody.append("relation", values.relation)
      reqBody.append("bank_cancelled_cheque", values.bank_cancelled_cheque)
      reqBody.append("adhaar", values.adhaar)
      reqBody.append("adhaar_pdf", values.adhaar_pdf)
      reqBody.append("pan", values.pan)
      reqBody.append("pan_pdf", values.pan_pdf)
      reqBody.append("bank_name", values.bank_name)
      reqBody.append("account_no", values.account_no)
      reqBody.append("ifsc_code", values.ifsc_code)
      reqBody.append("account_holder_name", values.account_holder_name)
      reqBody.append("salary", values.salary)
      reqBody.append("other_allowances", values.other_allowances)
      reqBody.append("conveyance", values.conveyance)
      reqBody.append("esic_code", values.esic_code)
      reqBody.append("uan_number", values.uan_number)
      reqBody.append("high_school", values.high_school)
      reqBody.append("inter", values.inter)
      reqBody.append("graduation", values.graduation)
      reqBody.append("post_graduation", values.post_graduation)
      reqBody.append("other_docs", values.other_docs)
      reqBody.append("offer_letter", values.offer_letter)
      reqBody.append("salary_revision", values.salary_revision)
      reqBody.append("relieving", values.relieving)
      reqBody.append("probation_status", values.probation_status)
      reqBody.append("probation_date", values.probation_date)
      reqBody.append("hra", values.hra)
      reqBody.append("health_and_medical", values.health_and_medical)
      reqBody.append("telephone_allowances", values.telephone_allowances)
      reqBody.append("epf", values.epf)
      reqBody.append("insurance", values.insurance)
      reqBody.append("address_data", JSON.stringify([residential_address, permanent_address]))
      reqBody.append("asset_data", JSON.stringify(values.asset_data))
      isUpdate ? updateEmployee(reqBody) : addEmployee(reqBody)
    },
  })

  const { departments, managers, roles } = useDataHRM({ department_id: formik.values.department_id })

  const handleChange = (_, newValue) => setValue(newValue)

  const handleAddress = (value) => {
    formik.setFieldValue("same_as_residential", value)
    if (value) {
      formik.setFieldValue("permanent_area", formik.values.residential_area)
      formik.setFieldValue("permanent_country_id", formik.values.residential_country_id)
      formik.setFieldValue("permanent_state_id", formik.values.residential_state_id)
      formik.setFieldValue("permanent_city_id", formik.values.residential_city_id)
      formik.setFieldValue("permanent_pincode", formik.values.residential_pincode)
    } else {
      formik.setFieldValue("permanent_area", "")
      formik.setFieldValue("permanent_country_id", "")
      formik.setFieldValue("permanent_state_id", "")
      formik.setFieldValue("permanent_city_id", "")
      formik.setFieldValue("permanent_pincode", "")
    }
  }

  const residential = useCountry({
    country_id: formik.values.residential_country_id,
    state_id: formik.values.residential_state_id,
  })

  const permanent = useCountry({
    country_id: formik.values.permanent_country_id,
    state_id: formik.values.permanent_state_id,
  })

  const handleAssetChange = (index, value) => {
    const quantity = Math.min(parseInt(value), 4)
    const updatedAssetData = [...formik.values.asset_data]
    const updatedAsset = { ...updatedAssetData[index], quantity }
    updatedAssetData[index] = updatedAsset
    formik.setFieldValue("asset_data", updatedAssetData)
  }

  const handleNumberChange = (index, subIndex, value) => {
    const updatedAssetData = [...formik.values.asset_data]
    const updatedNumbers = [...updatedAssetData[index].numbers]
    updatedNumbers[subIndex] = parseInt(value)
    updatedAssetData[index] = { ...updatedAssetData[index], numbers: updatedNumbers }
    formik.setFieldValue("asset_data", updatedAssetData)
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full h-full gap-2">
      <CustomDiv className="!p-0 flex flex-col h-fit overflow-y-auto">
        <CustomDiv className="flex items-center justify-between !rounded-b-none !p-2">
          <p className="text-lg font-semibold"> Employee</p>
          <CustomIconButton onClick={() => navigate("/employee")}>
            <Close />
          </CustomIconButton>
        </CustomDiv>
        <Divider />
        <div className="flex flex-col p-3">
          <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
            <CustomInput isRequired label="First Name" id="first_name" placeholder="Enter First Name" formik={formik} />

            <CustomInput id="last_name" placeholder="Enter Last Name" formik={formik} label="Last Name" />

            <CustomInput id="email" placeholder="Enter Email" formik={formik} label="Email" isRequired />

            <CustomSelect
              id="marital_status"
              isRequired
              placeholder="Select Marital Status"
              formik={formik}
              label="Marital Status"
            >
              <MenuItem value={"Married"}>Married</MenuItem>
              <MenuItem value={"Unmarried"}>Un Married</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </CustomSelect>

            <CustomInput type="date" id="dob" formik={formik} label="Dob" isRequired />

            <CustomInput
              type="number"
              id="mobile"
              placeholder="Enter Mobile Number"
              formik={formik}
              label="Mobile"
              isRequired
            />

            <CustomSelect isRequired label="Gender" id="gender" placeholder="Select Gender" formik={formik}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CustomSelect>

            <FormControl>
              <p className="m-1 font-semibold">Probation</p>
              <RadioGroup
                name="probation_status"
                row
                className="px-2 bg-white border border-black rounded bg-opacity-20 border-opacity-20"
                value={formik.values.probation_status}
                onChange={formik.handleChange}
              >
                <FormControlLabel label="Yes" control={<Radio size="small" />} value={"Yes"} />
                <FormControlLabel label="No" control={<Radio size="small" />} value={"No"} />
              </RadioGroup>
            </FormControl>

            {formik.values.probation_status === "Yes" && (
              <CustomInput label="Probation Date" id="probation_date" formik={formik} type="date" />
            )}
          </div>

          <TabProvider value={value}>
            <Tabs value={value} onChange={handleChange} component={CustomDiv} className="!p-0">
              <Tab label="Other Details" value="1" className="!capitalize !text-base" />
              <Tab label="Family Details" value="2" className="!capitalize !text-base" />
              <Tab label="Address" value="3" className="!capitalize !text-base" />
              <Tab label="KYC Details" value="4" className="!capitalize !text-base" />
              <Tab label="Sallery & Emp Benefits" value="5" className="!capitalize !text-base" />
              <Tab label="Document" value="6" className="!capitalize !text-base" />
              {!isUpdate && <Tab label="Asset" value="7" className="!capitalize !text-base" />}
            </Tabs>
            <TabPanel value="1" className="!p-0 !pt-2">
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Date Of Joining" id="joining_date" formik={formik} type="date" isRequired />
                <CustomInput
                  type="file"
                  id="photo"
                  onChange={(event) => formik.setFieldValue("photo", event.target.files[0])}
                  label="Choose Photo"
                  placeholder="Choose Photo"
                />

                <CustomSelect
                  label="Department"
                  id="department_id"
                  isRequired
                  placeholder="Enter Department"
                  formik={formik}
                >
                  {departments?.map((item) => (
                    <MenuItem value={item?.id}>{item?.title}</MenuItem>
                  ))}
                </CustomSelect>

                <CustomSelect
                  label="Designation"
                  id="role_id"
                  isRequired
                  placeholder="Select Designation"
                  formik={formik}
                >
                  {roles?.map((item) => (
                    <MenuItem value={item?.id}>{item?.title}</MenuItem>
                  ))}
                </CustomSelect>

                <CustomSelect label="Manager" id="manager_id" isRequired formik={formik} placeholder="Select Manager">
                  {managers?.map((item) => (
                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                  ))}
                </CustomSelect>

                <CustomSelect
                  label="Manager Status"
                  id="is_manager"
                  isRequired
                  formik={formik}
                  placeholder="Select Manager Status"
                >
                  <MenuItem value={"True"}>True</MenuItem>
                  <MenuItem value={"False"}>False</MenuItem>
                </CustomSelect>
              </div>
            </TabPanel>
            <TabPanel value="2" className="!p-0 !pt-2">
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Father Name" id="father_name" placeholder="Enter Father Name" formik={formik} />
                <CustomInput label="Mother Name" id="mother_name" placeholder="Enter Mother Name" formik={formik} />
                <CustomInput
                  label="Emergency Contact Number"
                  type="number"
                  id="emergency_contact_no"
                  placeholder="Enter Emergency Contact Number"
                  formik={formik}
                />
                <CustomInput
                  label="Emergency Contact Name"
                  id="emergency_contact_name"
                  placeholder="Enter Emergency Contact Name"
                  formik={formik}
                />
                <CustomInput label="Relation" id="relation" placeholder="Enter Relation" formik={formik} />
              </div>
            </TabPanel>
            <TabPanel value="3" className="!p-0 !pt-2">
              <p className="font-bold">Residential Address</p>
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Area" id="residential_area" isRequired placeholder="Enter Area" formik={formik} />
                <SearchAndSelect
                  name="residential_country_id"
                  formik={formik}
                  isRequired
                  label="Country"
                  options={residential.countries}
                  loading={residential.isLoadingCountries}
                />
                <SearchAndSelect
                  name="residential_state_id"
                  formik={formik}
                  isRequired
                  label="State"
                  options={residential.states}
                  loading={residential.isLoadingStates}
                />
                <SearchAndSelect
                  name="residential_city_id"
                  formik={formik}
                  isRequired
                  label="City"
                  options={residential.cities}
                  loading={residential.isLoadingCities}
                />
                <CustomInput
                  isRequired
                  type="number"
                  label="Pincode"
                  id="residential_pincode"
                  placeholder="Enter Pincode"
                  formik={formik}
                />
              </div>

              <div className="flex items-center">
                <p className="font-bold">Permanent Address</p>
                <Checkbox
                  name="same_as_residential"
                  size="small"
                  checked={formik.values.same_as_residential}
                  onChange={(event) => handleAddress(event.target.checked)}
                />
                <p>Same as Residential Address</p>
              </div>

              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Area" id="permanent_area" isRequired placeholder="Enter Area" formik={formik} />
                <SearchAndSelect
                  name="permanent_country_id"
                  formik={formik}
                  isRequired
                  label="Country"
                  options={permanent.countries}
                  value={formik.values.permanent_country_id}
                  loading={permanent.isLoadingCountries}
                />
                <SearchAndSelect
                  name="permanent_state_id"
                  formik={formik}
                  label="State"
                  isRequired
                  value={formik.values.permanent_state_id}
                  options={permanent.states}
                  loading={permanent.isLoadingStates}
                />
                <SearchAndSelect
                  name="permanent_city_id"
                  formik={formik}
                  label="City"
                  isRequired
                  value={formik.values.permanent_city_id}
                  options={permanent.cities}
                  loading={permanent.isLoadingCities}
                />
                <CustomInput
                  type="number"
                  label="Pincode"
                  isRequired
                  id="permanent_pincode"
                  placeholder="Enter Pincode"
                  formik={formik}
                />
              </div>
            </TabPanel>

            <TabPanel value="4" className="!p-0 !pt-2">
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Aadhar" id="adhaar" placeholder="Enter Aadhar" formik={formik} />

                <CustomInput
                  type="file"
                  required
                  id="adhaar_pdf"
                  onChange={(event) => formik.setFieldValue("adhaar_pdf", event.target.files[0])}
                  label="Choose Aadhar PDF"
                  placeholder="Choose Aadhar PDF"
                />

                <CustomInput label="Pan Number" id="pan" placeholder="Enter Pan Number" formik={formik} />

                <CustomInput
                  type="file"
                  required
                  id="pan_pdf"
                  onChange={(event) => formik.setFieldValue("pan_pdf", event.target.files[0])}
                  label="Choose PAN PDF"
                  placeholder="Choose PAN PDF"
                />
                <CustomInput label="Account Holder Name" id="account_holder_name" placeholder="Enter" formik={formik} />
                <CustomInput label="Bank Number" id="account_no" placeholder="Enter Bank Number" formik={formik} />
                <CustomInput label="Bank Name" id="bank_name" placeholder="Enter Bank Name" formik={formik} />
                <CustomInput label="Bank IFSC Code" id="ifsc_code" placeholder="Enter Bank IFSC Code" formik={formik} />

                <CustomInput
                  label="Bank Cancelled Cheque"
                  id="bank_cancelled_cheque"
                  type="file"
                  onChange={(event) => formik.setFieldValue("bank_cancelled_cheque", event.target.files[0])}
                />
              </div>
            </TabPanel>

            <TabPanel value="5" className="!p-0 !pt-2">
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput
                  type="number"
                  isRequired
                  label="Basic Salary"
                  id="salary"
                  placeholder="Enter"
                  formik={formik}
                />

                <CustomInput type="number" label="HRA" id="hra" placeholder="Enter HRA" formik={formik} />

                <CustomInput
                  type="number"
                  label="Health & Medical Allowance"
                  id="health_and_medical"
                  placeholder="Enter Health & Medical Allowance"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Conveyance"
                  id="conveyance"
                  placeholder="Enter Conveyance"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Telephone Allowance"
                  id="telephone_allowances"
                  placeholder="Enter Telephone Allowance"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Special/Other Allowance"
                  id="other_allowances"
                  placeholder="Enter Special/Other Allowance"
                  formik={formik}
                />

                <CustomInput
                  type="number"
                  label="EPF Employer Contribution"
                  id="epf"
                  placeholder="Enter EPF Employer Contribution"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Insurance Premium"
                  id="insurance"
                  placeholder="Enter Insurance Premium"
                  formik={formik}
                />
              </div>
            </TabPanel>
            <TabPanel value="6" className="!p-0 !pt-2">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput
                  type="file"
                  id="high_school"
                  onChange={(event) => formik.setFieldValue("high_school", event.target.files[0])}
                  label="10th Marksheet"
                />
                <CustomInput
                  type="file"
                  id="inter"
                  onChange={(event) => formik.setFieldValue("inter", event.target.files[0])}
                  label="12th Marksheet"
                />
                <CustomInput
                  type="file"
                  id="graduation"
                  onChange={(event) => formik.setFieldValue("graduation", event.target.files[0])}
                  label="Choose Graduation"
                />
                <CustomInput
                  type="file"
                  id="post_graduation"
                  onChange={(event) => formik.setFieldValue("post_graduation", event.target.files[0])}
                  label="Choose Post Graduation"
                />
                <CustomInput
                  type="file"
                  id="other_docs"
                  onChange={(event) => formik.setFieldValue("other_docs", event.target.files[0])}
                  label="Choose Other Docs"
                />
                <CustomInput
                  type="file"
                  id="offer_letter"
                  onChange={(event) => formik.setFieldValue("offer_letter", event.target.files[0])}
                  label="Offer Letter / Employee letter"
                />
                <CustomInput
                  type="file"
                  id="salary_revision"
                  onChange={(event) => formik.setFieldValue("salary_revision", event.target.files[0])}
                  label="3 Month Salary"
                />
                <CustomInput
                  type="file"
                  id="relieving"
                  onChange={(event) => formik.setFieldValue("relieving", event.target.files[0])}
                  label="Choose Relieving"
                />
              </div>
            </TabPanel>
            {!isUpdate && (
              <TabPanel value="7" className="!p-0 !pt-2">
                {formik.values.asset_data?.map((asset, index) => {
                  return (
                    <>
                      <p>{asset.asset_type}</p>
                      <div className="grid grid-cols-5 gap-3">
                        <CustomInput
                          id="quantity"
                          className="mkx"
                          value={asset.quantity}
                          type="number"
                          placeholder={`Enter No of ${asset.asset_type}`}
                          onChange={(event) => handleAssetChange(index, event.target.value)}
                        />
                        {randomArray(0, Number(asset.quantity) - 1)?.map((_, subIndex) => {
                          return (
                            <CustomInput
                              type="number"
                              value={asset.numbers[subIndex]}
                              className="mkx"
                              placeholder={`Enter ${asset.placeholder} Number`}
                              onChange={(event) => handleNumberChange(index, subIndex, event.target.value)}
                            />
                          )
                        })}
                      </div>
                    </>
                  )
                })}
              </TabPanel>
            )}
          </TabProvider>
        </div>
      </CustomDiv>
      <CustomDiv className="flex items-center justify-end gap-5">
        <CustomButton onClick={() => navigate("/employee")}>Cancel</CustomButton>
        <CustomButton isLoading={isLoading || isLoadingUpdate} type="submit">
          Save
        </CustomButton>
      </CustomDiv>
    </form>
  )
}

export default ManageEmployee
