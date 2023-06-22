import { useRoutes } from "react-router-dom";
import { getRoutes } from "./config/routes";

function App() {
  const router = useRoutes(getRoutes)
  return <div style={{ height: "100vh" }}>
    {router}
  </div>
}

export default App;
