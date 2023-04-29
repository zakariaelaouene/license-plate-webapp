import { Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from "./components/provider";
import { ThemeProvider, useTheme } from "@material-tailwind/react";
import { useQuery } from "react-query";
import NotFoundPage from "./pages/not-found";
import HomePage from "./pages/home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export type AppContext = {};

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider
      value={{
        ...theme,
        checkbox: {
          ...theme.checkbox,
          styles: {
            base: {
              label: {
                backgroundColor: "transparent",
                color: "white",
              },
            },
            colors: {},
          },
        },
        input: {
          ...theme.input,
          styles: {
            base: {
              label: {
                color: "white",
              },
            },
          },
        },
      }}
    >
      <Provider value={{}}>
        <div className="w-screen h-screen overflow-auto dark">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Provider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
