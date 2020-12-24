import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { FaRupeeSign } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

export default function GigDetailModal(props) {

    let isAdmin = true

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
                                    (isAdmin)
                                        ? <Button>View Document</Button>
                                        : <Button>Apply</Button>  
                                }
                            </Col>
                        </Row>
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