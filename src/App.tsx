import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routers from "./routers";
import { AppShell } from "@mantine/core";
import { BasicAppShell } from "./AppShell";

function App() {
  return (
    <Router>
      <Routes>
        {routers.map(({ component: Component, path, ...rest }) => {
          return (
            <Route
              key={path}
              path={path}
              element={<MainLayout>{Component}</MainLayout>}
              {...rest}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
