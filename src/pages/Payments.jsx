import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Payment from '../components/homepage/payment/Payment';
import { actionType } from '../redux/reducer/globalActionType';

class Payments extends Component {
    render() {
        return (
            <Payment />
        );
    }
}

const mapStateToProps = (state) => ({
    notifCount: state.notifCount,
});

const mapDispatchToProps = (dispatch) => ({
    notifCountDispatch: () => dispatch({
        type: actionType.NOTIF_COUNT,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
