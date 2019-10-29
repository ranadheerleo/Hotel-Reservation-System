import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_RESERVATIONS = gql`
  {
    reservations {
      _id
      guestName
      hotelName
    }
  }
`;

class App extends Component {

  render() {
    return (
      <Query query={GET_RESERVATIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="container">
                <h1>Welcome to Hotel reservation system!</h1><br></br>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF RESERVATIONS
                  </h3>
                  <h4><Link to="/create"  className="btn btn-success">Add Resrevation</Link></h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>GuestName</th>
                        <th>HotelName</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.reservations.map((reservation, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${reservation._id}`}>{reservation.guestName}</Link></td>
                          <td>{reservation.hotelName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
