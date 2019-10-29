import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const DELETE_RESERVATION = gql`
  mutation removeReservation($id: String!) {
    removeReservation(id:$id) {
      _id
    }
  }
`;

class Show extends Component {

  render() {
    return (
        <Query query={GET_RESERVATION} variables={{ reservationId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <div className="container">
                        <h1>Hotel reservation system!</h1><br></br>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4><Link to="/">Reservation List</Link></h4>
                                <h3 className="panel-title">
                                {data.reservation.title}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>GuestName:</dt>
                                    <dd>{data.reservation.guestName}</dd>
                                    <dt>HotelName:</dt>
                                    <dd>{data.reservation.hotelName}</dd>
                                    <dt>ArrivalDate:</dt>
                                    <dd>{data.reservation.arrivalDate}</dd>
                                    <dt>DepartureDate:</dt>
                                    <dd>{data.reservation.departureDate}</dd>
                                    <dt>Last Updated:</dt>
                                    <dd>{data.reservation.updated_date}</dd>
                                </dl>
                                <Mutation mutation={DELETE_RESERVATION} key={data.reservation._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeReservation, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeReservation({ variables: { id: data.reservation._id } });
                                                }}>

                                                <Link to={`/edit/${data.reservation._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Show;