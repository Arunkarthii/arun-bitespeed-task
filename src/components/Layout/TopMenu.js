import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { IoIosNotifications } from 'react-icons/io'

function TopMenu() {
    return (
        <div>
            <div className='bg-white rounded-md p-3 px-5 w-full flex justify-between items-center'>
                <h1 className='flex items-center font-medium '><span className='me-2 text-blue-700'><FiMessageSquare size={28} /></span> Chatbot Flow Builder</h1>
                <div>
                    <div className='flex items-center'>
                        <span className='me-4'><IoIosNotifications size={22} /></span>
                        <div className='me-2 text-end text-slate-500'>
                            <h1 className='text-base p-0 m-0'>Arun Karthi</h1>
                            <p className='text-xs p-0 m-0'>Admin</p>
                        </div>
                        <img className='h-10 w-10 rounded-full' src="https://samsel.s3.amazonaws.com/deep/deeblue/get-start-bulid/file-17akn5g9z2ludwxb6h.jpg" alt="profile" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopMenu
