import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { token } = useSelector((state) => ({ token: state.token }));

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route exact path="/" element={token ? <Home /> : <Login />} />
        <Route exact path="/login" element={token ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          element={token ? <Home /> : <Register />}
        />
      </Route>
    </Routes>
  );
}

export default App;
