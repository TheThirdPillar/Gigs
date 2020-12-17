import Head from 'next/head'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import DefaultLayout from '../../layout/DefaultLayout'
import GigForm from '../../components/GigForm'

export default function Admin(props) {
    return (
        <DefaultLayout isUserSession={true}>
            <Head>
                <title>
                    Gigs - Admin
                </title>
            </Head>
            <Tabs fill variant="tabs" defaultActiveKey="all" className="mt-4">
                <Tab eventKey="all" title="All Gigs">

                </Tab>
                <Tab eventKey="submissions" title="Submissions">

                </Tab>
                <Tab eventKey="add" title="Add New">
                    <GigForm />
                </Tab>
            </Tabs>
        </DefaultLayout>
    )
}