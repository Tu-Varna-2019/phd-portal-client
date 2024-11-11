import { useTabContext } from "Shared/TabProvider"

/**
 * Renders a tab panel based on the active tab value.
 * @param {object} props - Component props.
 * @param {*} props.value - The value of the tab panel.
 * @param {*} props.children - The content of the tab panel.
 * @param {string} [props.className=""] - Additional class names for styling.
 * @returns {JSX.Element|null} The tab panel component.
 */
const TabPanel = ({ value, children, className = "" }) => {
  const activeTab = useTabContext()

  // Render the tab panel if it matches the active tab value, otherwise return null
  return activeTab === value ? <div className={className}>{children}</div> : null
}

export default TabPanel
