import App from "App"
import "index.css"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
    mutations: {
      onSuccess: ({ data }) => toast.success(data.message),
      onError: ({ response }) => toast.error(response.data.message),
    },
  },
})

const root = createRoot(document.getElementById("root"))

console.error = () => {}
console.warn = () => {}

root.render(
  <QueryClientProvider client={client}>
    <ToastContainer limit={2} position="top-right" autoClose={2000} />
    <App />
  </QueryClientProvider>
)
