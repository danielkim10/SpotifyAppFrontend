import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from "./components/Layout";
import Room from "./pages/Room";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route element={<Layout/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/room" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
