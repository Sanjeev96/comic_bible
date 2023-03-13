import { Landing } from "./pages/Landing/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/about" element={<About />} /> */}

        <Route path="*" element={"NOT FOUND"} />
      </Routes>
    </Router>
  );
};

export default App;
