import React, { Component } from 'react'
import { Modal, Button, Row, Col, Container, ButtonToolbar } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import Add from './Add'
import ShowCard from './ShowCard';
import './CustomCard.css';

export class ShowDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            formShow: false,
            cardShow: false,
            calledCard: 0
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/AddCustom' />
        }
    }

    getForm = () => {
        this.setState({ formShow: true })
    }

    getCard = () => {
        for (let index = 0; index < this.props.deck.cards.length; index++) {
            if (this.props.deck.cards[index].content == event.target.value) {
                this.setState({ calledCard: index })
                break
            }
        }
        this.setState({ cardShow: true })
    }

    handleDelete = () => {
        for (let index = 0; index < this.props.decklist.length; index++) {
            if (this.props.deck.name == this.props.decklist[index].name) {
                this.props.decklist.splice(index, 1)
            }
        }
        console.log(this.props.decklist);
        this.props.onHide()
    }

    render() {
        let formClose = () => this.setState({ formShow: false })
        let cardClose = () => this.setState({ cardShow: false })
        console.log(this.props.index);
        
        if (this.props.deck != null) {
            return (
                <div>
                    {this.renderRedirect()}

                    <Modal
                        {...this.props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <Row>
                                    <Col>{this.props.deck.name}</Col>
                                    <Col>
                                        <ButtonToolbar>
                                            <Button onClick={this.getForm}>
                                                Add
                                        </Button>
                                            <Add
                                                show={this.state.formShow}
                                                onHide={formClose}
                                                deck={this.props.deck}
                                            />
                                        </ButtonToolbar>
                                    </Col>
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
                        <Modal.Body className="deckWrapper">
                            <Container>
                                <Row>
                                    {this.props.deck.cards.map(c => {
                                        if (c.type == "white") {
                                            return (
                                                <Col xs="6" md="4">
                                                    <ButtonToolbar>
                                                        <Button className="CustomCard" variant="outline-dark" value={c.content} onClick={this.getCard}>
                                                            <h4 className="content">{c.content}</h4>
                                                        </Button>
                                                        <ShowCard
                                                            show={this.state.cardShow}
                                                            onHide={cardClose}
                                                            deck={this.props.deck}
                                                            card={this.state.calledCard}
                                                        />
                                                    </ButtonToolbar>
                                                </Col>
                                            )
                                        } else {
                                            return (
                                                <Col xs="6" md="4">
                                                    <ButtonToolbar>
                                                        <Button className="CustomCard" variant="dark" value={c.content} onClick={this.getCard}>
                                                            <h4 className="content">{c.content}</h4>
                                                        </Button>
                                                        <ShowCard
                                                            show={this.state.cardShow}
                                                            onHide={cardClose}
                                                            deck={this.props.deck}
                                                            card={this.state.calledCard}
                                                        />
                                                    </ButtonToolbar>
                                                </Col>
                                            )
                                        }
                                    })}
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        return null
    }
}

export default ShowDeck
