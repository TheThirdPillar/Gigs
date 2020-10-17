import Form from 'react-bootstrap/Form'

export default function Filter(props) {
    return (
        <>
            <Form.Check
                type="checkbox"
                className="mb-2 mr-sm-2 d-inline"
                id="inlineFormCheck"
                label={props.label}
            />
        </>
    )
}