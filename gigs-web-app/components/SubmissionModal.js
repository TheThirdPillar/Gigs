import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { FaUpload, FaCheckCircle } from 'react-icons/fa'

import connectToExtension from '../utils/extension'
import { domain } from '../config/config'

export default function SubmissionModal(props) {
    
    const [userSkillSet, setUserSkillSet] = useState()
    const [inputFields, updateInputFields] = useState({
        userskilldata: null,
        encryptedSolution: null,
        encryptedSolutionKeyUser: null,
        encryptedSolutionKeyAdmin: null
    })
    useEffect(() => {
        if (!userSkillSet) {
            // Fetch userskilldata
            fetch(domain + '/application/listen/identity/getUserSkillData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status && data.status === 'SUCCESS') {
                    console.log(data.skills)
                    setUserSkillSet(data.skills)
                }
            })
        } 
    })

    const [logText, setLogText] = useState(null)
    const [isUploaded, toggleUploaded] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    useEffect(() => {
        if (selectedFile) setLoading(true)
        else setLoading(false)
    }, [selectedFile])

    // TODO: Isolate shield functions into a single file
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        if (isLoading) {
            let reader = new FileReader()
            reader.readAsDataURL(selectedFile)
            reader.onload = () => {
                let request = {}
                var filedata = reader.result
                request.query = "encrypt"
                request.data = filedata
                request.theirPublicKey = props.gig.postedBy.publicKey
                connectToExtension(request)
                .then((response) => {
                    if (response && response.status === 'SUCCESS') {
                        updateInputFields({...inputFields, encryptedSolution: response.encryptedFile, encryptedSolutionKeyUser: response.encryptedKey, encryptedSolutionKeyAdmin: response.theirEncryptedKey})
                        toggleUploaded(true)
                        setSelectedFile(null)
                    }
                })
            }
        }
    }, [isLoading])

    const handleChange = (e) => {
        e.preventDefault()
        let currentField = inputFields
        currentField[e.target.name] = e.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // TODO: Form validation and file remove etc.
        // TODO: Date validation etc.
        console.log(inputFields)
        console.log(props.gig._id)
        let request = {}
        request.encryptedSolution = inputFields.encryptedSolution
        request.encryptedSolutionKeyUser = inputFields.encryptedSolutionKeyUser
        request.encryptedSolutionKeyAdmin = inputFields.encryptedSolutionKeyAdmin
        request.userskilldata = inputFields.userskilldata
        request.gigId = props.gig._id
        fetch(domain + '/application/listen/gigs/gigSubmission', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'SUCCESS') {
                props.updateSubmission(props.gig._id)
                props.onHide()
            } else {
                setLogText('Unable to submit solution at the moment.')
                console.error(data)
            }
        })
    }

    if (!userSkillSet) return (
        <h6>Unable to fetch skill data from Identity.</h6>
    )

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
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} controlId="skillset">
                                <Form.Control as="select" placeholder="Select a skill set to endorse" name="userskilldata" className="form-control text-uppercase" onChange={(e) => handleChange(e)} required>
                                    <option value="Select a skill" selected disabled>Select a skill set from Identity</option>
                                    {
                                        userSkillSet?.map((skill, index) => {
                                            return <option value={skill._id} key={index} className="text-capitalize">{skill.data.associatedSkill}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} controlId="submission">
                                <input type="file" id="actual-btn" onChange={(e) => setSelectedFile(e.target.files[0])}  hidden></input>
                                {
                                    (isUploaded) ?
                                    <label htmlFor="actual-btn" className="btn btn-success w-100"><FaCheckCircle className="mb-1" /> Solution Uploaded</label>
                                    :
                                    <label htmlFor="actual-btn" className="btn btn-primary w-100"><FaUpload className="mb-1" />{isLoading ? ' Loading...' : ' Upload Solution'}</label>
                                }
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button type="submit" variant="dark" className="float-right" disabled={(!inputFields.userskilldata || !inputFields.encryptedSolution)}>Submit</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p><span className="text-danger">{logText}</span></p>
                </Modal.Footer>
            </Modal>
        </>
    )
}
