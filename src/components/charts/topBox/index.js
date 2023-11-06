import React from 'react';

import './index.scss';

const TopBox = ({ data }) => {
    const top5Jobs = data ? data.slice(0, 5) : [];

    return (
        <div className='topBox'>
            <h1 className="title">
                Most Common Jobs
            </h1>
            <div className='list '>
                {top5Jobs.map((job) => (
                    <div className='listItem' key={job.id}>
                        <span className='position'>{job.position}</span>
                        <div className='details'>
                            <span className='invites'>{`${job?.totalNumberOfInvites ?? 0} Candidates`}</span>
                            <span className='slots'>{`${job.slots} Slot `}</span>
                        </div>
                    </div>
                ))}
                {top5Jobs.length > 5 && (
                    <div className='listItem'>
                        <a href="/jobs">View All</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBox;
