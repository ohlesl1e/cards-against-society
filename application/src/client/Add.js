import React, { Component } from 'react'
import { Modal, Row, Col, Form, Button, ButtonToolbar } from 'react-bootstrap'

export class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardContent: "",
            type: ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(event.target.id)
        console.log(event.target.value)
        console.log(this.state.type)
    }

    handleSubmit = () => {
        console.log(this.state.type)
        let newcard = { type: this.state.type, content: this.state.cardContent }
        this.props.deck.cards.push(newcard)
        console.log(this.props.deck);
        this.props.onHide()
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Row>
                                <Col>New Card</Col>
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="cardContent" onInput={this.handleChange}>
                                <Form.Label>Card Content</Form.Label>
                                <Form.Control type="text" placeholder="Biggest blackest cock" />
                            </Form.Group>
                            <Form.Group as={Row} onInput={this.handleChange}>
                                <Form.Label as="legend" column sm={2}>
                                    Card Type
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        name="type"
                                        type="radio"
                                        id="type"
                                        label="white card"
                                        value="white"
                                    />

                                    <Form.Check
                                        name="type"
                                        type="radio"
                                        id="type"
                                        label="black card"
                                        value="black"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Add
