import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import Lobby from './pages/lobby'
import Settings from './pages/settings'
import Layout from "./components/Layout"
import './App.scss';
import Room from "./pages/room"
import Library from "./pages/library"
import About from "./pages/about"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login/>}
            />
          <Route element={<Layout/>}>
            <Route 
              path="/about" 
              element={<About/>}
            />
            <Route
              path="/lobby"
              element={<Lobby/>}
            />
            <Route 
              path="/library" 
              element={<Library/>}
            />
            <Route 
              path="/room" 
              element={<Room />}
            />
            <Route
              path="/settings"
              element={<Settings/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
