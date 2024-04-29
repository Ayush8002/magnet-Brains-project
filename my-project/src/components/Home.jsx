import React, { useState } from 'react'
import CreateTask from './CreateTask'
import TaskList from './TaskList'
import { useGetMyTaskQuery, useGetPriorityTasksQuery, useGetTaskDetailQuery } from '../redux/APIs/taskapi';
import Pagination from "react-js-pagination";

const Home = () => {
  const [task, setTask] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }


  const { isLoading: myTaskLoading, data: myTaskData } = useGetMyTaskQuery({ currentPage });
  const { data: taskDetailData } = useGetTaskDetailQuery()
  const { isLoading: priorityLoading, data: priorityData } = useGetPriorityTasksQuery();

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-4/5 h-full'>
        <CreateTask />
        <div className='flex items-center gap-20'><button className='px-10 py-2 bg-purple-500 rounded-md text-white' onClick={() => setTask(!task)}>{!task ? "MyTasks" : "Priority"}</button></div>
        {!task ? <TaskList data={myTaskData} isLoading={myTaskLoading} /> : <TaskList data={priorityData} isLoading={priorityLoading} />}

        {!task && (myTaskData?.length && <div className="flex justify-center pagination my-10">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={1}
            totalItemsCount={taskDetailData?.tasks / 5}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>)}
      </div>
    </div>
  )
}

export default Home
