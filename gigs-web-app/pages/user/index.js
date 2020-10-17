import Head from 'next/head'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import DefaultLayout from '../../layout/DefaultLayout'
import BookmarkSection from '../../components/BookmarkSection'

export default function Gigs() {
    return (
        <DefaultLayout isUserSession={true}>
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