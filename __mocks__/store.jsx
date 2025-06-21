import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const configureMockStore = configureStore([]);
const mockStore = configureMockStore({
  user: {
    phd: {},
    committee: {},
    doctoralCenter: {
      name: "test",
      email: "test",
      oid: "test",
      role: "test"
    },
    candidate: {}
  },
  uiState: {
    alertBoxOpen: false,
    alertBoxMessage: "",
    alertBoxSeverity: "success"
  },
  sessionToken: {}
});

export const storeMockProvider = ({ children }) => (
  <Provider store={mockStore}>{children}</Provider>
);
