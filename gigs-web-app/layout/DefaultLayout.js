import Container from 'react-bootstrap/Container'

import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

function DefaultLayout(props) {
    return (
        <Container>
            <Topbar />
            <div>
                {props.children}
            </div>
            <Footer />
        </Container>
    )
}

export default DefaultLayout