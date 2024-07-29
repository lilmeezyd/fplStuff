import { Container } from "react-bootstrap"
import {  Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const HomeScreen = () => {
  return (
    <Container>
      <div className="home position-relative">
        <div className="home-pos">Welcome to the captain&lsquo;s lounge</div>
      </div>
      <div className="link-wrap py-3">
      <LinkContainer to='/statistics'>
        <div className="pos-link position-relative">
          <div className="home-pos">Statistics</div>
        </div>
        </LinkContainer>
        <LinkContainer to='/compare'><div className="pos-link position-relative">
          <div className="home-pos">Comparison</div>
        </div></LinkContainer>
        
        <LinkContainer to='/achievements'><div className="pos-link position-relative">
          <div className="home-pos">Achievements</div>
        </div></LinkContainer>
        
      </div>
    </Container>
  )
}

export default HomeScreen