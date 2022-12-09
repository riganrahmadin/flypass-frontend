import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell } from "react-feather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Profile from '../../../../assets/dasboard-admin/profile.svg';
import Bel from '../../../../assets/homepage/bell.png';

export default function navbar() {
    return (
        <nav className='navbar navbar-expand topbar static-top card fixed-top border-end-0'>
            <div></div>
            <ul className='navbar-nav profile-dropdown ms-auto'>
                <li className="nav-item dropdown notification">
                    <a href="#" className='nav-link dropdown-toggle toggle-notif' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <Bell className='notification-icon' />
                    </a>
                    <ul className="dropdown-menu notif-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px" }} /> Message</a></li>
                        <li><a className="dropdown-item" href="#/notifuser"><img src={Bel} alt="bell icon" style={{ marginRight: "8px", width: "16px"}} /> Notification</a></li>
                    </ul>
                </li>
                <li className="nav-item dropdown user-profile">
                    <a href="#" className='nav-link dropdown-toggle link-profile' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='img-profile rounded-circle' src={Profile} alt="" />
                        <span className='d-none d-lg-inline text-name'>Hi, Pahrurozi</span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/profil">Profil</a></li>
                        <li><a className="dropdown-item" href="/myticket">My Tickets</a></li>
                        <li><a className="dropdown-item" href="transaction">Transaction</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}
