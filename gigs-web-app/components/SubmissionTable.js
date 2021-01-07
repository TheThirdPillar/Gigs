import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import connectToExtension from '../utils/extension'
import { domain } from '../config/config'

export default function SubmissionTable(props) {

    const viewSubmission = (submission) => {
        let request = {}
        request.query = "decrypt"
        request.data = {
            encryptedData: submission.submissionFile,
            encryptedKey: submission.submissionKeyUser,
            originalPublicKey: false
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

    return (
        <>
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gig Title</th>
                        <th>Status</th>
                        <th>Submission</th>
                        <th>Date of Submission</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.submissions.map((submission ,index) => {
                            return (
                                <tr key={index} className="mt-2">
                                    <td className="font-weight-bold mt-1">{index + 1}</td>
                                    <td className="font-weight-bold mt-1">{submission.gig.gigTitle}</td>
                                    <td className="font-weight-bold mt-1"><Badge className="p-2" pill variant={(submission.submission.status === "0") ? "warning" : (submission.submission.status === "1") ? "success" : "danger" }>{(submission.submission.status === "0") ? "PENDING" : (submission.submission.status === "1") ? "ACCEPTED" : "REJECTED"}</Badge></td>
                                    <td><Button variant="dark" size="sm" onClick={() => {viewSubmission(submission.submission)}}>View Submission</Button></td>
                                    <td className="font-weight-bold mt-1">{new Date(submission.submission.dateSubmission).toLocaleDateString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}