import React from 'react'
import './index.scss'
import TopBox from '../../../components/charts/topBox'
import { Box, Button } from '@mui/material';
import ChartBox from '../../../components/charts/chartBox';
import { chartBoxAlumni, chartBoxCompanies, chartBoxUsers } from '../../../data/mockDashboardData';
import PieChartBox from '../../../components/charts/pieChartBox';
import PieGraphBox from '../../../components/charts/pieGraphBox';
import Header from '../../../components/header';
import LineChartBox from '../../../components/charts/lineChartBox';

const Dashboard = () => {

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Dashboard" subtitle="Graphs and Charts" />
                    <Box display="flex" gap="15px">
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: "#221769" }}
                        >
                            Export Report
                        </Button>
                    </Box>
                </Box>
                <div className='dashboard'>
                    <div className='box1' >
                        <div className='container'>
                            <ChartBox {...chartBoxUsers} />
                            <ChartBox {...chartBoxAlumni} />
                            <ChartBox {...chartBoxCompanies} />
                        </div>
                    </div>
                    <div className=' box box2'>
                        <PieChartBox />
                    </div>
                    <div className=' box box2'>
                        <PieGraphBox />
                    </div>
                    <div className=' box box2'>
                        <TopBox />
                    </div>
                    <div className=' box box2'>
                        <LineChartBox />
                    </div>

                </div>
            </Box>
        </>

    )
}

export default Dashboard