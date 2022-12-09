import React from 'react';
import Change from '../../../assets/homepage/change.png';

export default function Form() {
    return (
        <form action="" id='booking'>
            <ul>
                {/* <!-- departure --> */}
                <li>
                    <label htmlFor="departure">From</label>
                    <select name="departure" id="departure">
                        <option value="">Departure</option>
                    </select>
                </li>
                <li className='change-icon'>
                    <div>
                        <img src={Change} alt="" />
                    </div>
                </li>
                {/* <!-- destination --> */}
                <li>
                    <label htmlFor="destionation">To</label>
                    <select name="destionation" id="destionation">
                        <option value="">Destionation</option>
                    </select>
                </li>
                <li>
                    <div className="d-flex trip-date">
                        {/* <!-- trip --> */}
                        <div className="d-flex flex-column">
                            <label htmlFor="trip">Trip</label>
                            <select name="trip" id="trip" className="trip">
                                <option value="">Trip</option>
                                <option value="one-way">One Way</option>
                                <option value="round-trip">Round Trip</option>
                            </select>
                        </div>
                        {/* <!-- Date --> */}
                        <div className="d-flex flex-column">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" className="date" />
                        </div>
                    </div>
                </li>
                {/* <!-- Passenger --> */}
                <li>
                    <label htmlFor="passenger">Passenger / Class</label>
                    <select name="passenger" id="passenger">
                        <option value="">Passenger</option>
                        <option value="">1 Passenger, Economy</option>
                    </select>
                </li>
            </ul>
            <ul className="button">
                <li>
                    <button className="button_reset">Reset</button>
                </li>
                <li>
                    <button className="button_search">Fly Now</button>
                </li>
            </ul>
        </form>
    );
}
