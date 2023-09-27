import React from 'react'

function Events({data}) {
    return (
        <div className='mx-4 sm:mx-0 '>
            {data.data.map((item, index) => (
                <div key={index} className='flex flex-col sm:flex-row bg-white border border-slate-200 p-4 mb-2 rounded-lg'>
                    <div className='sm:w-[70%] flex flex-col'>
                        <h1 className='font-bold'>{item.title}</h1>
                        <p className='text-[10px] text-slate-500 mb-4'>Posted by <span className='font-bold'>{item.Posted_by} </span>on {item.Posted_on}</p>
                        <div className='text-[12px] text-justify mr-8' dangerouslySetInnerHTML={{ __html: item.Content }} />
                    </div>

                    <div className='mx-auto mt-4 sm:mt-0 items-center sm:w-[30%]'>
                        <img
                            src={item.img}
                            alt={item.alt}
                            className='w-full sm:w-[208px] sm:h-[140px] object-cover rounded-md'
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Events

