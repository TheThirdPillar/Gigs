import Head from 'next/head'
import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaSearch } from 'react-icons/fa'
import Typewriter from 'typewriter-effect'

import DefaultLayout from '../layout/DefaultLayout'
import styles from '../styles/Home.module.css'

export default function Home() {

  const options = ["clicking pictures.", "teaching your craft.", "taking zumba classes.", "talking to seals.", "writing code.", "anything."]

  return (
    <DefaultLayout>
      <Head>
        <title>Gigs 1.0</title>
      </Head>
      <Row className="mt-4">
        <Col xs={12} md={6} lg={6}>
          <h1 className={styles.marginTop}>Find your next <span className={styles.blueText}>GIG</span></h1>
          <Form className="mt-1 ml-2">
            <Form.Group as={Row} controlId="search">
              <InputGroup>
                <Form.Control type="text" placeholder="Enter keyword" size="lg" /> 
                <InputGroup.Append>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <Form.Text className="text-muted">
                Search by skill or category
              </Form.Text>
            </Form.Group>
          </Form>
          <h4>
            Why be one thing, when you can be <br /> 
            <span className={styles.blueText} id="changingText">
              <Typewriter
                options={{
                  strings: options,
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h4>
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
