import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'

import GigsInfoCard from './GigsInfoCards'
import GigDetailModal from './GigDetailModal'

export default function GigsSearchResultSection(props) {

    const [showModal, toggleModalShow] = useState(false)
    const [modalData, setModalData] = useState(null)
    
    const handleModalShow = (gig) => {
        setModalData(gig)
        toggleModalShow(true)
    }

    const handleModalClose = () => {
        toggleModalShow(false)
        setModalData(null)
    }

    return (
        <>
            <Row className="mt-4 justify-content-center">
                <Col xs={12} md={12} lg={12} className="m-1 p-2">
                    <CardDeck>
                        {
                            props.gigs?.map((gig, index) => {
                                return <GigsInfoCard gig={gig} key={index} isUserSession={props.isUserSession} showDetail={() => handleModalShow(gig)} isAdmin={props.isAdmin} bookmarked={(props.bookmarked?.includes(gig._id))} updateBookmarked={(action) => props.updateBookmarked(action, gig._id)} applied={props.applied} />
                            })
                        }
                    </CardDeck>
                </Col>
            </Row>
            <GigDetailModal show={showModal} gig={modalData} onHide={() => handleModalClose()} isAdmin={props.isAdmin} updateApplied={(id) => props.updateApplied(id)} applied={props.applied} />             
        </>
    )
}