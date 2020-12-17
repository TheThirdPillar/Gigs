import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import CardGroup from 'react-bootstrap/CardGroup'

import Testimonial from 'react-testimonial'
import { FaSearch, FaFileUpload, FaDesktop, FaMobile } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { RiHandCoinFill } from 'react-icons/ri'
import { SiReadthedocs, SiSkillshare } from 'react-icons/si'
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
              title={<FaSearch />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius diam sit amet diam hendrerit, vitae dapibus ligula consequat. Nam pretium tempus mauris a ultricies. Maecenas sagittis porta leo, id maximus nulla egestas volutpat. Sed tristique non augue varius sodales."
            />
            <ProcessCards
              title={<MdFavorite />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius diam sit amet diam hendrerit, vitae dapibus ligula consequat. Nam pretium tempus mauris a ultricies. Maecenas sagittis porta leo, id maximus nulla egestas volutpat. Sed tristique non augue varius sodales."
            />
            <ProcessCards
              title={<FaFileUpload />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius diam sit amet diam hendrerit, vitae dapibus ligula consequat. Nam pretium tempus mauris a ultricies. Maecenas sagittis porta leo, id maximus nulla egestas volutpat. Sed tristique non augue varius sodales."
            />
            <ProcessCards
              title={<RiHandCoinFill />}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius diam sit amet diam hendrerit, vitae dapibus ligula consequat. Nam pretium tempus mauris a ultricies. Maecenas sagittis porta leo, id maximus nulla egestas volutpat. Sed tristique non augue varius sodales."
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
              contentArrowStyle={{ borderRight: '7px solid  #ddd' }}
              date="January 2020"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<GiPayMoney />}
            >
              <h3 className="vertical-timeline-element-title">Bidding</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis placerat turpis, vitae vestibulum ipsum elementum non. Curabitur id ex.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="February 2020 - March 2020"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<SiSkillshare />}
            >
              <h3 className="vertical-timeline-element-title">SkillTokens</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis placerat turpis, vitae vestibulum ipsum elementum non. Curabitur id ex.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="April 2020"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<SiReadthedocs />}
            >
              <h3 className="vertical-timeline-element-title">Open API</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis placerat turpis, vitae vestibulum ipsum elementum non. Curabitur id ex.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="May 2020 - June 2020"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<FaDesktop />}
            >
              <h3 className="vertical-timeline-element-title">Desktop App</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis placerat turpis, vitae vestibulum ipsum elementum non. Curabitur id ex.</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement 
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="June 2020 - July 2020"
              iconStyle={{ background: '#fff', color: '#0003ff' }}
              icon={<FaMobile />}
            >
              <h3 className="vertical-timeline-element-title">Mobile App</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis placerat turpis, vitae vestibulum ipsum elementum non. Curabitur id ex.</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Col>
      </Row>
    </DefaultLayout>
  )
}
