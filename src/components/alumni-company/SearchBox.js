import React from 'react'
import { FaSearch } from "react-icons/fa";


function Search() {
    return (
        <div className='flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2'>
            <h1 className='font-bold '>Search Jobs</h1>

            <div className='flex items-center p-1 rounded-md shadow-md bg-slate-100'>
                <FaSearch size={15} className='mr-2' />
                <input
                    type='text'
                    name='text'
                    placeholder='search'
                    className='flex-grow w-full text-sm outline-none bg-slate-100'
                />
            </div>

        </div>
    )
}

export default Search