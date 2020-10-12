import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { FaSignInAlt } from 'react-icons/fa'

import Logo from './Logo'

function Topbar(props) {

  const isShieldInstalled = true
  const isUserSession = false

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <Navbar bg="white" expand="lg" sticky="top">
            <Navbar.Brand href="#home">
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {!isShieldInstalled &&
                  <Button variant="primary" size="md" block="true">
                    Download Shield | <FaArrowCircleDown />
                  </Button>
                }
                {(isShieldInstalled && !isUserSession) &&
                  <Button variant="success" size="md">
                    Shield Login | <FaSignInAlt />
                  </Button>
                }
                {(isShieldInstalled && isUserSession) &&
                  <Button variant="dark" size="md">
                    Shield Logout | <FaSignOutAlt />
                  </Button>
                }
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </>
  )
}

export default Topbar