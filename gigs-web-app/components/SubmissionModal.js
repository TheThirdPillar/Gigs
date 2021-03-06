import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { FaUpload, FaCheckCircle, FaPlusSquare } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'

import connectToExtension from '../utils/extension'
import { domain } from '../config/config'

const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)

export default function SubmissionModal(props) {
    
    const [userSkillSet, setUserSkillSet] = useState()
    const [inputFields, updateInputFields] = useState({
        userskilldata: null,
        externalLinks: [],
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

    const [linkInput, updateLinkInput] = useState('')
    const [linkError, setLinkError] = useState('')

    const handleLink = () => {
        if (linkInput == '') return
        if (inputFields.externalLinks.length >= 5) {
            setLinkError('Already 5 URLs added')
            return
        }
        if (isValidURL(linkInput)) {
            // Push to externalLinks
            let tempExternalLinks = inputFields.externalLinks
            tempExternalLinks.push(linkInput)
            updateInputFields({...inputFields, externalLinks: tempExternalLinks})
            updateLinkInput('')
        } else {
            setLinkError('Invalid URL format')
        }
    }

    const handleLinkRemove = (link) => {
        let tempExternalLinks = inputFields.externalLinks
        tempExternalLinks.splice(tempExternalLinks.indexOf(link), 1)
        updateInputFields({...inputFields, externalLinks: tempExternalLinks})
    }

    const handleLinkKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault()
            handleLink()
            return
        }
    }

    const isValidURL = (input) => {
        return input.match(regex)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // TODO: Form validation and file remove etc.
        // TODO: Date validation etc.
        let request = {}
        request.encryptedSolution = inputFields.encryptedSolution
        request.encryptedSolutionKeyUser = inputFields.encryptedSolutionKeyUser
        request.encryptedSolutionKeyAdmin = inputFields.encryptedSolutionKeyAdmin
        request.externalLinks = inputFields.externalLinks
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
                                    <option value="Select a skill" disabled>Select a skill set from Identity</option>
                                    {
                                        userSkillSet?.map((skill, index) => {
                                            return <option value={skill._id} key={index} className="text-capitalize">{skill.data.associatedSkill}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="links">
                                <InputGroup className="mb-1">
                                    <Form.Control type="url" placeholder="Add upto 5 external resource links here" name="links" value={linkInput} onChange={(e) => updateLinkInput(e.target.value)} onBlur={() => handleLink()} onFocus={() => setLinkError('')} onKeyDown={(e) => handleLinkKeyDown(e)} />
                                    <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => handleLink()} ><FaPlusSquare /></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text id="linkErrorBlock" className="text-danger">
                                    {linkError}
                                </Form.Text>
                                <Form.Text id="externalLinksBlock" className="text-success font-italic">
                                    {
                                        inputFields.externalLinks.map((l, i) => {
                                            return (
                                                <>
                                                    <p className="p-0 m-0" key={i}>
                                                        <a href="/">{l}</a>
                                                        <AiFillCloseCircle className="float-right mt-1 text-danger" onClick={() => {handleLinkRemove(l)}} />
                                                    </p>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Text>
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
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button type="submit" variant="dark" className="float-right" disabled={(!inputFields.userskilldata && (!inputFields.encryptedSolution || !inputFields.externalLinks))}>Submit</Button>
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
