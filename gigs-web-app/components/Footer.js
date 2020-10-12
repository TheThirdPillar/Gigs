import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

function Footer() {
  return (
    <>
      <Row className="justify-content-center border-top mt-4">
        <Col xs={4} md={4} lg={3}>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Privacy Policy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Terms and Conditions</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={4} md={4} lg={3}>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#">Shield</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">SkillsChain</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Third Pillar</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={4} md={4} lg={3}>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="#">Contributions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Made with &hearts; in Bangalore</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </>
  )
}

export default Footer
