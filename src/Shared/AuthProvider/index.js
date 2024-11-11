import { createContext, useContext } from "react"
import { useCookieStorage } from "react-mkx-storage"

/**
 * Context for managing authentication state.
 * @type {React.Context<[string, React.Dispatch<React.SetStateAction<string>>]>}
 */
const AuthContext = createContext()

/**
 * Provider component for managing authentication state.
 * @param {Object} props - Props for the AuthProvider component.
 * @param {React.ReactNode} props.children - The children elements.
 * @returns {JSX.Element} AuthProvider component.
 */
const AuthProvider = ({ children }) => {
  /**
   * State for storing the department value.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [value, setValue] = useCookieStorage("department", "")

  return <AuthContext.Provider value={[value, setValue]}>{children}</AuthContext.Provider>
}

/**
 * Hook for accessing the AuthContext.
 * @returns {[string, React.Dispatch<React.SetStateAction<string>>]} The context value and the function to update it.
 */
export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
