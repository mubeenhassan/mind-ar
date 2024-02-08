import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarkerSlider from './Components/Pages/MarkerSlider';
import HomePage from './Components/Pages/HomePage';
import './App.css';
import Layout from "./Components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/marker/:targetId" element={<MarkerSlider />} />
          {/* Add more routes here if needed */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
