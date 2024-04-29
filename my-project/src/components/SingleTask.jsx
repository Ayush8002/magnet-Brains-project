import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGetSingleTaskQuery } from '../redux/APIs/taskapi'

const SingleTask = () => {
    const params = useParams()

    const { data } = useGetSingleTaskQuery({ id: params.id })

    return (
        <div className='flex justify-center items-center w-screen h-[90vh]'>
            <div className='flex flex-col w-2/4 shadow-md px-6 py-6 gap-6'>
                <h4 className='mb-4 text-center font-semibold text-xl'>Task details</h4>
                <div className='flex flex-col'><span className='font-semibold'>Title</span><span>{data?.title}</span></div>
                <div className='flex flex-col'><span className='font-semibold'>Description</span><span>{data?.description}</span></div>
                <div className='flex flex-col'><span className='font-semibold'>Date</span><span>{data?.date}</span></div>
                <div className='flex flex-col'><span className='font-semibold'>Status</span><span>{data?.status}</span></div>
                <NavLink to={"/"} className={"mt-6"}>
                    <button className='bg-purple-800 text-white px-8 py-2'>Go back</button>
                </NavLink>
            </div>
        </div>
    )
}

export default SingleTask
