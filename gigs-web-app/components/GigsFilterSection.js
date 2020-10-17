import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { FaSearch } from 'react-icons/fa'

import Filter from './Filter'
import style from '../styles/Gigs.module.css'

export default function GigsFilterSection(props) {
    return(
        <>
            <Accordion defaultActiveKey="0">
                <Form className="ml-1 pl-3 pr-3">
                    <Form.Group as={Row} controlId="search">
                        <InputGroup>
                            <Form.Control type="text" placeholder="Enter keyword" size="lg" />
                            <InputGroup.Append>
                            <InputGroup.Text><FaSearch /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <Card
                    bg="white"
                    border="white"
                    >
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className={style.blueTextMedium}>
                            Skill (34)
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Text>
                                <Filter
                                    label="Angular" />
                                <Filter
                                    label="React" />
                                <Filter
                                    label="BlockChain" />
                                <Filter
                                    label="Quantum" />
                                <Filter
                                    label="Javascript" />
                                <Filter
                                    label="C++" />
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card
                    bg="white"
                    border="white"
                    >
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1" className={style.blueTextMedium}>
                            Category (11)
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Card.Text>
                            <Filter
                                    label="Marketing" />
                                <Filter
                                    label="Frontend" />
                                <Filter
                                    label="Sales" />
                                <Filter
                                    label="Quantum" />
                                <Filter
                                    label="Javascript" />
                                <Filter
                                    label="C++" />
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card
                    bg="white"
                    border="white"
                    >
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2" className={style.blueTextMedium}>
                            Organization (4)
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <Card.Text>
                            <Filter
                                    label="ThirdPillar" />
                                <Filter
                                    label="Mad About Growth" />
                                <Filter
                                    label="Stranger Sapiens" />
                                <Filter
                                    label="Growth On Demand" />
                                <Filter
                                    label="Quantum Computing India" />
                                <Filter
                                    label="Google" />
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}