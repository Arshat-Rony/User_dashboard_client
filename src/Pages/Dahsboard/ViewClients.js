import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useData from '../../utilitis/getdata';
import Loading from '../../utilitis/Loading';


const ViewClients = () => {
    const [clients, setClients] = useState([])
    let { data, setData } = useData(clients, setClients)
    const navigate = useNavigate()


    const handleDelete = (id) => {
        axios.delete(`https://user-dashboard-server.herokuapp.com/vouche/users/delete/${id}`)
            .then(res => {
                if (res.data.user) {
                    let newData = data.filter(user => user._id !== id)
                    setData(newData)
                    toast("User deleted successfully")
                }
            })
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div className='absolute top-10'>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full md:w-[900px]">
                    <thead>
                        <tr>
                            <th>Sr/No</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone No</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data ? data.map((user, index) =>
                                <tr className='' key={user._id}>
                                    <th>{index + 1}</th>
                                    <td className='capitalize'>{user.name}</td>
                                    <td>{user.email || <span className='text-accent'>Not Available</span>}</td>
                                    <td>{user.mobile || <span className='text-accent'>Not Available</span>}</td>
                                    <td><button onClick={() => navigate(`/dashboard/updateuser/${user._id}`)} className="btn btn-primary btn-sm">Update</button></td>
                                    <td><button onClick={() => handleDelete(user._id)} className="btn bg-red-700 border-none btn-sm">Delete</button></td>
                                </tr>
                            )
                                :
                                <Loading type="spin" color="red" />

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewClients;