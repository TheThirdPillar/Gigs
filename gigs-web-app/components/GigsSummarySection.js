import Row from 'react-bootstrap/Row'

import GigsSummaryCard from './GigsSummaryCard'

export default function GigsSummarySection(props) {
    return (
        <Row className="mt-4">
                <GigsSummaryCard
                    count="23321"
                    title="Total gigs available" 
                />
                <GigsSummaryCard
                    count="187"
                    title="Unique Skills" 
                />
                <GigsSummaryCard
                    count="42"
                    title="Categories" 
                />
                <GigsSummaryCard
                    count="129"
                    title="Total Organizations" 
                />
        </Row>
    )
}