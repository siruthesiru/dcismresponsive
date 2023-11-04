import React,  { useEffect } from 'react'
import './index.scss'
import TopBox from '../../../components/charts/topBox'
import { Box, Button } from '@mui/material';
import ChartBox from '../../../components/charts/chartBox';
//import { chartBoxAlumni, chartBoxCompanies, chartBoxUsers } from '../../../data/mockDashboardData';
import PieChartBox from '../../../components/charts/pieChartBox';
import PieGraphBox from '../../../components/charts/pieGraphBox';
import Header from '../../../components/header';
import LineChartBox from '../../../components/charts/lineChartBox';
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from '../../../services/dashboard';
//import jobIcon from '../../../assets/jobIcon.svg'
import userIcon from '../../../assets/userIcon.svg'
import alumniIcon from '../../../assets/alumniIcon.svg'
import companyIcon from '../../../assets/companyIcon.svg'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { totalAlumni, totalCompany, sumOfUsers } = useSelector((state) => state.adminDashboard);
    useEffect(() => {
        getStatistics(dispatch);
    }, [dispatch])

    const chartBoxUsers = {
        color: "#8884d8",
        icon: userIcon,
        title: "Total Users",
        number: sumOfUsers,
        link: "/dashboard",
        dataKey: "users",
        percentage: 100,
        chartData: [
            { name: "Sun", users: 400 },
            { name: "Mon", users: 600 },
            { name: "Tue", users: 500 },
            { name: "Wed", users: 700 },
            { name: "Thu", users: 400 },
            { name: "Fri", users: 500 },
            { name: "Sat", users: 450 },
        ],
    };

    const chartBoxAlumni = {
        color: "skyblue",
        icon: alumniIcon,
        title: "Total Alumni",
        number: totalAlumni,
        link: "/alumni",
        dataKey: "alumni",
        percentage: totalAlumni/sumOfUsers*100,
        chartData: [
            { name: "Sun", alumni: 400 },
            { name: "Mon", alumni: 600 },
            { name: "Tue", alumni: 500 },
            { name: "Wed", alumni: 700 },
            { name: "Thu", alumni: 400 },
            { name: "Fri", alumni: 500 },
            { name: "Sat", alumni: 450 },
        ],
    };

    const chartBoxCompanies = {
        color: "gold",
        icon: companyIcon,
        title: "Total Companies",
        number: totalCompany,
        link: "/companies",
        dataKey: "companies",
        percentage: totalCompany/sumOfUsers*100,
        chartData: [
            { name: "Sun", companies: 400 },
            { name: "Mon", companies: 600 },
            { name: "Tue", companies: 500 },
            { name: "Wed", companies: 700 },
            { name: "Thu", companies: 400 },
            { name: "Fri", companies: 500 },
            { name: "Sat", companies: 450 },
        ],
    };

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
                            <ChartBox {...chartBoxAlumni} />
                            <ChartBox {...chartBoxCompanies} />
                            <ChartBox {...chartBoxUsers} />
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