'use client'
import { DashboardDataProps, getDashboardData } from '@/app/service/action';
import getBookingStatus from "@/app/utils/getBookingStatus";
import { DataCard } from "@/components/dashboard/card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { CurrencyDollarIcon, HomeIcon, InboxIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { TrendingUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
    totalRevenue: {
      label: "total revenue",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const preprocessData = (data: any) => {
    const monthlyData = data.reduce((acc: any[], item: any) => {
      const [month, year] = item.month.split(' ');
      acc.push({
        month: `${month} ${year}`,
        totalRevenue: item.totalRevenue,
        year: parseInt(year)
      });
      return acc;
    }, []);
    return monthlyData.sort((a: any, b: any) => a.year - b.year || a.month.localeCompare(b.month));
  };


    const Dashboard = () => {
        const [data, setData] = useState<DashboardDataProps>();
        const [recentBookings, setRecentBookings] = useState<any[]>([]);
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
                if (error instanceof AxiosError) {
                    console.log(error.response?.data);
                }
            }
        }

        useEffect(() => {
            fetchYears();
        }
        ,[])
    

        const fetchData = async (setData: any, setRecentBookings: any) => {
            try {
              const response = await getDashboardData();
              const processedData = preprocessData(response.monthlyData);
              setData({...response, monthlyData: processedData});
              setRecentBookings(response.recentBookings || []);
            } catch (error) {
              if (error instanceof AxiosError) {
                console.log(error.response?.data);
              }
            }
          };

        useEffect(() => {
            fetchData(setData, setRecentBookings);
        }, [selectYear])
    
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <DataCard 
                    title="Total Rooms" 
                    value={data?.totalRooms?? 0} 
                    Icon={HomeIcon}
                />
                <DataCard 
                    title="Total Bookings" 
                    value={data?.totalBookings?? 0} 
                    Icon={InboxIcon}
                    IncreaseRate={data?.bookingIncreaseRate}
                />
                <DataCard 
                    title="Total Users" 
                    value={data?.totalUsers?? 0} 
                    Icon={UserGroupIcon}
                />
                <DataCard 
                    title="Total Revenue" 
                    value={data?.totalRevenue?? 0} 
                    Icon={CurrencyDollarIcon}
                    IncreaseRate={data?.revenueIncreaseRate}
                />
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                tickFormatter={(value = '') => value.split(' ')[0].slice(0, 3)}
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
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentBookings && recentBookings.length > 0 ? (
                                <ul className="space-y-4">
                                    {recentBookings.map((booking, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{booking.user.name}</p>
                                                <p className="text-sm text-gray-500">{booking.room.title}</p>
                                            </div>
                                            <Badge>{getBookingStatus(new Date(booking.startDate), new Date(booking.endDate))}</Badge>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500">No recent bookings</p>
                                </div>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
    }

    export default Dashboard
