import Cookies from 'js-cookie'
import { useState } from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import connectToExtension from '../utils/extension'
import { domain } from '../config/config'

export default function SubmissionTable(props) {
    
    const [logText, setLogText] = useState()

    const viewSubmission = (submission) => {
        let request = {}
        request.query = "decrypt"
        request.data = {
            encryptedData: submission.submissionFile,
            encryptedKey: submission.submissionKeyAdmin,
            originalPublicKey: submission.submittedBy.publicKey
        }
        connectToExtension(request)
        .then(response => {
            if (response && response.status && response.status === 'SUCCESS') {
                let imageSource = response.decryptedData
                var image = new Image()
                image.src = imageSource
                var w = window.open("")
                w.document.write(image.outerHTML)
            } else {

            }
        })
    }

    const handleSubmission = (submission, action) => {
        // TODO: Use crypto signatures
        let request = {}
        request.status = action
        request.submissionId = submission._id
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
            <p className="text-danger">{logText}</p>
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gig Title</th>
                        <th>Status</th>
                        <th>Submission</th>
                        <th>Date of Submission</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.gigs?.map((gig) => {
                            return gig.submissions.map((submission, index) => {
                                return (
                            
                                    <tr key={index} className="mt-2">
                                        <td className="font-weight-bold mt-1">{index + 1}</td>
                                        <td className="font-weight-bold mt-1">{gig.gigTitle}</td>
                                        <td className="font-weight-bold mt-1"><Badge className="p-2" pill variant={(submission.status === "0") ? "warning" : (submission.status === "1") ? "success" : "danger" }>{(submission.status === "0") ? "PENDING" : (submission.status === "1") ? "ACCEPTED" : "REJECTED"}</Badge></td>
                                        <td><Button variant="dark" size="sm" onClick={() => {viewSubmission(submission)}}>View Submission</Button></td>
                                        <td className="font-weight-bold mt-1">{new Date(submission.dateSubmission).toLocaleDateString()}</td>
                                        <td><Button variant="success" size="sm" onClick={() => {handleSubmission(submission, "1")}} disabled={(submission.status !== "0")}>Accept</Button></td>
                                        <td><Button variant="danger" size="sm" onClick={() => {handleSubmission(submission, "0")}} disabled={(submission.status !== "0")}>Reject</Button></td>
                                    </tr>
                            
                                )
                            })
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}