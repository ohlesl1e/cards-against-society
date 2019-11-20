import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, Container, ButtonToolbar } from 'react-bootstrap'

export class ShowCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardContent: this.props.card,
            whitecard: false
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

    handleDelete = () => {
        for (let index = 0; index < this.props.deck.cards.length; index++) {
            if (this.props.card == this.props.deck.cards[index].content) {
                this.props.deck.cards.splice(index, 1)
            }
        }
        console.log(this.props.deck);
        this.props.onHide()
    }

    handleSubmit = () => {
        let newcard = { whitecard: this.state.whitecard, content: this.state.cardContent }
        for (let index = 0; index < this.props.deck.cards.length; index++) {
            if (this.props.card == this.props.deck.cards[index]) {
                this.props.deck.cards[index] = newcard
            }
        }
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
                                        name="whitecard"
                                        type="radio"
                                        id="whitecard"
                                        label="white card"
                                        value={true}
                                    />

                                    <Form.Check
                                        name="whitecard"
                                        type="radio"
                                        id="whitecard"
                                        label="black card"
                                        value={false}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDubmit}>Submit</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ShowCard
