import React, { useState, useEffect } from 'react';
import {
    redirect, useLocation, useNavigate, useParams,
    Link,
} from 'react-router-dom';
import { useHistory } from 'react-router-use-history';

import moment from 'moment';
import { io } from 'socket.io-client';
import {
    Home, LogOut, Bell, User, XCircle, X,
} from 'react-feather';
import { ArrowCircleDown, ArrowCircleRight } from 'iconsax-react';
import NavList from './NavList';
import UserCircle from '../../../assets/homepage/user-circle.png';
import { API } from '../../../services';
import Logo from '../../../assets/dasboard-admin/Logo.svg';
import Profile from '../../../assets/dasboard-admin/profile.svg';
import '../../../assets/homepageNavbar/css/style.css';
import '../../../assets/homepageNavbar/css/bootstrap.min.css';
// import './main/css/owl.carousel.min.css';
import '../../../assets/homepageNavbar/fonts/icomoon/style.css';
// import './main/js/jquery-3.3.1.min.js';
// import './main/js/bootstrap.min.js';
// import './main/js/jquery.sticky.js';
// import './main/js/main.js';
import '../../../styles/homepage.css';

export default function Navbar() {
    const [showNotifList, setShowNotifList] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const history = useHistory();

    const [notifications, setNotifications] = useState([]);
    const [count, setcount] = useState(0);
    const [userId, setUserId] = useState('');
    const [parseNotif, setParseNotif] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showUserAccess, setShowUserAccess] = useState(true);

    const [name, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [admin, setAdmin] = useState(false);
    const [login, setLogin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const token = localStorage.getItem('token');

    if (token) {
        useEffect(() => {
            fetch(`${import.meta.env.VITE_BASE_URL}/v1/whoami`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    data.roleId === 1 && setAdmin(true);
                    // setUser(data.data.user);
                    setUsername(data.name);
                    setImage(data.image);
                });

            if (!token) {
                setLogin(false);
            } else {
                setLogin(true);
            }
        }, []);
    }

    // notificaiton | socket.io
    if (location == '/' || location == `/search/flight/${id}` || location == `/search/flight/payment/${id}` && token) {
        const socket = io(`${import.meta.env.VITE_BASE_URL}`);

        useEffect(() => {
            setTimeout(() => {
                API.adminNotifications().then((notif) => {
                    // console.log('effect');
                    const notifs = notif.filter((notifs) => notifs.isRead == false);
                    setParseNotif(notifs.reverse());
                });
            }, 2000);

            !admin
                && API.userNotifications().then((notif) => {
                    const notifs = notif.filter((notifs) => notifs.isRead == false);
                    setParseNotif(notifs.reverse());
                });
        }, []);

        useEffect(() => {
            API.whoAmI().then((user) => {
                setUserId(user.id.toString());
            });

            socket.on('connect', () => {
                console.log('connected');
            });
        }, [count, notifications]);

        if (admin) {
            socket.emit('connected', 'admin');

            socket.on('notif-to-admin', (newNotif) => {
                setcount(count + 1);

                if (admin) {
                    API.adminNotifications().then((notif) => {
                        const notifs = notif.filter((notifs) => notifs.isRead == false);
                        setParseNotif(notifs.reverse());
                    });
                } else {
                    API.userNotifications().then((notif) => {
                        const notifs = notif.filter((notifs) => notifs.isRead == false);
                        setParseNotif(notifs.reverse());
                    });
                }

                setNotifications([newNotif, ...notifications]);
            });
        } else {
            socket.emit('connected', userId);

            socket.on('notif-to-user', (newNotif) => {
                setcount(count + 1);

                if (admin) {
                    API.adminNotifications().then((notif) => {
                        const notifs = notif.filter((notifs) => notifs.isRead == false);
                        setParseNotif(notifs);
                    });
                } else {
                    API.userNotifications().then((notif) => {
                        const notifs = notif.filter((notifs) => notifs.isRead == false);
                        setParseNotif(notifs);
                    });
                }

                setNotifications([newNotif, ...notifications]);
            });
        }
    }
    // console.log(count);
    // console.log(parseNotif);
    // notificaiton | socket.io

    const updateReadHandler = (id, message, bookingId) => {
        API.updateNotifications(id).then((notif) => console.log(notif));
    };

    const onLogoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/login');

        setTimeout(() => {
            window.location.reload();
        }, 200);
    };

    const setShowNotifListHandler = () => {
        showNotifList ? setShowNotifList(false) : setShowNotifList(true);
    };

    setTimeout(() => {
        setShowLogin(true);
    }, 3000);

    return (
        <div className={`${location !== '/' && 'bg-primary'}`}>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                        <span className="icon-close2 js-menu-toggle" />
                    </div>
                </div>
                <div className="site-mobile-menu-body" />
            </div>

            <div className={`site-navbar-wrap ${location !== '/' && 'bg-primary'}`}>
                {location === '/'
                    && (
                        <div className="site-navbar-top">
                            <div className="container py-3">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="d-flex mr-auto">
                                            <a href="#" className="d-flex align-items-center mr-4">
                                                <span className="icon-envelope mr-2" />
                                                <span className="d-none d-md-inline-block">info@domain.com</span>
                                            </a>
                                            <a href="#" className="d-flex align-items-center mr-auto">
                                                <span className="icon-phone mr-2" />
                                                <span className="d-none d-md-inline-block">+1 234 4567 8910</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6 text-right">
                                        <div className="mr-auto">
                                            <a href="#" className="p-2 pl-0"><span className="icon-twitter" /></a>
                                            <a href="#" className="p-2 pl-0"><span className="icon-facebook" /></a>
                                            <a href="#" className="p-2 pl-0"><span className="icon-linkedin" /></a>
                                            <a href="#" className="p-2 pl-0"><span className="icon-instagram" /></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                <div className={`site-navbar site-navbar-target js-sticky-header ${location !== '/' && 'second-navbar border-bottom fixed-top'}`}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-2">
                                <h1 className="my-0 site-logo"><a href="/">
                                    <img src={Logo} alt="" className="flypass-logo-update" />
                                </a></h1>
                            </div>
                            <div className="col-10">
                                <nav className="site-navigation text-right" role="navigation">
                                    <div className="container">

                                        {/* mobile notif */}
                                        {login
                                            && (
                                                <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3 mobile-notif" onClick={() => setShowNotifListHandler()}>
                                                    <Bell size={20} className={`text-white ${showSidebar && 'd-none'}`} />
                                                    {count + parseNotif.length != 0
                                                    && <div className={`notif-count notif-count__mobile ${showSidebar && 'd-none'}`}>{parseNotif.length + count}</div>}

                                                    {showNotifList
                                                    && (
                                                        <div className={`mobile-notif-drop rounded bg-light border ${showSidebar && 'd-none'}`}>
                                                            <h6 className="text-center py-3 border-bottom">Notifications</h6>

                                                            {[...parseNotif].reverse().slice(0, 4).map((notif) => (
                                                                <>
                                                                    {admin
                                                                        ? (
                                                                            <Link className="nav-link unread border-bottom" onClick={() => updateReadHandler(notif.id, notif.message, notif.bookingId)} to={`${`/transaction/${notif.bookingId}`}`}>
                                                                                <p>{notif.message}</p>
                                                                                <small>{moment(notif.updatedAt).format('LLLL')}</small>
                                                                            </Link>
                                                                        )
                                                                        : (
                                                                            <Link
                                                                              className="nav-link unread border-bottom" onClick={() => updateReadHandler(notif.id, notif.message, notif.bookingId)}
                                                                              to={`${notif.message == 'Waiting for payment'
                                                                                    ? `/search/flight/payment/${notif.bookingId}`
                                                                                    : `/user/dashboard/notification/${notif.bookingId}`}`}
                                                                            >
                                                                                <p>{notif.message}</p>
                                                                                <small>{moment(notif.updatedAt).format('LLLL')}</small>
                                                                            </Link>
                                                                        )}
                                                                </>
                                                            ))}

                                                            {admin
                                                                ? <Link to="/dashboard/notification" className="text-center py-3 read-more">Read more</Link>
                                                                : <Link to="/user/dashboard/notification" className="text-center py-3 read-more">Read more</Link>}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3" onClick={() => setShowSidebar(true)}>
                                            <div className={`site-menu-toggle__off js-menu-toggle__off text-white ${showSidebar && 'd-none'}`} role="button">
                                                <span className="icon-menu h3" />
                                            </div>
                                        </div>

                                        {/* desktop */}
                                        <ul className="site-menu main-menu js-clone-nav d-none d-lg-block">

                                            {location === '/'
                                                && (
                                                    <>
                                                        <li className="active"><a href="#home-section" className="nav-link">Home</a></li>
                                                        <li><a href="#classes-section" className="nav-link">My Booking</a></li>
                                                        <li><a href="#" className="nav-link">Service</a></li>
                                                        <li><a href="#" className="nav-link me-4">Contact</a></li>
                                                    </>
                                                )}

                                            {/* desktop notif */}
                                            {login
                                                && (
                                                    <>
                                                        {count + parseNotif.length === 0
                                                            ? (
                                                                <li>
                                                                    <a href="#" className="nav-link me-4 position-relative">
                                                                        <Bell size={20} />
                                                                    </a>
                                                                </li>
                                                            )
                                                            : (
                                                                <li className="has-children me-4 desktop-notif-drop">
                                                                    <a href="#" className="nav-link has-children__modify">
                                                                        <Bell size={20} />
                                                                    </a>
                                                                    {count + parseNotif.length != 0
                                                                && <div className="notif-count">{parseNotif.length + count}</div>}

                                                                    <ul className="dropdown arrow-top notif-dropdown rounded">
                                                                        <li className="text-center bg-light border-bottom py-3 text-dark rounded">Notifications</li>

                                                                        {[...parseNotif].reverse().slice(0, 4).map((notif) => (
                                                                            <>
                                                                                {admin
                                                                                    ? (
                                                                                        <Link className="nav-link text-decoration-none unread" onClick={() => updateReadHandler(notif.id, notif.message, notif.bookingId)} to={`${`/transaction/${notif.bookingId}`}`}>
                                                                                            <p>{notif.message}</p>
                                                                                            <small>{moment(notif.updatedAt).format('LLLL')}</small>
                                                                                        </Link>
                                                                                    )
                                                                                    : (
                                                                                        <Link
                                                                                          className="nav-link text-decoration-none unread" onClick={() => updateReadHandler(notif.id, notif.message, notif.bookingId)}
                                                                                            to={`${notif.message == 'Waiting for payment'
                                                                                                ? `/search/flight/payment/${notif.bookingId}`
                                                                                                : `/user/dashboard/notification/${notif.bookingId}`}`}
                                                                                        >
                                                                                            <p>{notif.message}</p>
                                                                                            <small>{moment(notif.updatedAt).format('LLLL')}</small>
                                                                                        </Link>
                                                                                    )}
                                                                            </>
                                                                        ))}

                                                                        {admin
                                                                            ? (
                                                                                <li>
                                                                                    <Link to="/dashboard/notification" className="text-center py-3 read-more">Read more</Link>
                                                                                </li>
                                                                            )
                                                                            : (
                                                                                <li>
                                                                                    <Link to="/user/dashboard/notification" className="text-center py-3 read-more">Read more</Link>
                                                                                </li>
                                                                            )}
                                                                    </ul>
                                                                </li>
                                                            )}
                                                    </>
                                                )}

                                            {showLogin
                                                && (
                                                    // eslint-disable-next-line react/jsx-no-useless-fragment
                                                    <>
                                                        {login == false
                                                            ? (
                                                                <>
                                                                    <li><Link to="/login" class="nav-link">Login</Link></li>
                                                                    <li><Link to="/register" class="nav-link">
                                                                        <span className="bg-primary text-white py-2 px-3 rounded shadow">Register</span>
                                                                    </Link></li>
                                                                </>
                                                            )
                                                            : (
                                                                <li className="has-children px-0">
                                                                    <a href="#" className="nav-link">
                                                                        <img src={Profile} alt="" width={35} />
                                                                        <span className="ms-2">Hi, {name}</span>
                                                                    </a>
                                                                    <ul className="dropdown arrow-top">
                                                                        <li>
                                                                            <Link to={`${admin ? '/dashboard' : '/user/dashboard/dashboarduser'}`} class="nav-link d-flex gap-2 text-secondary">
                                                                                <Home size={20} />
                                                                                <span className="nav-dropdown-item">Dashboard</span>
                                                                            </Link>
                                                                        </li>
                                                                        {!admin
                                                                    && (
                                                                        <li>
                                                                            <Link to="/user/dashboard/profile" class="nav-link d-flex gap-2 text-secondary">
                                                                                <User size={20} />
                                                                                <span className="nav-dropdown-item">Profile</span>
                                                                            </Link>
                                                                        </li>
                                                                    )}
                                                                        <li>
                                                                            <Link to="/login" class="nav-link d-flex gap-2 text-secondary" onClick={() => onLogoutHandler()}>
                                                                                <LogOut size={20} />
                                                                                <span className="nav-dropdown-item">Exit</span>
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            )}
                                                    </>
                                                )}

                                            <li><a href="#" className="nav-link position-absolute" /></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>
                {/* mobile */}
                <div className={`bg-light mobile-side ${showSidebar && 'mobile-side-show'}`}>
                    {/* icon close */}
                    <XCircle size={30} className="text-secondary float-right mt-4 me-4 shadow rounded-circle" role="button" onClick={() => setShowSidebar(false)} />
                    <div className="d-flex flex-column justify-content-end gap-4 mobile-side-item">
                        <div>Home</div>
                        <div>My Booking</div>
                        <div>Service</div>
                        <div>Contact</div>
                        {login == false
                            ? (
                                <>
                                    <div><Link to="/login" class="text-dark">Login</Link></div>
                                    <div><Link to="/register" class="mt-2 d-block">
                                        <span className="bg-primary text-white py-2 px-3 rounded shadow">Register</span>
                                    </Link></div>
                                </>
                            )
                            : (
                                <div>
                                    <a href="#" className="nav-link m-0 p-0">
                                        <img src={Profile} alt="" width={35} />
                                        <span className="ms-2 text-dark">Hi, {name}</span>
                                        {showUserAccess
                                            ? (
                                                <ArrowCircleRight
                                                    size={18}
                                                    className="text-secondary ms-3"
                                                    onClick={() => (showUserAccess ? setShowUserAccess(false) : setShowUserAccess(true))} role="button"
                                                />
                                            )
                                            : (
                                                <ArrowCircleDown
                                                    size={18}
                                                    className="text-secondary ms-3"
                                                    onClick={() => (showUserAccess ? setShowUserAccess(false) : setShowUserAccess(true))} role="button"
                                                />
                                            )}
                                    </a>
                                    <div className={`ms-4 mt-1 ${showUserAccess && 'd-none'}`}>
                                        <div>
                                            <Link to={`${admin ? '/dashboard' : '/user/dashboard/dashboarduser'}`} class="nav-link d-flex gap-2 text-secondary">
                                                <Home size={20} />
                                                <span className="nav-dropdown-item">Dashboard</span>
                                            </Link>
                                        </div>
                                        {!admin
                                        && (
                                            <div>
                                                <Link to="/user/dashboard/profile" class="nav-link d-flex gap-2 text-secondary">
                                                    <User size={20} />
                                                    <span className="nav-dropdown-item">Profile</span>
                                                </Link>
                                            </div>
                                        )}
                                        <div>
                                            <Link to="/login" class="nav-link d-flex gap-2 text-secondary" onClick={() => onLogoutHandler()}>
                                                <LogOut size={20} />
                                                <span className="nav-dropdown-item">Exit</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
