import React from 'react';
import placeholder from "../../assets/placeholder.png";


const AnnouncementCard = ({ announcement }) => {
    const { title, admin, posted_Date, description, file } = announcement;
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    const imgSrc = doc.querySelector('img')?.getAttribute('src');
    const videoSrc = doc.querySelector('video source')?.getAttribute('src');
    const noMediaAvailable = !imgSrc && !videoSrc;


    return (
        <div className='mx-4 sm:mx-0'>
            <div className='flex flex-col sm:flex-row bg-white border border-slate-200 p-4 mb-2 rounded-lg'>
                <div className='sm:w-[70%] flex flex-col'>
                    <h1 className='font-bold'>{title}</h1>
                    <p className='text-[10px] text-slate-500 mb-4'>
                        Posted by <span className='font-bold'>{admin.firstName + admin.lastName}</span> on {posted_Date}
                    </p>
                    <div className='text-[12px] text-justify mr-8' dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                {noMediaAvailable && (
                    <div className='mx-auto mt-4 sm:mt-0 items-center sm:w-[30%]'>
                        <img
                            src={placeholder}
                            alt='Placeholder'
                            className='w-full sm:w-[208px] sm:h-[140px] object-cover rounded-md'
                        />
                    </div>
                )}

                {imgSrc && (
                    <div className='mx-auto mt-4 sm:mt-0 items-center sm:w-[30%]'>
                        <img
                            src={imgSrc}
                            alt='description_image'
                            className='w-full sm:w-[208px] sm:h-[140px] object-cover rounded-md'
                        />
                    </div>
                )}

                {videoSrc && (
                    <div className='mx-auto mt-4 sm:mt-0 items-center sm:w-[30%]'>
                        <video controls>
                            <source src={videoSrc} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                <div className='mx-auto mt-4 sm:mt-0 items-center sm:w-[30%]'>
                    {file}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;
