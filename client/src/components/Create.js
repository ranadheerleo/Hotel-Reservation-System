import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_RESERVATION = gql`
    mutation AddReservation(
        $guestName: String!,
        $hotelName: String!,
        $arrivalDate: Date!,
        $departureDate: Date!) {
        addReservation(
            guestName: $guestName,
            hotelName: $hotelName,
            arrivalDate: $arrivalDate,
            departureDate: $departureDate) {
            _id
        }
    }
`;

class Create extends Component {
    render() {
      let guestName, hotelName, arrivalDate, departureDate;
      return (
        <Mutation mutation={ADD_RESERVATION} onCompleted={() => this.props.history.push('/')}>
            {(addReservation, { loading, error }) => (
                <div className="container">
                    <h1>Hotel reservation system!</h1><br></br>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD A NEW RESERVATION
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">RESERVATION LIST</Link></h4>
                            <form onSubmit={e => {
                                e.preventDefault();
                                addReservation({ variables: { guestName: guestName.value, hotelName: hotelName.value, arrivalDate: arrivalDate.value, departureDate: departureDate.value } });
                                guestName.value = "";
                                hotelName.value = "";
                                arrivalDate.value = "";
                                departureDate.value = "";
                            }}>
                                <div className="form-group">
                                    <label htmlFor="guestName">GuestName:</label>
                                    <input type="text" className="form-control" name="guestName" ref={node => {
                                        guestName = node;
                                    }} placeholder="GuestName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hotelName">HotelName:</label>
                                    <input type="text" className="form-control" name="hotelName" ref={node => {
                                        hotelName = node;
                                    }} placeholder="HotelName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="arrivalDate">ArrivalDate:</label>
                                    <input type="text" className="form-control" name="arrivalDate" ref={node => {
                                        arrivalDate = node;
                                    }} placeholder="HotelName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="departureDate">DepartureDate:</label>
                                    <input type="text" className="form-control" name="departureDate" ref={node => {
                                        departureDate = node;
                                    }} placeholder="DepartureDate" cols="80" rows="3" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;