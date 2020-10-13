import Head from 'next/head'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

import DefaultLayout from '../layout/DefaultLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <DefaultLayout>
      <Head>
        <title>Gigs 1.0</title>
      </Head>
      <Row className="mt-4">
        <Col xs={12} md={6} lg={6}>
          <h1 className={styles.marginTop}>Find your next <span>Gig</span></h1>
          <Form className="mt-1 ml-2">
            <Form.Group as={Row} controlId="search">
              <Form.Control type="text" placeholder="Enter keyword" size="lg" autofocus="true" />
              <Form.Text className="text-muted">
                Search by skill or category
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={6} lg={6} className="d-none d-lg-block">
            <Image  
            src="/workFromAnywhere.svg" fluid />
        </Col>
      </Row>
      <Row>

      </Row>
    </DefaultLayout>
  )
}
