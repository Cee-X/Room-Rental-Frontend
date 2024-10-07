import { Card, CardTitle,CardHeader, CardContent} from "@/components/ui/card"

interface dashboardCardProps {
    title: string;
    value: number;
    IncreaseRate?: number;
    Icon : React.ComponentType<{className?: string}>;
}

export const DataCard = ({ title,Icon,value,IncreaseRate}:dashboardCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value} </div>
                <p className="text-xs text-muted-foreground">
                    {IncreaseRate && IncreaseRate > 0 ? `+${IncreaseRate}%` : IncreaseRate && IncreaseRate < 0 ? `${IncreaseRate}%` : '0%'} from last month
                </p>
            </CardContent>
        </Card>
    )
}