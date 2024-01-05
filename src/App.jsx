import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from "./pages/Display";
import Form from "./pages/Form";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/add" element={<Form />} />
        <Route path="/edit/:id" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
