import Cookies from 'js-cookie'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import connectToExtension from '../utils/extension'
import { domain } from '../config/config'

export default function ApplicationTable(props) {

    // TODO: Two fetch requests are not needed, change to 1.
    const handleApplication = (application, action) => {
        if (action) {
            // Share the key
            let receiverPublicKey = application.user.publicKey
            let encryptedKey = application.gig.encryptedKey
            let request = {}
            request.query = 'share'
            request.data = {
                receiverPublicKey: receiverPublicKey,
                encryptedKey: encryptedKey
            }
            connectToExtension(request)
            .then(response => {
                if (response && response.status && response.status === 'SUCCESS'){
                    let request = {}
                    request.status = 2
                    request.application = application._id
                    request.sharedKey = response.sharedKey
                    fetch(domain + '/application/listen/gigs/handleApplication', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + Cookies.get('token')
                        },
                        body: JSON.stringify(request)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status && data.status == 'SUCCESS') {
                            props.updateApplications(data.application)
                        } else {
                            // TODO: Show error using toasts or something else.
                            console.error('Unable to accept application')
                        }
                    })
                }
            })
        } else {
            let request = {}
            request.status = 3
            request.application = application._id
            fetch(domain + '/application/listen/gigs/handleApplication', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status && data.status == 'SUCCESS') {
                    props.updateApplications(data.application)
                } else {
                    // TODO: Show error using toasts or something else.
                    console.error('Unable to accept application')
                }
            })
        }
    }

    return (
        <>
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gig Title</th>
                        <th>User</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.applications.map((application, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="font-weight-bold text-capitalize">{application.gig.gigTitle}</td>
                                    <td className="badge bg-primary text-wrap mt-2 text-white">{application.user.email}</td>
                                    <td><Button variant="primary" onClick={() => handleApplication(application, true)}>Accept</Button></td>
                                    <td><Button variant="danger" onClick={() => handleApplication(application, false)}>Reject</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>        
        </>
    )
}