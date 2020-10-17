import Head from 'next/head'
import DefaultLayout from '../layout/DefaultLayout'

import GigsSummarySection from '../components/GigsSummarySection'
import GigsSearchResultSection from '../components/GigsSearchResultSection'

export default function Gigs() {
    return (
        <DefaultLayout>
            <Head>
                <title>
                    Gigs - Search
                </title>
            </Head>
            <GigsSummarySection />
            <GigsSearchResultSection />
        </DefaultLayout>
    )
}