import StartPage from "./components/StartPage/StartPage";
import "./style/styles.css";
import { Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPageComponents/UserPage.js";
import { NotFound } from "./components/NotFound";
import MyClasses from "./components/UserPageComponents/MyClassesPage/Myclasses";
import EditClass from "./components/UserPageComponents/Classes/EditClass";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/myclasses" element={<MyClasses />} />
      <Route path="/myclasses/:id/:details" element={<EditClass />} />
      <Route path="/whopsnoaccess" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
