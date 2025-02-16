import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { setCredentials } from '../slices/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const { adminInfo } = useSelector((state) => state.auth);
    
    const logoutHandler = async () => {
        try {
            dispatch(setCredentials(null))
        } catch (err) {
          console.log(err);
        }
      };


    return (
        <header className='header'>
            <Navbar className="bg-body-tertiary" expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Cap10z Lounge</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/statistics'>
                                <Nav.Link>Statistics</Nav.Link></LinkContainer>
                            <LinkContainer to='/compare'><Nav.Link>Comparison Tool</Nav.Link></LinkContainer>
                            <LinkContainer to='/planner'><Nav.Link>My Planner</Nav.Link></LinkContainer>
                            <LinkContainer to='/fixtures'><Nav.Link>Fixtures</Nav.Link></LinkContainer>
                            {adminInfo && <LinkContainer to='/admin'><Nav.Link>Admin</Nav.Link></LinkContainer>}
                           { adminInfo && <Nav.Link style={{fontWeight: 700 }}>Hi, {adminInfo?.firstName}</Nav.Link>}
                            {adminInfo && <Button onClick={logoutHandler} className='btn btn-lgout'>Logout</Button>}
                            {/*<LinkContainer to='/achievements'><Nav.Link>Achievements</Nav.Link></LinkContainer> */}   

                            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header