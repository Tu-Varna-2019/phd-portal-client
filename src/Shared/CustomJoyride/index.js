import Joyride from "react-joyride"

const CustomJoyride = ({ steps, ...rest }) => {
  return (
    <Joyride
      styles={{
        options: {
          arrowColor: "#eee",
          backgroundColor: "#eee",
          overlayColor: "rgba(0,0,0, 0.4)",
          primaryColor: "red",
          textColor: "#333",
          zIndex: 1000,
        },
      }}
      continuous
      showProgress
      disableScrollParentFix
      showSkipButton
      {...rest}
      steps={steps}
    />
  )
}

export default CustomJoyride
