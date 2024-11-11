import { useState } from "react"

/**
 * Type representing the data structure.
 * @typedef {Object} DataStructure
 * @property {Array} data - Array of items.
 */

/**
 * Custom hook for managing row selection.
 * @param {Array<string|number>} initialSelectedIds - Initial array of selected item ids.
 * @param {DataStructure} data - Data object containing items.
 * @returns {{selectedIds: Array<string|number>, handleSelectRow: Function, handleSelectAll: Function, handleClearSelection: Function}} - Object containing selectedIds state and selection handling functions.
 */
const useRowSelection = (initialSelectedIds = [], data) => {
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds)

  /**
   * Function to handle selection of a row.
   * @param {string|number} id - Id of the row to be selected.
   */
  const handleSelectRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  /**
   * Function to handle selection of all rows.
   */
  const handleSelectAll = () => {
    if (selectedIds?.length === data?.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(data?.map((i) => i?.id))
    }
  }

  /**
   * Function to clear all selected rows.
   */
  const handleClearSelection = () => {
    setSelectedIds([])
  }

  return { selectedIds, handleSelectRow, handleSelectAll, handleClearSelection }
}

export default useRowSelection
