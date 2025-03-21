import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/users/layouts/navbar/Navbar';
import Sidebar from '../components/admin/layouts/sidebar/sidebaruser';
import ProfilPage from '../components/users/profil/ProfilPage';
import { actionType } from '../redux/reducer/globalActionType';

// style homepage
import '../styles/homepage.css';
import '../styles/profil.css';
import '../styles/dashboard.css';

class Profil extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <div>
                    <Navbar showSidebarDispatch={this.props.showSidebarDispatch} />
                    <div className="main-container">
                        <ProfilPage />
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
