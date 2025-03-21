import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowCircleLeft2 } from 'iconsax-react';
import swal from 'sweetalert';
import { API } from '../../../services';
import Profile from '../../../assets/dasboard-admin/profile.svg';

export default function CustomerDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detailTransaction, setDetailTransaction] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [show, setShow] = useState(false);
    const [ShowTransaction, setShowTransaction] = useState(false);

    useEffect(() => {
        API.listBookings().then((bookings) => {
            const bookingID = bookings.filter((flight) => flight.id == id);
            setCustomer(bookingID);
            setShow(true);
        });

        API.transactionsGet().then((transaction) => {
            const IdFilter = transaction.filter((payment) => payment.bookingId == id);
            setDetailTransaction(IdFilter);
            setShowTransaction(true);
        });
    }, []);

    // console.log(detailTransaction);

    const handleConfirm = () => {
        API.confirmPayment(detailTransaction[0].id).then((res) => {
            swal({
                title: 'Confirm Payment Succeessfully!',
                text: '',
                icon: 'success',
                button: 'Ok!',
            });
            navigate('/transaction');
        });
    };

    const handleReject = () => {
        API.rejectPayment(detailTransaction[0].id).then((res) => {
            swal({
                title: 'Reject Payment Succeessfully!',
                text: '',
                icon: 'success',
                button: 'Ok!',
            });
            navigate('/transaction');
        });
    };

    return (
        <div>
            {show && (
                <div className="container-fluid pb-5">
                    <div className="admin-content px-lg-2">

                        {/* header label */}
                        <div className="border rounded px-2 pt-md-3 px-md-3 pb-1 pt-3">
                            <h2 className="fs-4">Transaction History</h2>
                            <p className="header-text fw-light col-12 col-lg-9">Halaman ini menampilkan detail transaksi dari salah satu customer, diantaranya menampilkan data personal, jadwal penerbangan dan total pembayaran.</p>
                        </div>

                        {/* broadcrumb */}
                        <div className="border rounded py-2 px-2 px-md-3 d-flex justify-content-between mt-3 admin-flight-broadcrumb">
                            <Link to="/transaction" className="text-decoration-none text-dark d-flex btn gap-1 gap-md-2 ps-0 flex-wrap">
                                <ArrowCircleLeft2 size={20} />
                                <div className="label">Transaction / Transaction Detail</div>
                            </Link>
                        </div>

                        <div className="card mt-3 p-2">
                            <div className="admin-customer-detail d-flex flex-column gap-2">
                                <section className="card p-3">
                                    <h5 className="border-bottom pb-2">Personal</h5>
                                    <img src={Profile} alt="" className="mt-3 mb-4" width={70} />
                                    <div className="data-list">
                                        <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                            <div className="data-item">
                                                <p className="data-item__name">Title</p>
                                                <p className="data-item__value">: {customer[0].PassengerContact.title}</p>
                                            </div>
                                            <div className="data-item">
                                                <p className="data-item__name">First Name</p>
                                                <p className="data-item__value">: {customer[0].PassengerContact.firstName}</p>
                                            </div>
                                            <div className="data-item d-md-none">
                                                <p className="data-item__name">Last Name</p>
                                                <p className="data-item__value">: {customer[0].PassengerContact.lastName}</p>
                                            </div>
                                            <div className="data-item">
                                                <p className="data-item__name">Last Name</p>
                                                <p className="data-item__value">: {customer[0].PassengerContact.lastName}</p>
                                            </div>
                                            <div className="data-item">
                                                <p className="data-item__name">Identity Type</p>
                                                <p className="data-item__value">: {customer[0].Passengers[0].identityType === 'ktp' ? customer[0].Passengers[0].identityType.toUpperCase() : customer[0].Passengers[0].identityType}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                            <div className="data-item">
                                                <p className="data-item__name">Identity Number</p>
                                                <p className="data-item__value">: {customer[0].Passengers[0].identityNumber}</p>
                                            </div>
                                            <div className="data-item">
                                                <p className="data-item__name">Phone</p>
                                                <p className="data-item__value">: {customer[0].PassengerContact.phone}</p>
                                            </div>
                                            <div className="data-item">
                                                <p className="data-item__name">Email</p>
                                                <p className="data-item__value">: {customer[0].PassengerContact.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {customer[0].roundtrip
                                    ? (
                                        <section className="card p-3">
                                            <h5 className="border-bottom pb-2">Departure Flight</h5>
                                            <div className="data-list">
                                                <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureAirport.city}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure Date</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureDate}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure Time</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureTime.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Duration</p>
                                                        <p className="data-item__value">: {customer[0].flight1.duration.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airport</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureAirport.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airplane</p>
                                                        <p className="data-item__value">: {customer[0].flight1.Airplane.model}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Booking Code</p>
                                                        <p className="data-item__value">: <b>{customer[0].bookingCode.toUpperCase()}</b></p>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival</p>
                                                        <p className="data-item__value">: {customer[0].flight1.arrivalAirport.city}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival Date</p>
                                                        <p className="data-item__value">: {customer[0].flight1.arrivalDate}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival Time</p>
                                                        <p className="data-item__value"> : {customer[0].flight1.departureTime.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Flight Type</p>
                                                        <p className="data-item__value">: {customer[0].flight1.FlightType.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airline</p>
                                                        <p className="data-item__value"> : {customer[0].flight1.Airline.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Passenger / Class</p>
                                                        <p className="data-item__value">: {customer[0].passengerQty} Passenger, {customer[0].flight1.FlightClass.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="border-bottom pt-3 pb-2">Return Flight</h5>
                                            <div className="data-list">
                                                <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure</p>
                                                        <p className="data-item__value">: {customer[0].flight2.departureAirport.city}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure Date</p>
                                                        <p className="data-item__value">: {customer[0].flight2.departureDate}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure Time</p>
                                                        <p className="data-item__value">: {customer[0].flight2.departureTime.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Duration</p>
                                                        <p className="data-item__value">: {customer[0].flight2.duration.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airport</p>
                                                        <p className="data-item__value">: {customer[0].flight2.departureAirport.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airplane</p>
                                                        <p className="data-item__value">: {customer[0].flight2.Airplane.model}</p>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival</p>
                                                        <p className="data-item__value">: {customer[0].flight2.arrivalAirport.city}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival Date</p>
                                                        <p className="data-item__value">: {customer[0].flight2.arrivalDate}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival Time</p>
                                                        <p className="data-item__value"> : {customer[0].flight2.departureTime.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Flight Type</p>
                                                        <p className="data-item__value">: {customer[0].flight2.FlightType.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airline</p>
                                                        <p className="data-item__value"> : {customer[0].flight2.Airline.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Passenger / Class</p>
                                                        <p className="data-item__value">: {customer[0].passengerQty} Passenger, {customer[0].flight2.FlightClass.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    )
                                    : (
                                        <section className="card p-3">
                                            <h5 className="border-bottom pb-2">Flight Schedule</h5>
                                            <div className="data-list">
                                                <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureAirport.city}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure Date</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureDate}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Departure Time</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureTime.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Duration</p>
                                                        <p className="data-item__value">: {customer[0].flight1.duration.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airport</p>
                                                        <p className="data-item__value">: {customer[0].flight1.departureAirport.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airplane</p>
                                                        <p className="data-item__value">: {customer[0].flight1.Airplane.model}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Booking Code</p>
                                                        <p className="data-item__value">: <b>{customer[0].bookingCode.toUpperCase()}</b></p>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival</p>
                                                        <p className="data-item__value">: {customer[0].flight1.arrivalAirport.city}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival Date</p>
                                                        <p className="data-item__value">: {customer[0].flight1.arrivalDate}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Arrival Time</p>
                                                        <p className="data-item__value"> : {customer[0].flight1.departureTime.slice(0, -3)}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Flight Type</p>
                                                        <p className="data-item__value">: {customer[0].flight1.FlightType.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Airline</p>
                                                        <p className="data-item__value"> : {customer[0].flight1.Airline.name}</p>
                                                    </div>
                                                    <div className="data-item">
                                                        <p className="data-item__name">Passenger / Class</p>
                                                        <p className="data-item__value">: {customer[0].passengerQty} Passenger, {customer[0].flight1.FlightClass.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                <section className="card p-3">
                                    <h5 className="border-bottom pb-2">Payment Substantiation</h5>
                                    {ShowTransaction
                                        && <div className="card"><img src={detailTransaction[0].Image} alt="" className="col-12 image-sub" /></div>}
                                </section>
                                <section className="card p-3">
                                    <h5 className="border-bottom pb-2">Payment</h5>
                                    <div className="data-list mt-2">
                                        <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                            <div className="data-item">
                                                <p className="data-item__name">Price</p>
                                                <p className="data-item__value">: Rp. {customer[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex flex-column gap-3 gap-md-0">
                                            <div className="data-item">
                                                <p className="data-item__name">Status</p>
                                                <p className="data-item__value">: <span className={`
                                                ${(customer[0].BookingStatus.name === 'Cancelled') ? 'text-danger'
                    : (customer[0].BookingStatus.name === 'Completed') ? 'text-success'
                        : (customer[0].BookingStatus.name === 'Paid') && 'paid'}`}
                                                >{customer[0].BookingStatus.name}</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {(customer[0].BookingStatus.name === 'Paid')
                                        && (
                                            <div className="d-flex justify-content-end">
                                                <div className="btn btn-success" style={{ fontSize: 14 }} onClick={() => handleConfirm()}>Confirm</div>
                                                <div className="btn btn-danger ms-2" style={{ fontSize: 14 }} onClick={() => handleReject()}>Reject</div>
                                            </div>
                                        )}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
