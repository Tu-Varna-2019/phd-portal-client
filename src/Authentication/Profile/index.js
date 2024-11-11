import { Facebook, Instagram, Twitter } from "@mui/icons-material"
import { Avatar, CircularProgress, useTheme } from "@mui/material"
import { useProfile } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
  const { profile, isLoading } = useProfile()
  const navigate = useNavigate()

  const address = profile?.address
  const residential = address?.find((i) => i.address_type === "Residential")
  const permanent = address?.find((i) => i.address_type === "Permanent")

  const theme = useTheme()

  return isLoading ? (
    <CustomDiv className="flex items-center justify-center w-full h-full">
      <CircularProgress thickness={4} size={50} />
    </CustomDiv>
  ) : (
    <CustomDiv className="flex justify-between gap-10">
      <div className="flex flex-col items-center justify-center w-1/3 gap-3 p-5 text-lg h-fit">
        <Avatar
          sx={{ backgroundColor: theme.palette.primary.main }}
          src={profile?.profile_pic || "mkx"}
          alt={profile?.name}
          className="!h-32 !text-5xl !w-32"
        />
        <p className="text-xl font-bold uppercase">{profile?.name}</p>
        <p className="text-center">
          {residential?.area}, {residential?.city}, {residential?.state}, {residential?.country}, {residential?.pincode}
        </p>
        <p style={{ backgroundColor: theme.palette.primary.main }} className="w-full !text-white text-center rounded">
          Contact
        </p>
        <div className="flex gap-5">
          <Link target="_blank" to={profile?.facebook_link}>
            <Facebook />
          </Link>
          <Link target="_blank" to={profile?.twitter_link}>
            <Twitter />
          </Link>
          <Link target="_blank" to={profile?.instagram_link}>
            <Instagram />
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-2/3 px-10 py-5">
        <p style={{ color: theme.palette.primary.main }}>Profile Details</p>
        <div className="flex gap-5 py-5 text-lg">
          <div className="flex flex-col justify-center h-fit gap-y-5">
            <p>
              <strong>First Name :</strong> {profile?.first_name || "N/A"}
            </p>
            <p>
              <strong>DOB :</strong> {moment(profile?.dob).format("DD-MM-YYYY") || "N/A"}
            </p>
            <p>
              <strong>Father Name :</strong> {profile?.father_name || "N/A"}
            </p>
            <p>
              <strong>Aadhar Card Number :</strong> {profile?.adhaar || "N/A"}
            </p>
            <p style={{ color: theme.palette.primary.main }}>Residential Address</p>
            <p>
              <strong>Area :</strong> {residential?.area || "N/A"}
            </p>
            <p>
              <strong>State :</strong> {residential?.state || "N/A"}
            </p>
            <p>
              <strong>Pincode :</strong> {residential?.pincode || "N/A"}
            </p>
            <p style={{ color: theme.palette.primary.main }}>Permanent Address</p>
            <p>
              <strong>Area :</strong> {permanent?.area || "N/A"}
            </p>
            <p>
              <strong>State :</strong> {permanent?.state || "N/A"}
            </p>
            <p>
              <strong>Pincode :</strong> {permanent?.pincode || "N/A"}
            </p>
          </div>
          <div className="flex flex-col justify-center h-fit gap-y-5">
            <p>
              <strong>Last Name :</strong> {profile?.last_name || "N/A"}
            </p>
            <p>
              <strong>Mobile No :</strong> {profile?.mobile || "N/A"}
            </p>
            <p>
              <strong>Email :</strong> {profile?.email || "N/A"}
            </p>
            <p>
              <strong>Mother Name :</strong> {profile?.mother_name || "N/A"}
            </p>

            <p className="opacity-0">
              <strong>Country :</strong> {residential?.country || "N/A"}
            </p>
            <p>
              <strong>Country :</strong> {residential?.country || "N/A"}
            </p>
            <p>
              <strong>City :</strong> {residential?.city || "N/A"}
            </p>
            <p className="opacity-0">-</p>
            <p className="opacity-0">-</p>
            <p>
              <strong>Country :</strong> {permanent?.country || "N/A"}
            </p>
            <p>
              <strong>City :</strong> {permanent?.city || "N/A"}
            </p>
          </div>
        </div>
        <CustomButton className="!p-1 w-32" onClick={() => navigate("/update-profile")}>
          Edit Profile
        </CustomButton>
      </div>
    </CustomDiv>
  )
}

export default Profile
