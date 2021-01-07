import { useState } from 'react'
import Cookies from 'js-cookie'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { FaRupeeSign } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

import { domain } from '../config/config'
import connectToExtension from '../utils/extension'

export default function GigDetailModal(props) {

    // TODO: Edit Functionality
    // TODO: Delete Functionality

    const [logText, setLogText] = useState(null)

    const applyGig = () => {
        let request = {}
        request.gigId = props.gig._id
        fetch(domain + '/application/listen/gigs/gigApplication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'SUCCESS'){
                // Close the modal
                // Update applied in home page
                props.updateApplied(props.gig._id)
                props.onHide()
            } else {
                console.error(data)
            }
        })
    }

    const viewDocument = (isAdmin) => {
        console.log(props.applicationData)
        console.log(props.gig)
        console.log(isAdmin)
        let encryptedData, encryptedKey, originalPublicKey
        encryptedData = props.gig.encryptedFile
        if (isAdmin) {
            // When called by admin
            encryptedKey = props.gig.encryptedKey
            originalPublicKey = false // TODO: This is `thierPublicKey`, not originalPublicKey. Must change here and in Identity.
        } else {
            // When called by user
            encryptedKey = props.applicationData.sharedKeyGigDocument
            originalPublicKey = props.gig.postedBy.publicKey
        }
        let request = {}
        request.query = 'decrypt'
        request.data = {
            encryptedData: encryptedData,
            encryptedKey: encryptedKey,
            originalPublicKey: originalPublicKey
        }
        connectToExtension(request)
        .then(response => {
            if (response && response.status && response.status === 'SUCCESS') {
                let imageSource = response.decryptedData
                var image = new Image()
                image.src = imageSource
                window.open("").document.write(image.outerHTML)
            } else {
                setLogText('Unable to decrypt at the moment.')
            }
        })
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            size="lg"
            enforceFocus={false}
            centered
        >
            <Modal.Header closeButton>
               Gig Detail
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col>
                                Title:<span className="ml-2 font-weight-bold text-capitalize">{props.gig?.gigTitle}</span> 
                            </Col>
                            <Col>
                                Category:<span className="ml-2 font-weight-bold text-capitalize">{props.gig?.gigCategory}</span> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Start Date:<span className="ml-2 font-weight-bold text-capitalize">{new Date(props.gig?.gigStartDate).toDateString()}</span> 
                            </Col>
                            <Col>
                                End Date:<span className="ml-2 font-weight-bold text-capitalize">{new Date(props.gig?.gigEndDate).toDateString()}</span> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Gig Type:<span className="ml-2 font-weight-bold text-capitalize">{
                                    (props.gig?.gigType == 0)
                                        ? <SiGooglescholar className="mb-1" />
                                        : <><FaRupeeSign className="mb-1" /><span className="font-weight-bold">{props.gig?.reward}</span></> 
                                }</span> 
                            </Col>
                            <Col>
                                Submissions:<span className="ml-2 font-weight-bold text-capitalize">{props.gig?.submissions.length}</span> 
                            </Col>
                        </Row>
                        <h6 className="mt-4">Description: </h6>
                        <Row>
                            <Col>
                                {props.gig?.gigDescription}                            
                            </Col>
                        </Row>
                        <h6 className="mt-2">Required Skills:</h6>
                        <Row>
                            <Col>
                                {
                                    props.gig?.gigSkills.map((skill, index) => {
                                        return <Badge pill variant="primary" className="m-2 text-capitalize" key={index}>{skill}</Badge>
                                    })
                                }
                            </Col>
                        </Row>
                        <h6 className="mt-2">Attached Document:</h6>
                        <Row>
                            <Col>
                                {
                                    (props.isAdmin)
                                        ? <Button className="ml-1" onClick={() => viewDocument(props.isAdmin)}>View Document</Button>
                                        : (props.applied)
                                            ? <Button className="ml-1" disabled={props.applicationData?.status !== 2} onClick={() => viewDocument(props.isAdmin)}>View Document</Button>
                                            : <Button className="ml-1" onClick={() => applyGig()}>Apply to View</Button>  
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-danger">{logText}</p>
                            </Col>
                        </Row>
                        {
                            (props.applicationData?.status == 2 || props.applicationData?.status == 4)
                                ? <>
                                    <h6 className="mt-4">Submit Solution:</h6>
                                    <Row>
                                        <Col>
                                            <Button variant="success" className="ml-1" disabled={props.applicationData?.status == 4} onClick={() => props.handleSubmission(props.gig)}>Submit Solution</Button>
                                        </Col>
                                    </Row>
                                  </>
                                : ''
                        }
                    </Col>
                    <Col lg={4}>
                        <Row>
                            Community: <span className="font-weight-bold text-capitalize ml-2">{props.gig?.gigCommunity.name}</span>
                        </Row>
                        <Row>
                            Posted On: <span className="font-weight-bold text-capitalize ml-2">{new Date(props.gig?.postedOn).toDateString()}</span>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}