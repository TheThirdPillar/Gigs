import { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import { FaUpload } from 'react-icons/fa'

export default function SubmissionModal(props) {
    
    const [inputFields, updateInputFields] = useState({
        userskilldata: null,
        encryptedSolution: null,
        encryptedSolutionKeyUser: null,
        encryptedSolutionKeyAdmin: null
    })

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
                    Submit your Solution
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} controlId="skillset">
                                <Form.Control as="select" value={inputFields.userskilldata} placeholder="Select a skill set to endorse" name="skillset" className="form-control" required>
                                    <option disabled>Select a Skill Set from Identity</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} controlId="submission">
                                <input type="file" id="actual-btn" hidden></input>
                                <label htmlFor="actual-btn" className="btn btn-primary w-100"><FaUpload className="mb-1" /> Upload Solution</label>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
