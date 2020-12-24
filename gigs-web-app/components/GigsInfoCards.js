import { useState } from 'react'
import Cookies from 'js-cookie'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import { FaRupeeSign, FaRegHeart, FaHeart } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

import Logo from './Logo'

import style from '../styles/Gigs.module.css'

import { domain } from '../config/config'

export default function GigsInfoCards(props) {

    const [isBookmarked, toggleBookmark] = useState(props.bookmarked)
    const [bookmarkId, setBookmarkId] = useState(null)

    const updateBookmark = (state) => {
        let request = {}
        request.gig = props.gig._id
        if (state) {
            // create a usergig object
            fetch(domain + '/application/listen/gigs/bookmarkGig', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'SUCCESS') {
                    toggleBookmark(state)
                    setBookmarkId(data.bookmark)
                }
            })
        } else {
            // delete the usergig object
            fetch(domain + '/application/listen/gigs/removeBookmark/' +  bookmarkId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/jsonn',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'SUCCESS') {
                    toggleBookmark(state)
                    setBookmarkId(null)
                }
            })
        }
    }

    return (
        <>
            <Col xs={12} md={6} lg={4}>
                <Card 
                    bg="light"
                    text="black"
                    border="light"
                    className="m-2 p-2 text-center">
                    <Card.Body>
                        <Row className="m-1 mb-2 p-1 border-bottom">
                            <Col className="text-left text-muted text-nowrap">
                                {
                                    (props.gig?.gigType == 0) 
                                        ? <SiGooglescholar className="mb-1" />
                                        : <><FaRupeeSign className="mb-1" /><span className="font-weight-bold">{props.gig?.reward}</span></> 
                                }
                            </Col>
                            <Col className="text-right text-muted text-capitalize font-weight-bold">
                                {props.gig?.gigCategory}
                            </Col>
                        </Row>
                        <Card.Title>
                            <Logo />
                        </Card.Title>
                        <Card.Title className={style.gigTitle + " text-capitalize"}>
                            {props.gig?.gigTitle}
                            <br />
                            <small className={style.blueTextMedium + " text-capitalize"}>
                                {props.gig?.gigCommunity.name}
                            </small>
                        </Card.Title>
                        <Card.Text>
                            {
                                props.gig?.gigSkills.map((skill, index) => {
                                    return <Badge pill variant="dark" key={index} className="text-capitalize m-1">{skill}</Badge>
                                })
                            }
                        </Card.Text>
                        {
                            (props.isUserSession)
                                ? <Button variant="primary" onClick={props.showDetail}>View Detail</Button>
                                : <Button variant="primary">Login for Details</Button> 
                        }
                    </Card.Body>
                    <footer className="m-1 p-1 border-top">
                        <span className="text-muted">
                            Start Date: {new Date(props.gig?.gigStartDate).toDateString()}<br />
                            End Date: {new Date(props.gig?.gigEndDate).toDateString()}
                        </span>
                        <br />
                        {
                            (!props.isAdmin) 
                                ? (isBookmarked) ? <FaHeart className="cursor-pointer" onClick={() => updateBookmark(false)} /> : <FaRegHeart className="cursor-pointer" onClick={() => updateBookmark(true)} />
                                : ''
                        }
                    </footer>
                </Card>
            </Col>
        </>
    )
}