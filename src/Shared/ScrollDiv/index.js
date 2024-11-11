import React from "react"

/**
 * @typedef {object} ScrollDivProps
 * @property {number} page - Current page number.
 * @property {function} setPage - Function to set the page number.
 * @property {number} [totalPage=1] - Total number of pages.
 * @property {React.CSSProperties} [style] - Inline styles for the div.
 * @property {number} [height=320] - Height of the div.
 */

/**
 * ## ScrollDiv
 *
 * Scrollable div component that triggers pagination when scrolled to the bottom.
 *
 * @param {React.HTMLAttributes<HTMLDivElement> & ScrollDivProps} props - Props for the ScrollDiv component.
 *
 * #### Example
 *
 * ```js
 *  <ScrollDiv
 *    page={currentPage}
 *    setPage={setPage}
 *    totalPage={totalPages}
 *    style={{ backgroundColor: 'lightgray', padding: '10px' }}
 *    height={400}
 *  >
 *    {content}
 *  </ScrollDiv>
 * ```
 */
const ScrollDiv = ({ page, setPage, totalPage = 1, style, height = 320, ...rest }) => {
  return (
    <div
      style={{ ...style, height }}
      onScroll={(e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        if (bottom) {
          page !== Number(totalPage) && setPage((prevPage) => prevPage + 1)
        }
      }}
      {...rest}
    />
  )
}

export default ScrollDiv
