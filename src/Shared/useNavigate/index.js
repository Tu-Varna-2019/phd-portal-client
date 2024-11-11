/**
 * A custom utility function for programmatic navigation.
 * @param {string} path - The destination path to navigate to.
 * @param {Object} [options] - An optional object containing navigation options.
 * @param {Object} [options.state=null] - The state to associate with the new history entry.
 * @param {boolean} [options.replace=false] - A boolean indicating whether to replace the current entry in the history stack instead of adding a new one.
 */
export const navigate = (path, options = {}) => {
  const { state = null, replace = false } = options

  if (replace) {
    window.history.replaceState(state, "", path)
  } else {
    window.history.pushState(state, "", path)
  }
  window.dispatchEvent(new Event("popstate"))
}
