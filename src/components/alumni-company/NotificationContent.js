import React from 'react'

function NotificationContent({data}) {
    return (
        <div className='mx-4 sm:mx-0 '>
            {data.data.map((item, index) => (
                <div key={index} className='flex flex-col sm:flex-row bg-white border border-slate-200 p-4 mb-2 rounded-lg'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>{item.title}</h1>
                        <p className='text-[10px] text-slate-500 mb-4'>Recieved {item.Recieved} </p>
                        <div className='text-[12px] text-justify mr-8' dangerouslySetInnerHTML={{ __html: item.Content }} />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default NotificationContent