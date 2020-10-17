import Container from 'react-bootstrap/Container'

import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

function DefaultLayout(props) {
    return (
        <Container>
            <Topbar isUserSession={props.isUserSession} />
            <div>
                {props.children}
            </div>
            {
                (!props.isUserSession) ? <Footer /> : <></>
            }
        </Container>
    )
}

export default DefaultLayout