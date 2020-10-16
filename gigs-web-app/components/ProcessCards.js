import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function ProcessCards(props) {
  return (
    <>
      <Col xs={12} md={6} lg={6}>
        <Card
          bg="white"
          text="black"
          border="white"
          className="m-2 p-4 text-center">
              <Card.Body>
                <Card.Title>
                    {props.title}
                </Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
              </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default ProcessCards