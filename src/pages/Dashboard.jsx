import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionType } from '../redux/reducer/globalActionType';
import Ticket from '../components/users/my-ticket/TicketBooking';

// style homepage
import '../styles/homepage.css';
import '../styles/profil.css';
import '../styles/dashboard.css';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends Component {
    render() {
        return (
            <Ticket showSidebarDispatch={this.props.showSidebarDispatch} />
        );
    }
}

const mapStateToProps = (state) => ({
    showSidebar: state.showSidebar,
});

const mapDispatchToProps = (dispatch) => ({
    showSidebarDispatch: () => dispatch({
        type: actionType.SHOW_SIDEBAR,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
