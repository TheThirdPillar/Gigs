import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import styles from '../styles/Home.module.css'
import { GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi'

function WalletCard(props) {
  return (
    <>
      <Col xs={12} md={12} lg={3}>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Card
              bg="dark"
              text="white"
              className="p-2 w-100 text-center">
              <Card.Header>
                Balance
              </Card.Header>
              <Card.Body>
                <Card.Title className={styles.cardTitleX2}>
                  1200 INR
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} lg={12}>
            <Button className="p-1 mt-2 w-100 btn-primary">Add Funds | <GiTakeMyMoney /></Button>
          </Col>
          <Col xs={12} lg={12}>
            <Button variant="danger" className="p-1 mt-2 w-100">Withdraw Funds | <GiReceiveMoney /></Button>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default WalletCard
