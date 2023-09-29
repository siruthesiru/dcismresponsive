import React from 'react'
import './index.scss'
import TopBox from '../../../components/charts/topBox'
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import ChartBox from '../../../components/charts/chartBox';
import { chartBoxAlumni, chartBoxCompanies, chartBoxJobs, chartBoxUsers } from '../../../data/mockDashboardData';
import BarChartBox from '../../../components/charts/barChartBox';
import PieChartBox from '../../../components/charts/pieChartBox';
import PieGraphBox from '../../../components/charts/pieGraphBox';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div className='dashboard' >
            <div className=' box box1' style={{ backgroundColor: colors.primary[400] }}>
                <TopBox />
            </div>
            <div className=' box box2' style={{ backgroundColor: colors.primary[400] }}>
                <ChartBox {...chartBoxUsers} />
            </div>
            <div className=' box box3' style={{ backgroundColor: colors.primary[400] }}>
                <ChartBox {...chartBoxAlumni} />
            </div>
            <div className=' box box4' style={{ backgroundColor: colors.primary[400] }} >
                <PieChartBox />
            </div>
            <div className=' box box5' style={{ backgroundColor: colors.primary[400] }}>
                <ChartBox {...chartBoxCompanies} />
            </div>
            <div className=' box box6' style={{ backgroundColor: colors.primary[400] }}>
                <ChartBox {...chartBoxJobs} />
            </div>
            <div className=' box box7' style={{ backgroundColor: colors.primary[400] }}>
                <PieGraphBox />
            </div>
            <div className=' box box8' style={{ backgroundColor: colors.primary[400] }}>
                <BarChartBox />
            </div>


        </div>
    )
}

export default Dashboard