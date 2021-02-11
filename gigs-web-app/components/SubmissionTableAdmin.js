import Cookies from 'js-cookie'
import { useState } from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import connectToExtension from '../utils/extension'

import ReviewModal from './ReviewModal'

export default function SubmissionTable(props) {
    
    const [showReviewModal, toggleReviewModal] = useState(false)
    const [selectedSubmission, setSelectedSubmission] = useState({})
    const [selectedGig, setSelectedGig] = useState({})

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

    const handleReview = (submission, gig) => {
        setSelectedSubmission(submission)
        setSelectedGig(gig)
        toggleReviewModal(true)
    }

    const handleReviewModalClose = () => {
        toggleReviewModal(false)
        setSelectedSubmission({})
        setSelectedGig({})
    }

    return (
        <>  
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th>Gig Title</th>
                        <th>Status</th>
                        <th>Submission</th>
                        <th>external URLs</th>
                        <th>Date of Submission</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.gigs?.map((gig) => {
                            return gig.submissions.map((submission, index) => {
                                return (
                            
                                    <tr key={index} className="mt-2">
                                        <td className="font-weight-bold mt-1">{gig.gigTitle}</td>
                                        <td className="font-weight-bold mt-1"><Badge className="p-2" pill variant={(submission.status === "0") ? "warning" : (submission.status === "1") ? "success" : "danger" }>{(submission.status === "0") ? "PENDING" : (submission.status === "1") ? "ACCEPTED" : "REJECTED"}</Badge></td>
                                        <td><Button variant="dark" size="sm" onClick={() => {viewSubmission(submission)}} disabled={!submission.submissionFile}>View Submission</Button></td>
                                        <td className="mt-1">
                                            {
                                                (submission.externalURLs)
                                                    ? submission.externalURLs.map((url, index) => {
                                                        return <a href={url} target="_blank">External Link {index + 1}</a>
                                                    })
                                                    : <span>--</span>
                                            }
                                        </td>
                                        <td className="font-weight-bold mt-1">{new Date(submission.dateSubmission).toLocaleDateString()}</td>
                                        <td><Button variant="primary" size="sm" onClick={() => handleReview(submission, gig)} disabled={(submission.status !== "0")}>Review</Button></td>
                                    </tr>
                            
                                )
                            })
                        })
                    }
                </tbody>
            </Table>
            <ReviewModal submission={selectedSubmission} gig={selectedGig} show={showReviewModal} onHide={() => handleReviewModalClose()} />
        </>
    )
}