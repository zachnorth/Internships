import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Row,
    Col,
    InputGroup,
    Input,
	Form,
	FormGroup,
} from 'reactstrap';

import { mdiPenguin } from '@mdi/js';
import Icon from '@mdi/react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/requests.js';

import { registerWithEmailAndPassword, signIn } from "../../firebase";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		
	}


	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	async handleSubmit(e) {
		const user = await signIn(this.state.username, this.state.password);
		
		console.dir(user);

		this.props.history.push("/internships");
	}

	handleRegister(e) {
		registerWithEmailAndPassword("Zach North", this.state.username, this.state.password);
	}


	render() {
		return (
			<div className="login-page">
				<div className="content">
					<Row>
						<Col className="col-lg-4 col-md-6 mx-auto">
							<Card className="card-user card-login">
								<Form onKeyPress={this.submitHelper}>
									<FormGroup>
										<CardBody>
											<div className="login-header">
												<div className="block block-one" />
												<div className="block block-two" />
												<div className="block block-three" />
												<div className="block block-four" />
												<Row className="mt-5">
													<Col md="8" className="ml-auto mr-auto">
														<div className="center">
															<Icon
																path={mdiPenguin}
																size={6}
																color="orange"
															/>
														</div>
													</Col>
												</Row>
											</div>
											<Row className="mt-5">
												<Col md="8" className="ml-auto mr-auto">
													<InputGroup>
														<Input
															name="username"
															onChange={this.handleChange}
															value={this.state.username}
															placeholder="Username / Email"
															type="text"
														/>
													</InputGroup>

													<InputGroup>
														<Input
															name="password"
															onChange={this.handleChange}
															value={this.state.password}
															placeholder="Password"
															type="text"
														/>
													</InputGroup>
												</Col>
											</Row>
										</CardBody>
										<CardFooter>
											<Row className="mt-5 mb-3">
												<Col md="10" className="ml-auto mr-auto">
													<Button onClick={this.handleSubmit}
																	block
																	color="info"
													>
														Login
													</Button>
												</Col>
											</Row>
											<Row className="mt-5 mb-3">
												<Col md="10" className="ml-auto mr-auto">
													<Button onClick={this.handleRegister}
																	block
																	color="info"
													>
														Register
													</Button>
												</Col>
											</Row>
										</CardFooter>
									</FormGroup>
								</Form>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => state,
	(dispatch) => bindActionCreators(actionCreators, dispatch)
)(Login);