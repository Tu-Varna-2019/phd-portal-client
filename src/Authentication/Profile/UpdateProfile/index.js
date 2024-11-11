import { Avatar, Checkbox, Divider, MenuItem, useTheme } from "@mui/material"
import axiosInstance from "Config/axio.config"
import { useCountry, useProfile } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import Loader from "Shared/Loader"
import { useFormik } from "formik"
import moment from "moment"
import { toast } from "react-toastify"
import SearchAndSelect from "Shared/SearchAndSelect"
import { useEffect, useState } from "react"

const UpdateProfile = () => {
  const { profile, isLoading } = useProfile()
  const [image, setImage] = useState(null)
  const address = profile?.address

  const residential = address?.find((i) => i.address_type === "Residential")
  const permanent = address?.find((i) => i.address_type === "Permanent")

  const areAddressesSameExceptType = (residential, permanent) => {
    return (
      residential?.address_id === permanent?.address_id &&
      residential?.area === permanent?.area &&
      residential?.country_id === permanent?.country_id &&
      residential?.state_id === permanent?.state_id &&
      residential?.city_id === permanent?.city_id &&
      residential?.pincode === permanent?.pincode
    )
  }
  const theme = useTheme()
  const initialValues = {
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    dob: profile?.dob ? moment(profile?.dob).format("YYYY-MM-DD") : "2000-01-01",
    area: profile?.area || "",
    state: profile?.state || "",
    city: profile?.city || "",
    pin_code: profile?.pin_code || "",
    adhaar: profile?.adhaar || "",
    facebook: profile?.facebook_link || "https://www.facebook.com/",
    twitter: profile?.twitter_link || "https://www.twitter.com/",
    instagram: profile?.instagram_link || "https://www.instagram.com/",
    marital_status: profile?.marital_status || "",
    gender: profile?.gender || "",
    residential_area: residential?.area || "",
    residential_address_id: residential?.id || "",
    residential_country_id: residential?.country_id || "",
    residential_state_id: residential?.state_id || "",
    residential_city_id: residential?.city_id || "",
    residential_pincode: residential?.pincode || "",
    permanent_area: permanent?.area || "",
    permanent_address_id: permanent?.id || "",
    permanent_country_id: permanent?.country_id || "",
    permanent_state_id: permanent?.state_id || "",
    permanent_city_id: permanent?.city_id || "",
    permanent_pincode: permanent?.pincode || "",
  }
  const formik = useFormik({
    initialValues: initialValues,
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
      const reqbody = new FormData(document.getElementById("profile-form"))
      reqbody.append("address_data", JSON.stringify([residential_address, permanent_address]))
      image && reqbody.append("profile_pic", image)
      axiosInstance.patch("user-profile-api/", reqbody).then((response) => {
        if (response.data.response_code === 200) {
          toast.success(response.data.message)
        } else {
          toast.success(response.data.message)
        }
      })
    },
  })
  useEffect(() => {
    if (areAddressesSameExceptType(residential, permanent)) {
      formik.setFieldValue("same_as_residential", true)
    } else {
      formik.setFieldValue("same_as_residential", false)
    }
  }, [profile])

  const residentials = useCountry({
    country_id: formik.values.residential_country_id,
    state_id: formik.values.residential_state_id,
  })

  const permanents = useCountry({
    country_id: formik.values.permanent_country_id,
    state_id: formik.values.permanent_state_id,
  })
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
  return isLoading ? (
    <CustomDiv className="flex items-center justify-center w-full h-full">
      <Loader />
    </CustomDiv>
  ) : (
    <>
      <CustomDiv className="flex flex-col !p-0 w-full">
        <p className="p-3 text-xl font-semibold text-center">Update Profile</p>
        <Divider />
        <form id="profile-form" onSubmit={formik.handleSubmit} className="p-5">
          <span className="grid grid-cols-4 gap-3">
            <CustomButton
              startIcon={
                <Avatar
                  src={image ? URL?.createObjectURL(image) : profile?.profile_pic}
                  alt={formik.values.first_name}
                  className="h-16 rounded"
                />
              }
              component="label"
              className="!flex !justify-start"
            >
              <input type="file" accept="image/*" hidden onChange={(event) => setImage(event.target.files[0])} />
              {image?.name
                ? image?.name?.length > 20
                  ? image?.name?.slice(0, 20) + "..."
                  : image?.name
                : "Choose Profile Picture"}
            </CustomButton>
            <CustomInput label="First Name" id="first_name" formik={formik} placeholder="Enter First Name" />
            <CustomInput label="Last Name" id="last_name" formik={formik} placeholder="Enter Last Name" />
            <CustomInput label="DOB" type="date" id="dob" formik={formik} />
            <CustomSelect id="gender" label="Gender" formik={formik} placeholder="Select Gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </CustomSelect>

            <CustomInput
              label="Aadhar Card Number"
              id="adhaar"
              type="number"
              formik={formik}
              placeholder="Enter Aadhar Card Number"
            />

            <CustomInput label="Facebook url" id="facebook" placeholder="Facebook url" formik={formik} />

            <CustomInput label="Instagram url" id="instagram" formik={formik} placeholder="Instagram url" />
            <CustomInput label="Twitter Url" id="twitter" formik={formik} placeholder="Twitter url" />
            <CustomSelect
              id="marital_status"
              label="Marital Status"
              placeholder="Select Marital Status"
              formik={formik}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </CustomSelect>
          </span>
          <p style={{ color: theme.palette.primary.main }} className="py-5 font-bold">
            Residential Address
          </p>
          <span className="grid grid-cols-5 gap-3">
            <CustomInput label="Area" id="residential_area" placeholder="Enter Area" formik={formik} />
            <SearchAndSelect
              name="residential_country_id"
              formik={formik}
              label="Country"
              options={residentials.countries}
              loading={residentials.isLoadingCountries}
            />
            <SearchAndSelect
              name="residential_state_id"
              formik={formik}
              label="State"
              options={residentials.states}
              loading={residentials.isLoadingStates}
            />
            <SearchAndSelect
              name="residential_city_id"
              formik={formik}
              label="City"
              options={residentials.cities}
              loading={residentials.isLoadingCities}
            />
            <CustomInput
              type="number"
              label="Pincode"
              id="residential_pincode"
              placeholder="Enter Pincode"
              formik={formik}
            />
          </span>
          <div className="flex items-center py-5">
            <p style={{ color: theme.palette.primary.main }} className="font-bold">
              Permanent Address
            </p>
            <Checkbox
              name="same_as_residential"
              size="small"
              checked={formik.values.same_as_residential}
              onChange={(event) => handleAddress(event.target.checked)}
            />
            <p>Same as Residential Address</p>
          </div>
          <span className="grid grid-cols-5 gap-3">
            <CustomInput label="Area" id="permanent_area" placeholder="Enter Area" formik={formik} />
            <SearchAndSelect
              name="permanent_country_id"
              formik={formik}
              label="Country"
              options={permanents.countries}
              value={formik.values.permanent_country_id}
              loading={permanents.isLoadingCountries}
            />
            <SearchAndSelect
              name="permanent_state_id"
              formik={formik}
              label="State"
              value={formik.values.permanent_state_id}
              options={permanents.states}
              loading={permanents.isLoadingStates}
            />
            <SearchAndSelect
              name="permanent_city_id"
              formik={formik}
              label="City"
              value={formik.values.permanent_city_id}
              options={permanents.cities}
              loading={permanents.isLoadingCities}
            />
            <CustomInput
              type="number"
              label="Pincode"
              id="permanent_pincode"
              placeholder="Enter Pincode"
              formik={formik}
            />
          </span>

          <span className="flex justify-end py-5">
            <CustomButton type="submit">update profile</CustomButton>
          </span>
        </form>
      </CustomDiv>
    </>
  )
}

export default UpdateProfile
