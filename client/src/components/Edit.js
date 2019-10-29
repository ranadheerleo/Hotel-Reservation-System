import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_RESERVATION = gql`
    query reservation($reservationId: String) {
        reservation(id: $reservationId) {
            _id
            guestName
            hotelName
            arrivalDate
            departureDate
            updated_date
        }
    }
`;

const UPDATE_RESERVATION = gql`
    mutation updateReservation(
        $_id: String!,
        $guestName: String!,
        $hotelName: String!,
        $arrivalDate: Date!,
        $departureDate: Date!) {
        updateReservation(
        id: $_id,
        guestName: $guestName,
        hotelName: $hotelName,
        arrivalDate: $arrivalDate,
        departureDate: $departureDate) {
            updated_date
        }
    }
`;

class Edit extends Component {

  render() {
    let guestName, hotelName, arrivalDate, departureDate;
    return (
        <Query query={GET_RESERVATION} variables={{ reservationId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_RESERVATION} key={data.reservation._id} onCompleted={() => this.props.history.push(`/`)}>
                        {(updateReservation, { loading, error }) => (
                            <div className="container">
                                <h1>Hotel reservation system!</h1><br></br>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            EDIT RESERVATION
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        <h4><Link to="/" className="btn btn-primary">Resrevation List</Link></h4>
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            updateReservation({ variables: { _id: data.reservation._id, guestName: guestName.value, hotelName: hotelName.value, arrivalDate: arrivalDate.value,departureDate: departureDate.value } });
                                            guestName.value = "";
                                            hotelName.value = "";
                                            arrivalDate.value = "";
                                            departureDate.value = "";
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="guestName">GuestName:</label>
                                                <input type="text" className="form-control" name="GuestName" ref={node => {
                                                    guestName = node;
                                                }} placeholder="GuestName" defaultValue={data.reservation.guestName} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="hotelName">HotelName:</label>
                                                <input type="text" className="form-control" name="hotelName" ref={node => {
                                                    hotelName = node;
                                                }} placeholder="HotelName" defaultValue={data.reservation.hotelName} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="arrivalDate">ArrivalDate:</label>
                                                <input type="text" className="form-control" name="arrivalDate" ref={node => {
                                                    arrivalDate = node;
                                                }} placeholder="ArrivalDate" defaultValue={data.reservation.arrivalDate} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="DepartureDate">DepartureDate:</label>
                                                <input type="text" className="form-control" name="departureDate" ref={node => {
                                                    departureDate = node;
                                                }} placeholder="DepartureDate" defaultValue={data.reservation.departureDate} />
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
            }}
        </Query>
    );
  }
}

export default Edit;