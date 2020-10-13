import Head from 'next/head'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import DefaultLayout from '../layout/DefaultLayout'

export default function Home() {
  return (
    <DefaultLayout>
      <Head>
        <title>Gigs 1.0</title>
      </Head>
      <Row className="p-1 m-1">
        <Col xs={12} md={5} lg={5} className="align-middle">
          <Row>
            <h1>Find your next <span>Gig</span></h1>
          </Row>
        </Col>
        <Col xs={12} md={7} lg={7}>
          <Image
            src="/feedback.svg" fluid />
        </Col>
      </Row>
    </DefaultLayout>
  )
}
