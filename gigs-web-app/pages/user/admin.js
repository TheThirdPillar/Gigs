import Head from 'next/head'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import DefaultLayout from '../../layout/DefaultLayout'
import GigForm from '../../components/GigForm'

export default function Gigs() {
    return (
        <DefaultLayout isUserSession={true}>
            <Head>
                <title>
                    Gigs - Admin Page
                </title>
            </Head>
            <Tabs fill variant="tabs" defaultActiveKey="submissions" className="mt-4">
                <Tab eventKey="submissions" title="Sumissions">
                </Tab>
                <Tab eventKey="applications" title="Applications">
                </Tab>
                <Tab eventKey="post" title="Post New">
                    <GigForm />
                </Tab>
            </Tabs>
        </DefaultLayout>
    )
}