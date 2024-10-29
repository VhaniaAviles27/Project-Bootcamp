import { Route, Routes } from "react-router-dom";
import "./App.css";
import routesConfig from "./routes/routesConfig";

function App() {
  return (
    <Routes>
      {Object.values(routesConfig).map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}

export default App;
