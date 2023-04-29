import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import "react-calendar/dist/Calendar.css";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_BACK_API;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
