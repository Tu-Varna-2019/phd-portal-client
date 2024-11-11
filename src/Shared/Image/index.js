import React from "react"

/**
 * Image component.
 * @param {object} props - Component props.
 * @param {string} props.src - The URL of the image.
 * @param {string} [props.altImage=""] - The URL of the alternative image to display if the original image fails to load.
 * @param {React.HTMLProps<HTMLImageElement>} [props.options] - Additional props to pass to the img element.
 * @returns {React.ReactElement<HTMLImageElement>} The rendered img element.
 */
const Image = ({ src, altImage = "", ...options }) => {
  return (
    <img
      src={src}
      alt=""
      onError={(e) => {
        e.target.onerror = null
        e.target.src = altImage
      }}
      {...options}
    />
  )
}

export default Image
