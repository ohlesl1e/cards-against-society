import React, { Component } from 'react'
import { Modal, Button, Row, Col, Container, ButtonToolbar } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

export class ShowDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
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

    render() {
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
                                        <Button onClick={this.setRedirect}>
                                            Add
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                {this.props.deck.cards.map(c => {
                                    return (
                                        <Col>
                                            {c}
                                        </Col>
                                    )
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
