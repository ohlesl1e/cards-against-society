import React, { Component } from 'react'
import { Modal, Row, Col, Form, Button, ButtonToolbar } from 'react-bootstrap'

export class AddDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deckName: ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(event.target.id)
        console.log(event.target.value);
        console.log(this.state.cardContent)
        console.log(this.state.whitecard)
    }

    handleSubmit = () => {
        let newDeck = { name: this.state.deckName, cards: [] }
        this.props.decklist.push(newDeck)
        console.log(this.props.decklist);
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
                                <Col>New Deck</Col>
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="deckName" onInput={this.handleChange}>
                                <Form.Label>Deck Name</Form.Label>
                                <Form.Control type="text" placeholder="Jozo's Class Reader" />
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

export default AddDeck
