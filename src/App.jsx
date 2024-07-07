import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Status from "./components/status/Status";
import StatusViewer from "./components/status/StatusViewer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/status" element={<Status />}></Route>
        <Route path="/status/:uuserId" element={<StatusViewer />}></Route>
      </Routes>
    </div>
  );
};

export default App;
