import { useState } from "react"

/**
 * A custom React hook to manage state in local storage.
 * @param {string} key - The key under which to store the value in local storage.
 * @param {any} initialValue - The initial value to use if no value is found in local storage.
 * @returns {[any, Function]} An array containing the current value and a function to update the value.
 */
function useLocalStorage(key, initialValue) {
  // Get initial value from local storage or use the provided initial value
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : initialValue

  // State to store our value
  const [value, setValue] = useState(initial)

  /**
   * Function to update local storage and state value.
   * @param {any} newValue - The new value to be set.
   * @returns {void}
   */
  const updateValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, updateValue]
}

export default useLocalStorage
