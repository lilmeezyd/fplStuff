import { Container } from "react-bootstrap"
const HomeScreen = () => {
  return (
    <Container>
      <div className="home position-relative">
        <div className="home-pos">Welcome to the captain&lsquo;s lounge</div>
      </div>
      <div className="link-wrap py-3">
        <div className="pos-link position-relative">
          <div className="home-pos">Statistics</div>
        </div>
        <div className="pos-link position-relative">
          <div className="home-pos">Comparison</div>
        </div>
        <div className="pos-link position-relative">
          <div className="home-pos">Achievements</div>
        </div>
      </div>
    </Container>
  )
}

export default HomeScreen