import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Filter from './Filter'
import style from '../styles/Gigs.module.css'

export default function GigsFilterSection() {
    return(
        <>
            <Accordion defaultActiveKey="0">
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
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}