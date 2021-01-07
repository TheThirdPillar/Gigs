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
import SubmissionTable from '../../components/SubmissionTable'

import { domain } from '../../config/config'

export default function Gigs() {

    const router = useRouter()

    const [isUserSession, setUserSession] = useState(Cookies.get('token'))
    const [gigsData, setGigsData] = useState(null)
    const [bookmarked, setBookmarked] = useState([])
    const [totalBookmarked, updateTotalCount] = useState(0)
    const [applications, updateApplications] = useState([])
    const [applied, setApplied] = useState([])
    const [totalApplied, updateAppliedCount] = useState(0)
    const [submitted, setSubmitted] = useState([])
    const [totalSubmitted, updateSubmittedCount] = useState(0)
    const [submissions, updateSubmissions] = useState([])
    const [totalSuccessGigs, updateTotalSuccess] = useState(0)
    // TODO: `updateSubmission` should also `updateSubmissions`

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
                            updateApplications(data.usergigmodels)
                        }

                        if (usergigmodel.status == 4) {
                            // Submitted 
                            // TODO: Might not be relevant, look into this later
                            let tempSubmitted = submitted
                            tempSubmitted.push(usergigmodel.gig)
                            setSubmitted(tempSubmitted)
                            updateSubmittedCount(submitted.length)
                            let tempSubmission = submissions
                            let submissionObject = {}
                            let gigId = usergigmodel.gig
                            submissionObject.gig = data.allGigs[data.allGigs.map((g) => {return g._id}).indexOf(gigId)]
                            submissionObject.submission = usergigmodel.submission
                            tempSubmission.push(submissionObject)
                            updateSubmissions(tempSubmission)
                            if (usergigmodel.submission.status === "1") updateTotalSuccess(totalSuccessGigs + 1)
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

    const updateSubmission = (id) => {
        // If id in applied, remove that, change count
        // decrease for applied, increase for submitted
        if (applied.includes(id)) {
            let tempApplied = applied
            tempApplied.splice(tempApplied.indexOf(id), 1)
            setApplied(tempApplied)
            updateAppliedCount(applied.length)
        }
        let tempSubmitted = submitted
        tempSubmitted.push(id)
        setSubmitted(tempSubmitted)
        updateSubmittedCount(submitted.length)
    }

    const filterAvailableGig = (gig) => {
        return (!applied.includes(gig._id) && !submitted.includes(gig._id))
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
                        count={totalSuccessGigs}
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
                        count={totalSubmitted}
                        title="# Total Submissions" 
                    />
            </Row>
            <Row>
                <Col>
                    <Tabs fill variant="tabs" defaultActiveKey="gigs" className="mt-4">
                        <Tab eventKey="gigs" title="Gigs">
                            <GigsSearchResultSection gigs={gigsData.filter(filterAvailableGig)} isUserSession={isUserSession} isAdmin={false} bookmarked={bookmarked} updateBookmarked={(action, id) => handleBookmarkUpdate(action, id)} updateApplied={(id) => updateApplied(id)}/>
                        </Tab>
                        <Tab eventKey="applied" title="Applied">
                            <GigsSearchResultSection gigs={gigsData.filter(filterAppliedGig)} isUserSession={isUserSession} isAdmin={false} applied={true} applications={applications} updateSubmission={(id) => updateSubmission(id)} />
                        </Tab>
                        <Tab eventKey="submissions" title="Submissions">
                            <SubmissionTable submissions={submissions} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </DefaultLayout>
    )
}