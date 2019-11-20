import React, { Component } from 'react'
import { Modal, Button, Row, Col, Container, ButtonToolbar } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import Add from './Add'
import ShowCard from './ShowCard';

export class ShowDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            formShow: false,
            cardShow: false,
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
        this.setState({ cardShow: true })
    }

    render() {
        let formClose = () => this.setState({ formShow: false })
        let cardClose = () => this.setState({ cardShow: false })
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
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                {this.props.deck.cards.map(c => {
                                    if (c.whiteCard) {
                                        return (
                                            <Col>
                                                <ButtonToolbar>
                                                    <Button variant="outline-dark" onClick={this.getCard}>
                                                        {c.content}
                                                    </Button>
                                                    <ShowCard
                                                        show={this.state.cardShow}
                                                        onHide={cardClose}
                                                        deck={this.props.deck}
                                                        card={c.content}
                                                    />
                                                </ButtonToolbar>
                                            </Col>
                                        )
                                    }else{
                                        return (
                                            <Col>
                                                <ButtonToolbar>
                                                    <Button variant="dark" onClick={this.getCard}>
                                                        {c.content}
                                                    </Button>
                                                    <ShowCard
                                                        show={this.state.cardShow}
                                                        onHide={cardClose}
                                                        deck={this.props.deck}
                                                        card={c.content}
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
}

export default ShowDeck
