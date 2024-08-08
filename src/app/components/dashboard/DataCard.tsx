'use client'
import { DashboardCard } from "@/app/ui/dashboard/card";

import { getDashboardData, DashboardDataProps } from '@/app/service/action';

import { use, useEffect, useState } from "react";

import { UserGroupIcon, CurrencyDollarIcon,InboxIcon, HomeIcon } from "@heroicons/react/24/outline";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUpIcon } from "lucide-react"


    const chartConfig = {
    totalRevenue: {
      label: "total revenue",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const preprocessData = (data: any, year: string) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthlyData = months.map((month) => {
        const monthData = data.find((item: any) => item.month === `${month} ${year}`);
        return {
            month: `${month} ${year}`,
            totalRevenue: monthData?.totalRevenue?? 0
        }
    }
    )
    return monthlyData;
}

    const Dashboard = () => {
        const [data, setData] = useState<DashboardDataProps>();
        const [selectYear, setSelectYear] = useState<string>('2024');
        const [availableYears, setAvailableYears] = useState<string[]>([]);

        const fetchYears = async () => {
            try{
                const response = await getDashboardData();
                const years = response.monthlyData.map((item: any) => item.month.split(' ')[1]);
                const uniqueYears = Array.from(new Set(years)) as string[];
                setAvailableYears(uniqueYears);
                setSelectYear(uniqueYears[0]);
            }catch(error){
                console.log(error);
            }
        }

        useEffect(() => {
            fetchYears();
        }
        ,[])
    

        const fetchData = async (year : string, setData: any) => {
            try{
                const response = await getDashboardData();
                console.log(response);
                const processedData = preprocessData(response.monthlyData, year);
                setData({...response, monthlyData: processedData});
            }catch(error){
                console.log(error);
            }
        }
        useEffect(() => {
            if(selectYear){
                fetchData(selectYear, setData);
            }
        }, [selectYear])
    
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <DashboardCard 
                    title="Total Rooms" 
                    value={data?.totalRooms?? 0} 
                    Icon={HomeIcon}
                />
                <DashboardCard 
                    title="Total Bookings" 
                    value={data?.totalBookings?? 0} 
                    Icon={InboxIcon}
                    IncreaseRate={data?.bookingIncreaseRate}
                />
                <DashboardCard 
                    title="Total Users" 
                    value={data?.totalUsers?? 0} 
                    Icon={UserGroupIcon}
                />
                <DashboardCard 
                    title="Total Revenue" 
                    value={data?.totalRevenue?? 0} 
                    Icon={CurrencyDollarIcon}
                    IncreaseRate={data?.revenueIncreaseRate}
                />
            </div>
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                        <CardDescription>Select Year</CardDescription>
                        <select
                            value={selectYear}
                            onChange={(e) => setSelectYear(e.target.value)}
                            className="w-32 h-8 bg-gray-100 border border-gray-200 rounded px-2"
                        >
                            {availableYears.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={data?.monthlyData} barSize={30} >
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            
                            tickFormatter={(value = '') => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="totalRevenue" fill="blue" radius={8} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                        Trending up by {data?.revenueIncreaseRate}% this month <TrendingUpIcon className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">Showing monthly revenue for {selectYear}</div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
    }

    export default Dashboard
