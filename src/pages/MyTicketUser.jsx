import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Ticket from '../components/users/my-ticket/Ticket';

// style dashboard
import '../styles/dashboard.css';
import '../styles/ticket.css';
import { actionType } from '../redux/reducer/globalActionType';

class MyTicketUser extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTicketUser);
