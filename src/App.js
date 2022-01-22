import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

import LinkBar from './LinkBar';
import Rechart from './RechartIndex';
import GoogleChart from './GoogleChart';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LinkBar />} />
      <Route path="/Rechart" element={<Rechart />} />
      <Route path="GoogleChart" element={<GoogleChart />} />
    </Routes>
  );
}

export default App;
