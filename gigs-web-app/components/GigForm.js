import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-datepicker'
import Button from 'react-bootstrap/Button'

import Autosuggest from './Autosuggest'

function GigForm(props) {

    return (
        <>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8} lg={8}>
                    <Form autoComplete="off">
                        <Form.Group controlId="gigTitle">
                            <Form.Control type="text" placeholder="Give a title for the gig" name="gigTitle" required />
                        </Form.Group>
                        <Form.Group controlId="gigDescription">
                            <Form.Control as="textarea" placeholder="Brief Description" name="gigDescription" rows="4" required />
                        </Form.Group>
                        <Form.Group controlId="associatedSkill">
                        <Form.Control type="text" placeholder="Search a skill" name="requiredSkill" required />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="gigStartDate">
                                <DatePicker 
                                    selected={new Date()}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="form-control d-block"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="gigEndDate">
                                <DatePicker 
                                    selected={new Date()}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="form-control d-block"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group as={Row}>
                            <Col className="text-right">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default GigForm