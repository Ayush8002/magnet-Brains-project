import React, { useState } from 'react'
import { useGetMyTaskQuery } from '../redux/APIs/taskapi'
import { useDispatch, useSelector } from 'react-redux'
import { setDeleteTaskData, setShowDeleteDialog, setUpdateTaskData } from '../redux/features/taskReducer'
import DeleteDialog from './dialogs/DeleteDialog'
import { useNavigate } from 'react-router-dom'
import Loading from './loader/Loading'
import dayjs from "dayjs";
import { GoAlert } from "react-icons/go";

const TaskList = ({ data, isLoading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { showDeleteDialog } = useSelector((state) => state.taskState)


  const deleteDialog = (e) => {
    dispatch(setShowDeleteDialog(true))
    dispatch(setDeleteTaskData(e))

  }

  const editHandler = async (e) => {
    dispatch(setUpdateTaskData(e))
  }

  const singleTaskPageHandler = (e) => {
    navigate(`/singleTask/${e}`)
  }

  function formatDate(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>{isLoading ? (<Loading />) : data?.length ? (<div className='h-full shadow-lg p-4 mb-10'>
      {showDeleteDialog && <DeleteDialog />}
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Priority</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Title</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status</th>
                    <th scope="col" class="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Edit</th>
                    <th scope="col" class="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  {data?.map((curElem) => {
                    return (
                      <tr className=''>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 cursor-pointer">{curElem.priority ? (<div><GoAlert className='text-2xl font-semibold text-purple-700' /></div>) : (<p>Take Time</p>)}</td>
                        <td class="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-800 cursor-pointer" onClick={() => singleTaskPageHandler(curElem._id)}>{curElem.title}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatDate(curElem.date)}</td>
                        <td class={`px-6 py-4 whitespace-nowrap text-sm font-bold ${curElem.status === "pending" ? "text-red-700" : "text-green-700"}`}>{curElem.status}</td>
                        <td class="px-2 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" onClick={() => editHandler(curElem)}>Edit</button>
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none" onClick={() => deleteDialog(curElem)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>) : (<div>no Tasks</div>)}

    </>
  )
}

export default TaskList

