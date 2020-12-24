import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Spinner from 'react-bootstrap/Spinner'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'

import DefaultLayout from '../../layout/DefaultLayout'
import GigsSummaryCard from '../../components/GigsSummaryCard'
import GigsSearchResultSection from '../../components/GigsSearchResultSection'

import { domain } from '../../config/config'

export default function Gigs() {

    const router = useRouter()

    const [isUserSession, setUserSession] = useState(Cookies.get('token'))
    const [gigsData, setGigsData] = useState(null)
    const [bookmarked, setBookmarked] = useState([])
    const [applied, setApplied] = useState([])
    const [submitted, setSubmitted] = useState([])

    useEffect(() => {
        if (!isUserSession) return router.push('/')
        if (isUserSession && !gigsData) {
            fetch(domain + '/application/listen/gigs/getGigsData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + isUserSession
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status && data.status == 'SUCCESS') {
                    // Do something
                    console.log(data)
                    data.usergigmodels.map((usergigmodel) => {
                        if (usergigmodel.status == 0) {
                            // Bookmarked
                            let tempBookmarked = bookmarked
                            tempBookmarked.push(usergigmodel.gig)
                            setBookmarked(tempBookmarked)
                        }
                    })
                    setGigsData(data.allGigs)
                } else {
                    return (<h2>Unable to fetch data</h2>)
                }
            })
            .catch((error) => {
                console.error(error)
                return (<h2>Unable to fetch data</h2>)
            })
        }
    }, [isUserSession])

    if (!gigsData) return (
        <Spinner aninmation="grow" variant="primary" size="sm" style={{marginTop: '20%', marginLeft: '45%'}}>Loading...</Spinner>
    )

    return (
        <DefaultLayout isUserSession={isUserSession} toggleSesion={(session) => setUserSession(session)}>
            <Head>
                <title>
                    Gigs - Home
                </title>
            </Head>
            <Row className="mt-4">
                    <GigsSummaryCard
                        count="2"
                        title="# Succefull Gigs" 
                    />
                    <GigsSummaryCard
                        count={bookmarked?.length}
                        title="# Bookmarked Gigs" 
                    />
                    <GigsSummaryCard
                        count="3"
                        title="# Active Gigs" 
                    />
                    <GigsSummaryCard
                        count="9"
                        title="# Awaiting Submission Response" 
                    />
            </Row>
            <Tabs fill variant="tabs" defaultActiveKey="gigs" className="mt-4">
                <Tab eventKey="gigs" title="Gigs">
                    <GigsSearchResultSection gigs={gigsData} isUserSession={isUserSession} isAdmin={false} bookmarked={bookmarked} />
                </Tab>
                <Tab eventKey="applied" title="Applied">
                    <GigsSearchResultSection />
                </Tab>
                <Tab eventKey="submissions" title="Submissions">
                    <GigsSearchResultSection />
                </Tab>
            </Tabs>
        </DefaultLayout>
    )
}