import { useState } from 'react'
import Cookies from 'js-cookie'

import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Ratings from 'react-ratings-declarative'

import { domain } from '../config/config'

export default function ReviewModal(props) {

    const [skillRating, updateSkillRating] = useState(5)
    const [virtues, updateVirtues] = useState(props.gig.virtues)
    const [logText, setLogText] = useState('')

    const handleCheck = (virtue) => {
        // Check if virtue exists 
        // Yes - then remove else add
        let tempVirtues = virtues
        if (virtues.includes(virtue)) {
            tempVirtues.splice(tempVirtues.indexOf(virtue), 1)
            updateVirtues(tempVirtues)
        } else {
            tempVirtues.push(virtue)
            updateVirtues(tempVirtues)
        }
    }

    const handleSubmission = (action) => {
        // 0 -> Reject 1 -> Accept
        let request = {}
        request.status = action
        request.submissionId = props.submission._id
        if (action === "1") {
            request.endorsementXP = skillRating
            request.endorsedVirtues = virtues
        }
        fetch(domain + '/application/listen/gigs/handleSubmission', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => {
            // TODO: Response handlers
            if (data && data.status && data.status == 'SUCCESS') {
                location.reload()
            } else {
                setLogText('Unable to handle submissions at the moment. Please try later.')
            }
        })
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                size="md"
                enforceFocus={false}
                centered
            >
                <Modal.Header closeButton>
                    Review Submission
                </Modal.Header>
                <Modal.Body>
                    <h5>
                        Rate user skills - Primary Skill
                    </h5>
                    <Ratings
                        rating={skillRating}
                        changeRating={(rating) => updateSkillRating(rating)}
                        widgetDimensions="22px"
                        widgetRatedColors='rgb(0, 0, 128)'
                    >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                    </Ratings>
                    <h6 className="mt-3">
                        User Virtues
                    </h6>
                    {
                        (props.gig.virtues?.map((virtue, index) => {
                            return (
                                <>
                                    <Row key={index} className="justify-content-center">
                                        <Col>
                                            <Badge variant="primary" className="p-2 mr-2 text-uppercase">
                                                {virtue}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Form.Check type="checkbox" onChange={() => handleCheck(virtue)} checked className="float-right" />
                                        </Col>
                                    </Row>
                                </>
                            )
                        }))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Row className="justify-content-right">
                        <Col>
                            <Button variant="danger" size="md" onClick={() => handleSubmission("0")}>Reject</Button>
                            <Button variant="success" size="md" onClick={() => handleSubmission("1")} className="ml-2">Accept</Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center p-2">
                        <Col>
                            <p className="text-danger">{logText}</p>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    )
}