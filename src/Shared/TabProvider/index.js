import classNames from "classnames"
import { createContext, useContext } from "react"

/**
 * Context for managing tab state.
 * @type {React.Context}
 */
const TabContext = createContext()

/**
 * Provides tab context to its children.
 * @param {object} props - Component props.
 * @param {*} props.children - The children components.
 * @param {*} props.value - The value for the tab context.
 * @param {string} [props.className=""] - Additional class names for styling.
 * @returns {JSX.Element} TabProvider component.
 */
const TabProvider = ({ children, value, className = "" }) => {
  return (
    <TabContext.Provider value={value}>
      <div className={classNames("py-2", className)}>{children}</div>
    </TabContext.Provider>
  )
}

/**
 * Hook to access the tab context.
 * @returns {*} The tab context.
 */
export const useTabContext = () => useContext(TabContext)

export default TabProvider
