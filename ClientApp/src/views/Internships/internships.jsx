import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
} from 'reactstrap'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/requests";


class Internships extends Component {
    constructor(props) {
        super(props);
        this.state = {
            internships: [],
            deck: []
        };
    }

    componentDidMount() {
        this.getInternships();
    }

    CreateCards(internship) {
        return (
            <Card key={internship.id}>
                <CardBody>
                    <CardTitle tag="h5">
                        <Col>
                            {internship.title}
                        </Col>
                        <Col>
                            <Button close
                                    onClick={() => this.deleteInternship(internship)}
                            ></Button>
                        </Col>
                    </CardTitle>
                    <Row><p className="company">Employer: {internship.company}</p></Row>
                    <Row><p className="description">Description: {internship.description}</p></Row>
                    <Row><p className="location">Location: {internship.location}</p></Row>
                    <Row><p className="pay">Pay: {internship.pay} / {internship.payPerHour ? "Hour" : "Job"}</p></Row>
                </CardBody>
            </Card>
        )
    }

    CreateDeck() {
        return (
            <div className="deck">
                {this.state.internships.map(ship => this.CreateCards(ship))}
            </div>
        )
    }

    async getInternships() {
        const { data: Item } = await this.props.GET('internships');
        if(Item) {
            console.log(Item);
            this.setState({ internships: Item });
            this.CreateDeck();
            
        } else {
            console.log('Could not get internships');
        }
    }

    async submitInternship() {

        var newInternship = {
            title: 'My New Title',
            company: 'My New Company',
            location: 'My New Location',
            description: 'My New Description',
            pay: 999.0,
            payPerHour: true
        };

        var data = await this.props.POST('internships', newInternship);

        console.log(data);
        this.getInternships();
    }

    async deleteInternship(internship) {
        var data = await this.props.DELETE('internships', internship);

        console.log(data);
        this.getInternships();
    }

    render() {
        return (
            <div>
                <div>
                    {this.CreateDeck()}
                </div>
                <div>
                    <Button onClick={() => this.getInternships()}
                            color='primary'
                    
                    >
                        Fetch Internships
                    </Button>

                    <Button onClick={() => this.submitInternship()}
                            color='primary'
                    
                    >
                        Submit Internship
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Internships);