import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const data = [
    { id: 1, type: "text", name: "name" },
    { id: 2, type: "email", name: "email" },
    { id: 3, type: "text", name: "mobile" },
]


const UpdateUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`https://user-dashboard-server.herokuapp.com/vouche/users/singleuser/${id}`)
            .then(res => {
                setUser(res.data.user)
            })
    }, [id])

    const onSubmit = (data) => {
        axios.put(`https://user-dashboard-server.herokuapp.com/vouche/users/update/${id}`, { data })
            .then(res => {
                if (res.data.user) {
                    navigate("/dashboard/viewclients")
                    toast.success('Successfully updated the user')
                }
                reset()
            })

    };

    return (
        <div className='mt-4'>
            <h2 className='text-center text-4xl font-bold'>Update Profile <br />
                of <span className='capitalize text-red-500'>{user.name}</span></h2>
            <form className='p-4 lg:p-0 ' onSubmit={handleSubmit(onSubmit)}>
                {
                    data.map(item =>
                        <div key={item.id} className='mt-4'>
                            <label htmlFor={item.name} className="block capitalize font-bold mb-2">{item.name}</label>
                            <input type={item.type} name={item.name} {...register(`${item.name}`, { required: true })}
                                aria-invalid={errors.name ? "true" : "false"} className="input min-w-[400px] lg:min-w-[500px] input-bordered w-full max-w-xs inline-block focus:outline-none" />
                            {errors.name?.type === 'required' && <p className=" text-red-500 capitalize">{item.name} is required</p>}
                        </div>
                    )
                }
                <button className="btn btn-primary block min-w-[200px] mt-4 mx-auto">Update</button>

            </form >
        </div >
    );
};

export default UpdateUser;