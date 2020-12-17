import { useRouter } from 'next/router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { FaSignInAlt, FaSignOutAlt, FaRegIdCard, FaWallet, FaArrowCircleDown } from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'
import { MdExplore } from 'react-icons/md'

import Logo from './Logo'
import { useEffect, useState } from 'react'

function Topbar(props) {

  const router = useRouter()
  const isShieldInstalled = props.isShieldInstalled
  const isUserSession = props.isUserSession
  const [activeKey, setActiveKey] = useState(0)
  useEffect(() => {
    if (router.pathname === '/user') {
      setActiveKey(1)
    }  else if (router.pathname === '/user/wallet') {
      setActiveKey(2)
    } else if (router.pathname === '/user/admin') {
      setActiveKey(3)
    }  
  }, []) 

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <Navbar bg="white" expand="lg" sticky="top">
            <Navbar.Brand href="/">
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle />
            {isUserSession &&
              <Navbar.Collapse className="justify-content-center">
                <Nav activeKey={activeKey}>
                  <Nav.Item>
                    <Nav.Link eventKey={1} href="/user"><FaRegIdCard /> Dashboard</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={2} href="/user/wallet"><FaWallet /> Wallet</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={3} href="/user/admin"><RiAdminFill /> Admin</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={4} href="#" disabled><MdExplore /> Explorer <sup><Badge variant="dark">Coming Soon</Badge></sup></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            }
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {!isShieldInstalled &&
                  <Button variant="primary" size="md" block="true">
                    Download Shield | <FaArrowCircleDown />
                  </Button>
                }
                {(isShieldInstalled && !isUserSession) &&
                  <Button variant="success" size="md" onClick={props.handleLogin} >
                    Shield Login | <FaSignInAlt />
                  </Button>
                }
                {(isShieldInstalled && isUserSession) &&
                  <Button variant="dark" size="md" onClick={props.handleLogout} >
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
