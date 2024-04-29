import React, { useEffect, useState } from 'react'
import { useCreateTaskMutation, useUpdateTaskMutation } from '../redux/APIs/taskapi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaRegStar } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState(false)
    const [status, setStatus] = useState("")
    const [errTitleMsg, setErrTitleMsg] = useState("")
    const [errDescriptionMsg, setDescriptionMsg] = useState("")

    const { updateTaskData } = useSelector((state) => state.taskState)

    useEffect(() => {
        if (updateTaskData) {
            setTitle(updateTaskData.title);
            setDescription(updateTaskData.description);
            setDate(updateTaskData.date);
            setPriority(updateTaskData.priority)
            setStatus(updateTaskData.status)
        }

    }, [updateTaskData])

    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrTitleMsg('')
        setDescriptionMsg('')
        const body = { title, description, date, priority, status }
        if (updateTaskData?._id) {
            const res = await updateTask({ id: updateTaskData?._id, body })
            if (res.data) {
                toast('🦄 Task updated successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTitle('')
                setDescription('')
                setDate('')
                setPriority(false)
                setStatus('')
            }
            if (res.error) {

            }
        } else {
            const res = await createTask({ body })
            if (res.data) {
                toast('🦄 Task created successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTitle('')
                setDescription('')
                setDate('')
                setPriority(false)
                setStatus('')
            }
            if (res.error.data) {
                res.error.data.errors.map((curE) => {
                    if (curE.path === 'title') {
                        setErrTitleMsg(curE.msg)
                    }
                    if (curE.path === 'description') {
                        setDescriptionMsg(curE.msg)
                    }
                    toast.error(`${curE.msg}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
            }
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-full my-4'>
                <h3 className='text-2xl font-semibold'>Tasks</h3>
                <form onSubmit={submitHandler} className='flex flex-col justify-center my-6 gap-6'>
                    <div className='flex items-center justify-between gap-6'>
                        <div className='flex items-center gap-6'>
                            <div className=''>
                                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                <input type="text" id="small-input" class="block w-full lg:w-72 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" value={title} placeholder="Write your title hear ..." onChange={(e) => setTitle(e.target.value)} />
                                <p className='text-red-800'>{errTitleMsg}</p>
                            </div>
                            <div className=''>
                                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Date</label>
                                <input type="date" id="small-input" class="block w-full lg:w-72 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" value={date} onChange={(e) => setDate(e.target.value)} inputFormat="DD/MM/YYYY" />
                            </div>
                            {updateTaskData?._id && <div className=''>
                                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                                <div className='flex gap-4 justify-center items-center'>
                                    <MdOutlinePendingActions className={`text-2xl cursor-pointer ${status === "pending" ? "text-red-800" : ""}`} onClick={() => setStatus("pending")} />
                                    <GrCompliance className={`text-xl cursor-pointer ${status === "completed" ? "text-green-800" : ""}`} onClick={() => setStatus("completed")} />
                                </div>
                            </div>}
                        </div>
                        <div className=''>
                            <FaRegStar className={`text-4xl cursor-pointer rounded-full p-2 ${priority ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setPriority(!priority)} />
                        </div>
                    </div>
                    <div className=''>
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your description hear ..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <p className='text-red-800'>{errDescriptionMsg}</p>
                    </div>
                    <button type='submit' className='bg-purple-700 p-2 w-40 text-white rounded-md font-semibold cursor-pointer'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTask
