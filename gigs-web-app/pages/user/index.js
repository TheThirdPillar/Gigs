import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Spinner from 'react-bootstrap/Spinner'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DefaultLayout from '../../layout/DefaultLayout'
import GigsSummaryCard from '../../components/GigsSummaryCard'
import GigsSearchResultSection from '../../components/GigsSearchResultSection'

import { domain } from '../../config/config'

export default function Gigs() {

    const router = useRouter()

    const [isUserSession, setUserSession] = useState(Cookies.get('token'))
    const [gigsData, setGigsData] = useState(null)
    const [bookmarked, setBookmarked] = useState([])
    const [totalBookmarked, updateTotalCount] = useState(0)
    const [applied, setApplied] = useState([])
    const [totalApplied, updateAppliedCount] = useState(0)
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
                            updateTotalCount(bookmarked.length)
                        }

                        if (usergigmodel.status == 1 || usergigmodel.status == 2 || usergigmodel.status == 3 ) {
                            // Applied
                            let tempApplied = applied
                            tempApplied.push(usergigmodel.gig)
                            setApplied(tempApplied)
                            updateAppliedCount(applied.length)
                        }

                        if (usergigmodel.status == 4) {
                            // Submitted
                            let tempSubmitted = submitted
                            tempSubmitted.push(usergigmodel.gig)
                            setSubmitted(tempSubmitted)
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

    const handleBookmarkUpdate = (action, id) => {
        let tempBookmarked = bookmarked
        if (action == 0) {
            tempBookmarked.push(id)
            setBookmarked(tempBookmarked)
            updateTotalCount(bookmarked.length)
        } else {
            let index = tempBookmarked.indexOf(id)
            tempBookmarked.splice(index, 1)
            setBookmarked(tempBookmarked)
            updateTotalCount(bookmarked.length)
        }
    }

    const updateApplied = (id) => {
        // If id in bookmarked, remove that, change count
        // then add it to applied
        if (bookmarked.includes(id)) {
            let tempBookmarked = bookmarked
            tempBookmarked.splice(tempBookmarked.indexOf(id), 1)
            setBookmarked(tempBookmarked)
            updateTotalCount(bookmarked.length)
        }
        let tempApplied = applied
        tempApplied.push(id)
        setApplied(tempApplied)
        updateAppliedCount(applied.length)
    }

    const filterAvailableGig = (gig) => {
        return !applied.includes(gig._id)
    }

    const filterAppliedGig = (gig) => {
        return applied.includes(gig._id)
    }

    return (
        <DefaultLayout isUserSession={isUserSession} toggleSesion={(session) => setUserSession(session)}>
            <Head>
                <title>
                    Gigs - Home
                </title>
            </Head>
            <Row className="mt-4">
                    <GigsSummaryCard
                        count="0"
                        title="# Succefull Gigs" 
                    />
                    <GigsSummaryCard
                        count={totalBookmarked}
                        title="# Bookmarked Gigs" 
                    />
                    <GigsSummaryCard
                        count={totalApplied}
                        title="# Applied Gigs" 
                    />
                    <GigsSummaryCard
                        count={submitted?.length}
                        title="# Awaiting Submission Response" 
                    />
            </Row>
            <Row>
                <Col>
                    <Tabs fill variant="tabs" defaultActiveKey="gigs" className="mt-4">
                        <Tab eventKey="gigs" title="Gigs">
                            <GigsSearchResultSection gigs={gigsData.filter(filterAvailableGig)} isUserSession={isUserSession} isAdmin={false} bookmarked={bookmarked} updateBookmarked={(action, id) => handleBookmarkUpdate(action, id)} updateApplied={(id) => updateApplied(id)}/>
                        </Tab>
                        <Tab eventKey="applied" title="Applied">
                            <GigsSearchResultSection gigs={gigsData.filter(filterAppliedGig)} isUserSession={isUserSession} isAdmin={false} applied={true} />
                        </Tab>
                        <Tab eventKey="submissions" title="Submissions">
                            <GigsSearchResultSection />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </DefaultLayout>
    )
}