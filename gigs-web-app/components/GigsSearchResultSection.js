import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'

import GigsFilterSection from './GigsFilterSection'
import GigsInfoCard from './GigsInfoCards'

export default function GigsSearchResultSection(props) {
    return (
        <>
            <Row className="mt-4 justify-content-center">
                <Col xs={12} md={8} lg={3} className="m-2 p-2">
                    <GigsFilterSection />
                </Col>
                <Col xs={12} md={12} lg={8} className="m-1 p-2">
                    <CardDeck>
                        <GigsInfoCard />
                        <GigsInfoCard />
                        <GigsInfoCard />
                        <GigsInfoCard />
                        <GigsInfoCard />
                        <GigsInfoCard />
                        <GigsInfoCard />
                    </CardDeck>
                </Col>
            </Row>
        </>
    )
}