import React from 'react';
import { TopJobs } from '../../../data/mockDashboardData';

import './index.scss';

const TopBox = () => {
    const top5Jobs = TopJobs.slice(0, 5); // Get the first 5 jobs

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
                            <span className='hired'>{`${job.hired} Hired`}</span>
                            <span className='slot'>{`${job.slot} Slot `}</span>
                        </div>
                    </div>
                ))}
                {TopJobs.length > 5 && ( // Display "View All" link if more than 5 jobs
                    <div className='listItem'>
                        <a href="/jobs">View All</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBox;
