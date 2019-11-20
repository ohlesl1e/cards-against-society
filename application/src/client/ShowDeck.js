import React, { Component } from 'react'
import { Modal, Button, Row, Col, Container, ButtonToolbar } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import Add from './Add'

export class ShowDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            formShow: false,
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

    handleClick = () => {
        this.setState({ formShow: true })
    }

    render() {
        let formClose = () => this.setState({ formShow: false })
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
                                        <Button onClick={this.handleClick}>
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
                                    return (
                                        <Col>
                                            {c.content}
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
