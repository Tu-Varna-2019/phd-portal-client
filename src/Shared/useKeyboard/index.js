import { useEffect } from "react"

/**
 * Custom hook to handle keyboard events.
 *
 * @param {string} key - The key to listen for.
 * @param {Function} callback - The callback function to execute when the key is pressed.
 * @returns {void}
 */
const useKeyboard = (key, callback) => {
  useEffect(() => {
    /**
     * Event handler for keydown event.
     *
     * @param {KeyboardEvent} event - The keyboard event object.
     * @returns {void}
     */
    const handleKeyDown = (event) => {
      if (event.key === key) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [key, callback])
}

export default useKeyboard
