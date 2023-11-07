import React from 'react';

const AnnouncementCard = ({ announcement }) => {
    const { title, posted_Date, description, file } = announcement;

    const handleDownload = (file) => {
        const linkSource = `data:application/pdf;base64,${file}`;
        const downloadLink = document.createElement('a');
        const fileName = 'moa.pdf';

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };


    return (
        <div className='mx-4 sm:mx-0'>
            <div className='flex flex-col sm:flex-row bg-white border border-slate-200 p-4 mb-2 rounded-lg'>
                <div className='sm:w-[70%] flex flex-col'>
                    <h1 className='font-bold'>{title}</h1>
                    <p className='text-[10px] text-slate-500 mb-4'>
                        Posted by <span className='font-bold'>Name of the post:</span> on {posted_Date}
                    </p>
                    <div className='text-[12px] text-justify mr-8' dangerouslySetInnerHTML={{ __html: description }} />
                    <div className='text-[12px] text-justify mr-8'>
                        <label className='text-[12px] text-justify mr-8' >Announcement File:</label>

                        {file !== "NULL" ? (
                            <button
                                className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                                onClick={() => handleDownload(file)}
                            >
                                Download File
                            </button>
                        ) : (
                            <span style={{ color: "gray" }}>No File Uploaded</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;
