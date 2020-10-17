import Row from 'react-bootstrap/Row'
import GigsSummaryCard from './GigsSummaryCard'

export default function BookmarkSection(props) {
    return (
        <>
            <Row className="mt-4">
                    <GigsSummaryCard
                        count="23"
                        title="Total Gigs Finished" 
                    />
                    <GigsSummaryCard
                        count="187"
                        title="Bookmarked" 
                    />
                    <GigsSummaryCard
                        count="3"
                        title="Active" 
                    />
                    <GigsSummaryCard
                        count="9"
                        title="Approaching Deadline" 
                    />
            </Row>
        </>
    )
}