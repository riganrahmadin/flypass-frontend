import { ArrowCircleLeft2 } from 'iconsax-react'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../../services';
import NotFound from '../../notfound/NotFound';

export default function NotificationList() {

    const [notification, setNotification] = useState([]);

    useEffect(() => {
        API.adminNotifications().then((notif) => {
            setNotification(notif);
        })
    }, [])

    return (
        <div className='container-fluid pb-5'>

            <div className='admin-content px-lg-2'>
                {/* header label */}
                <div className='border rounded px-2 pt-md-3 px-md-3 pb-1 pt-3'>
                    <h2 className='fs-4'>All Notification</h2>
                    <p className='header-text fw-light col-12 col-lg-9'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias est vel explicabo. Nostrum alias explicabo aliquam veritatis sunt quasi hic repellendus ut error, non temporibus iste est quod facilis. Unde.</p>
                </div>

                {/* broadcrumb */}
                <div className="border rounded py-2 px-2 px-md-3 d-flex justify-content-between mt-3 admin-flight-broadcrumb">
                    <Link to={'/notification'} className="text-decoration-none text-dark d-flex btn gap-1 gap-md-2 ps-0 flex-wrap">
                        <ArrowCircleLeft2 size={20} />
                        <div className='label'>Notification</div>
                    </Link>
                </div>

                {notification.length === 0 ? <NotFound alert={'Notification'} /> :
                    <div className='mt-3 notification d-flex flex-column gap-3 card p-3'>
                        {notification.map((notif) => (
                            <div className={`card d-flex flex-row items-center unread ${notif.isRead && 'text-muted read'}`}>
                                <div className="card-body">
                                    <h4 className={`card-title`}>{notif.message}</h4>
                                    <small className='notif-date'>{moment(notif.updatedAt).format('LLLL')}</small>
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>
        </div >
    )
}
