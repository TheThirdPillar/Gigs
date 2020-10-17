import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import style from '../styles/Gigs.module.css'

export default function GigsSummaryCards(props) {
    return (
        <>
            <Col xs={6} md={3} lg={3}>
                <Card
                    bg="white"
                    border="white"
                    className="m-1 p-1 text-center"
                    >
                    <Card.Body>
                        <Card.Title className={style.blueText}>{props.count}</Card.Title>
                        <Card.Text>
                            <small className="text-muted">{props.title}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}