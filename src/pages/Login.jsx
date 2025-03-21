import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/homepage/navbar/Navbar';
import LoginPage from '../components/login/LoginPage';
import Footer from '../components/homepage/footer/Footer';
import { actionType } from '../redux/reducer/globalActionType';

// style homepage
import '../styles/homepage.css';
import '../styles/login.css';

class Login extends Component {
    render() {
        return (
            <>
                <Navbar />
                <LoginPage />
                <Footer />

                {/* example using redux */}
                {/* <h4 className="text-primary fs-5">Tes Counter</h4>
                <div className="counter">
                    <button onClick={this.props.plusCounter}>+</button>
                    <h3>{this.props.counter}</h3>
                    <button onClick={this.props.minCounter}>-</button>
                </div> */}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
    plusCounter: () => dispatch({
        type: actionType.PLUS_COUNTER,
    }),
    minCounter: () => dispatch({
        type: actionType.MIN_COUNTER,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
