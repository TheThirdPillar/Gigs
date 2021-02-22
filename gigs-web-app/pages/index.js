import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import CardGroup from 'react-bootstrap/CardGroup'

import { FaSearch, FaMobile, FaCertificate } from 'react-icons/fa'
import { RiHandCoinFill } from 'react-icons/ri'
import { SiReadthedocs, SiSkillshare } from 'react-icons/si'
import { CgCommunity } from 'react-icons/cg'
import { BsFilePost } from 'react-icons/bs'
import { GiPayMoney } from 'react-icons/gi'
import Typewriter from 'typewriter-effect'

import DefaultLayout from '../layout/DefaultLayout'
import ProcessCards from '../components/ProcessCards'
import styles from '../styles/Home.module.css'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Home() {

  const router = useRouter()
  const [isUserSession, setUserSession] = useState(false)
  useEffect(() => {
    if (isUserSession) {
      router.push('/user')
    }
  })

  const options = ["clicking pictures.", "teaching your craft.", "taking zumba classes.", "talking to seals.", "writing code.", "anything."]

  return (
    <DefaultLayout isUserSession={false} setUserSession={(session) => setUserSession(session)}>
      <Head>
        <title>Gigs 1.0</title>
      </Head>
      <Row className="mt-4">
        <Col xs={12} md={6} lg={6}>
          <h1 className={styles.marginTop}>Find your next <span className={styles.blueText}>GIG</span></h1>
          {/* <Form className="mt-1 ml-2">
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
          </Form> */}
          <h4>
            Jobs are cool, sure. But you could be <br />
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
      <Row className="justify-content-center mt-4">
        <h2><span className={styles.blueText}>THE PROCESS</span></h2>
      </Row>
      <Row className="mt-4">
        <Col xs={12} md={12} lg={12}>
          <CardGroup>
            <ProcessCards
              title={"Post a gig"}
              icon={<BsFilePost />}
              text="Community admins can post gigs, each with specific skill set, virtues and private (encrypted) documents. Each gig is accessible to our global audience."
            />
            <ProcessCards
              title={"Browse"}
              icon={<FaSearch />}
              text="As a member of the SkillsChain network, all our members have access to all the gigs from verified communities and organizations. Browse gigs to learn or earn. Admins can browse and accept submissions with ease."
            />
            <ProcessCards
              title={"Payment"}
              icon={<RiHandCoinFill />}
              text="Get paid on time, every time. Payment is transferred to you upon order completion. Although, both parties will have community verified Identity on our system, we ensure that you are rewarded for your capital or your labor."
            />
            <ProcessCards
              title={"Endorsements"}
              icon={<FaCertificate />}
              text="Gigs is tied to Identity, which means each successful Gig ( paid or otherwise ), earns you a verifiable endorsement for eternity on your skill-set and on your virtues."
            />
          </CardGroup>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <h2><span className={styles.blueText}>Roadmap</span></h2>
      </Row>
      <Row className="mt-4">
        <Col xs={12} md={12} lg={12}>
          <VerticalTimeline>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="June 2021 - July 2021"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<FaMobile />}
            >
              <h3 className="vertical-timeline-element-title">Mobile App</h3>
              <p>We understand that Gigs, more than anything else, goes hand-in-hand with mobile. We have started looking into it, and if you are someone who has an idea on how we can build this, do reach out to us.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="August 2021 - September 2021"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<SiReadthedocs />}
            >
              <h3 className="vertical-timeline-element-title">Open API</h3>
              <p>We also understand that in a community economy we need gigs and more gigs. And needless to say, one platform may not be enough. We want to be able to capture skill movement across the internet, thus an Open API is a must.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="October 2021 - January 2022"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<CgCommunity />}
            >
              <h3 className="vertical-timeline-element-title">Community Integration</h3>
              <p>Community by The Third Pillar is an idea under construction. We are building a decentralised community platform to power the frictionless skill movement. Community partners will be able to post tasks as gig accessible only to members, to learn or earn.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="February 2022 - March 2022"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<SiSkillshare />}
            >
              <h3 className="vertical-timeline-element-title">2-way bidding</h3>
              <p>2020 Nobel Laureates, Paul Milgrom and Robert Wilson, used two-sided auction to create a better system for spectrum allocation that worked for both parties involved (state & the market). We are building on the same framework to design a better gig allocation and time allocation of gig workers.</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Col>
      </Row>
    </DefaultLayout>
  )
}
