import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'

import GigsInfoCard from './GigsInfoCards'
import GigDetailModal from './GigDetailModal'
import SubmissionModal from './SubmissionModal'

export default function GigsSearchResultSection(props) {

    const [showModal, toggleModalShow] = useState(false)
    const [showSubmissionModal, toggleSubmissionModal] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [applicationData, setApplicationData] = useState(null)
    
    const handleModalShow = (gig) => {
        setModalData(gig)
        if (props.applications) {
            let currentApplication = props.applications?.filter(application => {
                return (application.gig === gig._id)
            })
            setApplicationData(currentApplication[0])
        }
        toggleModalShow(true)
    }

    const handleModalClose = () => {
        toggleModalShow(false)
        setModalData(null)
    }

    const handleSubmission = () => {
        toggleModalShow(false)
        setModalData(null)
        toggleSubmissionModal(true)
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
            <GigDetailModal show={showModal} gig={modalData} onHide={() => handleModalClose()} isAdmin={props.isAdmin} updateApplied={(id) => props.updateApplied(id)} applied={props.applied} applicationData={applicationData} handleSubmission={() => handleSubmission()} />
            <SubmissionModal show={showSubmissionModal} onHide={() => toggleSubmissionModal(false)} />             
        </>
    )
}