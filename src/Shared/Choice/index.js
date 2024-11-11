/**
 * Object containing components for conditional rendering.
 * @namespace Choice
 */
const Choice = {
  /**
   * Renders children when a condition is true.
   * @memberof Choice
   * @function When
   * @param {boolean} condition - The condition to check.
   * @param {ReactNode} children - The children to render if the condition is true.
   * @returns {ReactNode|null} The rendered children if the condition is true, otherwise null.
   */
  When: ({ condition, children }) => {
    return condition ? children : null
  },

  /**
   * Renders children when a condition is false.
   * @memberof Choice
   * @function Then
   * @param {boolean} condition - The condition to check.
   * @param {ReactNode} children - The children to render if the condition is false.
   * @returns {ReactNode|null} The rendered children if the condition is false, otherwise null.
   */
  Then: ({ condition, children }) => {
    return !condition ? children : null
  },

  /**
   * Renders children if both conditions are true.
   * @memberof Choice
   * @function And
   * @param {boolean} condition - The first condition to check.
   * @param {ReactNode} children - The children to render if both conditions are true.
   * @returns {ReactNode|null} The rendered children if both conditions are true, otherwise null.
   */
  And: ({ condition, children }) => {
    return condition && children
  },
}

export default Choice
