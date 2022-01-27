import React, { Component } from 'react'
import {
    // Card,
    // CardBody,
    // CardHeader,
    // CardFooter,
    // CardTitle,
    // CardText,
    Button,
    // Row,
    // Col,
    InputGroup,
    InputGroupText,
    Input,
    // ButtonGroup
} from 'reactstrap';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/requests";

class NewInternship extends Component {


    constructor(props) {
        super(props);


        this.state = {
            internship: {
                title: "",
                company: "",
                location: "",
                desctiption: "",
                pay: -1,
                payPerHour: false
            },
        };
    }
    

    handleTitleChange = async (event) => {
        var internship = {...this.state.internship};
        internship.title = event.target.value;
        await this.setState({internship});
    }
    
    handleCompanyChange = async (event) => {
        var internship = {...this.state.internship};
        internship.company = event.target.value;
        await this.setState({internship});
    }
    
    handleLocationChange = async (event) => {
        var internship = {...this.state.internship};
        internship.location = event.target.value;
        await this.setState({internship});
    }
    
    handleDescriptionChange = async (event) => {
        var internship = {...this.state.internship};
        internship.desctiption = event.target.value;
        await this.setState({internship});
    }

    handlePayChange = async (event) => {
        if(/^[0-9]+$/.test(parseFloat(event.target.value)) || event.target.value === '' || event.target.value[0] === '-')
        { 
            var internship = {...this.state.internship};
            internship.pay = parseFloat(event.target.value);
            await this.setState({internship});
        }
    }

    handlePayPerHourChange = async (event) => {
        var internship = {...this.state.internship};
        internship.payPerHour = event.target.value === "true";
        await this.setState({internship})
        console.log(JSON.stringify(this.state.internship));
    }

    
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

    async submitInternship() {

        var data = await this.props.POST('internships', this.state.internship);
        this.props.history.push("/internships");
    }

    

    render() {
        return (
            <div>
                <div className="newInternshipInputs">
                    <InputGroup>
                        <InputGroupText>
                            Title
                        </InputGroupText>
                        <Input placeholder="Internship Title..." value={this.state.internship.title} onChange={this.handleTitleChange} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            Company
                        </InputGroupText>
                        <Input placeholder="Company..." value={this.state.internship.company} onChange={this.handleCompanyChange} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            Location
                        </InputGroupText>
                        <Input placeholder="Internship Location..." value={this.state.internship.location} onChange={this.handleLocationChange} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            Description
                        </InputGroupText>
                        <Input placeholder="Internship Description..." value={this.state.internship.desctiption} onChange={this.handleDescriptionChange} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            Pay
                        </InputGroupText>
                        <Input placeholder="Pay..." type="number" value={this.state.internship.pay} onChange={this.handlePayChange} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText>
                            PayPerHour
                        </InputGroupText>
                        <div className="payPerHourWrapper">
                            <label>
                                <input className="payPerHourButtons" 
                                    type="radio" 
                                    name="payperhour" 
                                    value={true} 
                                    onChange={this.handlePayPerHourChange}
                                />Yes
                            </label>
                            <label>
                                <input className="payPerHourButtons" 
                                    type="radio" 
                                    name="payperhour" 
                                    value={false} 
                                    onChange={this.handlePayPerHourChange}
                                />No
                            </label>
                        </div>
                    </InputGroup>
                    <br />
                </div>
                <div className="submit">
                    <Button onClick={() => this.submitInternship()}
                            color='primary'
                    
                    >
                        Submit Internship
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(NewInternship);