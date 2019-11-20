import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, Container, ButtonToolbar } from 'react-bootstrap'

export class ShowCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardContent: this.props.card,
            type: this.props.card.type
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(event.target.id)
        console.log(event.target.value);
        console.log(this.state.cardContent)
        console.log(this.state.type)
    }

    handleDelete = () => {
        for (let index = 0; index < this.props.deck.cards.length; index++) {
            if (this.props.deck.cards[this.props.card] == this.props.deck.cards[index]) {
                this.props.deck.cards.splice(index, 1)
            }
        }
        console.log(this.props.deck);
        this.props.onHide()
    }

    handleSubmit = () => {
        let newcard = { type: this.state.type, content: this.state.cardContent }
        console.log(newcard);
        for (let index = 0; index < this.props.deck.cards.length; index++) {
            console.log(index);
            if (this.props.deck.cards[this.props.card].content == this.props.deck.cards[index].content) {
                this.props.deck.cards[index] = newcard
            }
        }
        console.log(this.props.deck);
        this.props.onHide()
    }

    render() {
        if (this.props.deck.cards[this.props.card] != null) {
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
                                    <Col sm={10}>{this.props.deck.cards[this.props.card].content}</Col>
                                    <Col>
                                        <ButtonToolbar>
                                            <Button onClick={this.handleDelete}>
                                                Delete
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Row>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="cardContent" onInput={this.handleChange}>
                                    <Form.Label>Card Content</Form.Label>
                                    <Form.Control type="text" placeholder={this.props.deck.cards[this.props.card].content} />
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
        return null
    }
}

export default ShowCard
