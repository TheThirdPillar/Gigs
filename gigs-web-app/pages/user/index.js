import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Spinner from 'react-bootstrap/Spinner'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import DefaultLayout from '../../layout/DefaultLayout'
import BookmarkSection from '../../components/BookmarkSection'

import { domain } from '../../config/config'

export default function Gigs() {

    const router = useRouter()

    const [isUserSession, setUserSession] = useState(Cookies.get('token'))
    const [userData, setUserData] = useState()
    useEffect(() => {
        if (!userData && !isUserSession) return router.push('/')
        if (!userData && isUserSession) {
            fetch(domain + '/application/listen/gigs/getUserData', {
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
                } else {
                    return (<h2>Unable to fetch user data</h2>)
                }
            })
            .catch(error => {
                return (<h2>Unable to fetch user data</h2>)
            })
        }
    }, [isUserSession])

    if (!userData) return (
        <Spinner aninmation="grow" variant="primary" size="sm" style={{marginTop: '20%', marginLeft: '45%'}} />
    )

    return (
        <DefaultLayout isUserSession={isUserSession}>
            <Head>
                <title>
                    Gigs - Home
                </title>
            </Head>
            <Tabs fill variant="tabs" defaultActiveKey="home" className="mt-4">
                <Tab eventKey="home" title="Home">
                    <BookmarkSection />
                </Tab>
                <Tab eventKey="applied" title="Applied">
                </Tab>
                <Tab eventKey="search" title="Search">
                </Tab>
            </Tabs>
        </DefaultLayout>
    )
}