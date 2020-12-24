import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Spinner from 'react-bootstrap/Spinner'

import DefaultLayout from '../../layout/DefaultLayout'
import GigForm from '../../components/GigForm'
import GigSearchResultSection from '../../components/GigsSearchResultSection'

import { domain } from '../../config/config'

export default function Admin() {

    const router = useRouter()

    const [isUserSession, setUserSession] = useState(Cookies.get('token'))
    useEffect(() => {
        if (!isUserSession) {
            router.push('/')
            return
        }

        fetch(domain + '/application/listen/gigs/getAdminData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + isUserSession
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'SUCCESS') {
                updatePostedGigs(data.gigs)
                setAdminCommunities(data.communities)
            } else {
                // TODO: Handle fetch failure
            }
        })

    }, [isUserSession])
    
    const [postedGigs, updatePostedGigs] = useState(null)
    const [adminCommunities, setAdminCommunities] = useState([])

    return (
        <DefaultLayout isUserSession={isUserSession} toggleSesion={(session) => setUserSession(session)}>
            <Head>
                <title>
                    Gigs - Admin
                </title>
            </Head>
            <Tabs fill variant="tabs" defaultActiveKey="all" className="mt-4">
                <Tab eventKey="all" title="All Gigs">
                    <GigSearchResultSection gigs={postedGigs} isUserSession={isUserSession} isAdmin={true} />
                </Tab>
                <Tab eventKey="submissions" title="Submissions">

                </Tab>
                <Tab eventKey="add" title="Add New">
                    <GigForm communities={adminCommunities} />
                </Tab>
            </Tabs>
        </DefaultLayout>
    )
}