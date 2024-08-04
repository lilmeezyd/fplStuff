import "./App.css";
import PlayerProvider from "./PlayerContext";
import PlayerStatProvider from "./PlayerStatContext";
import ManagerProvider from "./ManagerContext";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <ManagerProvider>
    <PlayerProvider>
      <PlayerStatProvider>
        <>
          <Header />
          <Container className="my-2 min-vh-100">
            <Outlet />
          </Container>
          <Footer />
        </>
      </PlayerStatProvider>
    </PlayerProvider>
    </ManagerProvider>
  );
}

export default App;