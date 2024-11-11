import { Check, Close, Edit } from "@mui/icons-material"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { addTackerFn, campaignTackerFn, updateTackerFn } from "Services/CRM/Campaign"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomModal from "Shared/CustomModal"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"

const VideoTracker = ({ campaignId: campaign_id, setCampaignId }) => {
  const open = Boolean(campaign_id)
  const [isEdit, setIsEdit] = useState(0)
  const [values, setValues] = useState({ subscribe: 0, like: 0, share: 0, comment: 0 })
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

  const { data, refetch, isLoading } = useQuery(
    ["campaign", campaign_id, date],
    () => campaignTackerFn({ campaign_id, date }),
    { enabled: open }
  )

  const { mutate: addTracker } = useMutation(addTackerFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setValues({ subscribe: 0, like: 0, share: 0, comment: 0 })
      setIsEdit(0)
      refetch()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const { mutate: updateTracker } = useMutation(updateTackerFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setValues({ subscribe: 0, like: 0, share: 0, comment: 0 })
      setIsEdit(0)
      refetch()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const trackers = data?.data?.data

  const handleSubscribeChange = (subscribe) => {
    const newValue = { ...values, subscribe }
    setValues(newValue)
  }

  const handleLikeChange = (like) => {
    const newValue = { ...values, like }
    setValues(newValue)
  }

  const handleCommentChange = (comment) => {
    const newValue = { ...values, comment }
    setValues(newValue)
  }

  const handleShareChange = (share) => {
    const newValue = { ...values, share }
    setValues(newValue)
  }

  const handleButtonClick = (video) => {
    if (isEdit !== video.id) {
      setValues({
        subscribe: video?.campaign_trackers?.subscribe || 0,
        comment: video?.campaign_trackers?.comment || 0,
        like: video?.campaign_trackers?.like || 0,
        share: video?.campaign_trackers?.share || 0,
      })
      setIsEdit(video.id)
    } else {
      const trackerData = { ...values, campaign_id, campaign_link_id: video.id }
      if (video?.campaign_trackers?.subscribe === null) {
        addTracker(trackerData)
      } else {
        updateTracker(trackerData)
      }
    }
  }
  return (
    <CustomModal open={open} setOpen={setCampaignId} padding={0}>
      <div className="flex items-center justify-between p-2">
        <CustomInput type="date" value={date} onChange={(event) => setDate(event.target.value)} />{" "}
        <p className="pr-20 text-xl font-semibold">Campaign Tracker</p>
        <CustomIconButton onClick={() => setCampaignId(null)}>
          <Close />
        </CustomIconButton>
      </div>
      <TableContainer>
        <Table className="whitespace-nowrap">
          <TableHead>
            <TableRow>
              <TableCell isHead>Campaign Media</TableCell>
              <TableCell isHead>URL</TableCell>
              <TableCell isHead>Subscribe</TableCell>
              <TableCell isHead>Like</TableCell>
              <TableCell isHead>Comment</TableCell>
              <TableCell isHead>Share</TableCell>
              <TableCell isHead>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <CustomLoader loading={isLoading} row={6} />
            {trackers?.map((video) => {
              return (
                <TableRow key={video.id} className="hover:bg-white mkx hover:bg-opacity-20">
                  <TableCell>{video.campaign_media}</TableCell>
                  <TableCell>{video.url}</TableCell>
                  <TableCell>
                    {isEdit === video.id ? (
                      <CustomInput
                        placeholder="Subscribe"
                        type="number"
                        text="xs"
                        value={values.subscribe}
                        onChange={(event) => handleSubscribeChange(event.target.value)}
                      />
                    ) : (
                      video?.campaign_trackers?.subscribe || 0
                    )}
                  </TableCell>
                  <TableCell>
                    {isEdit === video.id ? (
                      <CustomInput
                        placeholder="Like"
                        type="number"
                        text="xs"
                        value={values.like}
                        onChange={(event) => handleLikeChange(event.target.value)}
                      />
                    ) : (
                      video?.campaign_trackers?.like || 0
                    )}
                  </TableCell>
                  <TableCell>
                    {isEdit === video.id ? (
                      <CustomInput
                        placeholder="Comment"
                        type="number"
                        text="xs"
                        value={values.comment}
                        onChange={(event) => handleCommentChange(event.target.value)}
                      />
                    ) : (
                      video?.campaign_trackers?.comment || 0
                    )}
                  </TableCell>
                  <TableCell>
                    {isEdit === video.id ? (
                      <CustomInput
                        placeholder="Share"
                        type="number"
                        text="xs"
                        value={values.share}
                        onChange={(event) => handleShareChange(event.target.value)}
                      />
                    ) : (
                      video?.campaign_trackers?.share || 0
                    )}
                  </TableCell>
                  <TableCell>
                    <CustomIconButton onClick={() => handleButtonClick(video)}>
                      {isEdit === video.id ? <Check color="success" /> : <Edit color="primary" />}
                    </CustomIconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomModal>
  )
}

export default VideoTracker
