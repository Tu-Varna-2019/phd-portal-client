import { campaignMembersDataFn, campaignMembersFn } from "Services/CRM/Deal"
import { leadsDataFn } from "Services/CRM/Lead"
import { employeeDataFn } from "Services/CRM/Task"
import { compaignsDataFn } from "Services/Invoice"
import { useCountry } from "Settings"
import SearchAndSelect from "Shared/SearchAndSelect"
import { useQuery } from "react-query"
export const CountryStateCitySelect = ({ formik }) => {
  const data = useCountry({ country_id: formik.values.country_id, state_id: formik.values.state_id })
  return (
    <>
      <SearchAndSelect
        name="country_id"
        formik={formik}
        label="Country"
        options={data.countries}
        loading={data.isLoadingCountries}
      />
      <SearchAndSelect
        name="state_id"
        formik={formik}
        label="State"
        options={data.states}
        loading={data.isLoadingStates}
      />
      <SearchAndSelect
        name="city_id"
        formik={formik}
        label="City"
        options={data.cities}
        loading={data.isLoadingCities}
      />
    </>
  )
}

export const LeadSelect = ({ formik }) => {
  const { data, isLoading: isLoadingLeads } = useQuery(["leadData"], () => leadsDataFn())
  const leads = data?.data?.data?.map((i) => ({ label: i.name, value: i.id }))
  return <SearchAndSelect name="lead_id" label="Lead" options={leads || []} formik={formik} loading={isLoadingLeads} />
}

export const CreatorSelect = ({ formik }) => {
  const { data, isLoading } = useQuery(["campaignMembers"], () => campaignMembersFn())
  const creators = data?.data?.data?.map((i) => ({ label: i.name, value: i.id }))
  return (
    <SearchAndSelect
      name="campaign_member_id"
      formik={formik}
      options={creators || []}
      loading={isLoading}
      label="Influencer"
    />
  )
}

export const InfluencerSelect = ({ formik, campaign_id = "" }) => {
  const { data, isLoading } = useQuery(["InfluencerSelect", campaign_id], () => campaignMembersDataFn({ campaign_id }))
  const influencers = data?.data?.data?.map((i) => ({ label: i.name, value: i.id }))
  return (
    <SearchAndSelect
      name="campaign_member_id"
      formik={formik}
      options={influencers || []}
      loading={isLoading}
      label="Influencer"
    />
  )
}

export const EmployeeSelect = ({ formik }) => {
  const { data, isLoading } = useQuery(["employeeData"], () => employeeDataFn())
  const employees = data?.data?.data?.map((i) => ({ label: i.name, value: i.id }))
  return (
    <SearchAndSelect
      name="employee_id"
      formik={formik}
      options={employees || []}
      loading={isLoading}
      label="Assign To"
    />
  )
}

export const CampaignSelect = ({ formik }) => {
  const { data, isLoading } = useQuery(["compaignsData"], () => compaignsDataFn())
  const compaigns = data?.data?.data?.map((i) => ({ label: `${i.campaign_title} | ${i.deal_no}`, value: i.id }))
  return (
    <SearchAndSelect
      name="campaign_id"
      formik={formik}
      options={compaigns || []}
      loading={isLoading}
      label="Campaign"
    />
  )
}
