import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoLogOutOutline } from "react-icons/io5";
import { useLogoutMutation } from '../redux/APIs/userapi';
import { setLogout } from '../redux/features/userReducer';
import { toast } from 'react-toastify';


const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userState)

    const [logout] = useLogoutMutation()

    const logoutHandler = async () => {
        const res = await logout()
        if (res.data.success) {
            toast('🦄 Logout successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(setLogout())
        }
    }

    return (
        <div className='h-16 shadow-md flex justify-center items-center'>
            <div className='w-4/5 flex justify-between items-center'>
                <p className='text-base font-semibold capitalize'>{user.name}</p>
                <IoLogOutOutline className='text-xl cursor-pointer' onClick={logoutHandler} />
            </div>
        </div>
    )
}

export default Header
