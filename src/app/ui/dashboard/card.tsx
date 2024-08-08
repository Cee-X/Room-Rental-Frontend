import {Card, CardTitle, CardDescription, CardPrice } from "@/app/utils/Card";

interface dashboardCardProps {
    title: string;
    value: number;
    IncreaseRate?: number;
    Icon : React.ComponentType<{className?: string}>;
}
export const DashboardCard = ({ title,Icon,value,IncreaseRate}:dashboardCardProps) => {
    return (
        <Card className="auto">
            <div className="flex flex-row justify-between items-center">
                <CardDescription className="text-md font-semibold">{title}</CardDescription>
                <Icon className="w-6 h-6 mr-4"/>
            </div>
            <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
            <CardPrice className="text-sm font-medium">
                {IncreaseRate && IncreaseRate > 0 ? `+${IncreaseRate}%` : IncreaseRate && IncreaseRate < 0 ? `${IncreaseRate}%` : '0%'} from last month
            </CardPrice>
        </Card>
    )
}