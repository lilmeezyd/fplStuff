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
      <LinkContainer to='/fixtures'>
        <div className="pos-link position-relative">
          <div className="home-pos">Fixture Ticker</div>
        </div>
        </LinkContainer>
        <LinkContainer to='/compare'><div className="pos-link position-relative">
          <div className="home-pos">Comparison</div>
        </div></LinkContainer>
        
        <LinkContainer to='/planner'><div className="pos-link position-relative">
          <div className="home-pos">Planner</div>
        </div></LinkContainer>
        
      </div>
    </Container>
  )
}

export default HomeScreen