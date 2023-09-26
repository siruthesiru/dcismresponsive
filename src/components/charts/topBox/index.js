import React from 'react'
import { TopJobs } from '../../../data/mockDashboardData'

import './index.scss'

const TopBox = () => {
    return (
        <div className='topBox'>
            <h1 className="title">
                Most Common Jobs
            </h1>
            <div className='list '>
                {TopJobs.map((job) => (
                    <div className='listItem' key={job.id}>
                        <span className='position'>{job.position}</span>
                        <div className='details'>
                            <span className='hired'>{`${job.hired} Hired`}</span>
                            <span className='slot'>{`${job.slot} Slot `}</span>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default TopBox