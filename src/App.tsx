import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
// import Settings from './pages/Settings';
import Layout from "./components/Layout";
import Room from "./pages/Room";
// import Library from "./pages/Library";
// import About from "./pages/About";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route element={<Layout/>}>
            {/* <Route path="/about" element={<About/>} /> */}
            <Route path="/home" element={<Home/>} />
            {/* <Route path="/library" element={<Library/>} /> */}
            <Route path="/room" element={<Room />} />
            {/* <Route path="/settings" element={<Settings/>} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
