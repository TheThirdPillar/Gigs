import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

import { FaRupeeSign } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import { RiHomeHeartLine, RiHomeHeartFill } from 'react-icons/ri'


import style from '../styles/Gigs.module.css'

export default function GigsInfoCards(props) {
    return (
        <>
            <Col xs={12} md={6} lg={6}>
                <Card 
                    bg="light"
                    text="black"
                    border="light"
                    className="m-2 p-2 text-center">
                    <Card.Body>
                        <Row className="m-1 mb-2 p-1 border-bottom">
                            <Col className="text-left text-primary">
                                <FaRupeeSign />
                            </Col>
                            <Col className="text-muted text-right">
                                <SiGooglescholar />
                            </Col>
                        </Row>
                        <Card.Title>
                            <Image
                                src="/bmwLogo.png" width="50" />
                        </Card.Title>
                        <Card.Title className={style.gigTitle}>
                            Part-time Sales Assistant
                            <br />
                            <small className={style.blueTextMedium}>
                                ThirdPillar
                            </small>
                        </Card.Title>
                        <Card.Text>
                            <Badge pill variant="dark">Sales</Badge>
                        </Card.Text>
                        <Button variant="primary">Login for Details</Button>
                    </Card.Body>
                    <footer className="m-1 p-1 border-top">
                        <span className="text-muted float-left">
                            10th October 2020
                        </span>
                        <span className="text-muted float-right">
                            <RiHomeHeartLine />
                        </span>
                    </footer>
                </Card>
            </Col>
        </>
    )
}