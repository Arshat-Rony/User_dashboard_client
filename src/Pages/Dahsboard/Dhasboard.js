import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const Dhasboard = () => {
    const location = useLocation()
    const { id } = useParams()
    const pathname = `/dashboard/updateuser/${id}`
    return (
        <div>
            <div className='text-end mt-3'>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">- <br /> - <br /></label>
            </div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link className={`${location.pathname === '/dashboard/viewclients' || location.pathname === '/dashboard' ? 'bg-primary text-white' : ""}`} to={`/dashboard/viewclients`}>View Clients</Link></li>
                        {location.pathname === '/dashboard/viewclients' || location.pathname === '/dashboard' ? "" : <li><Link className={`${location.pathname === pathname && 'bg-primary text-white'}`} to={pathname}>Update User</Link></li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dhasboard;