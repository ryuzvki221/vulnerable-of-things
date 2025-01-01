import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import ReactApexChart, { BaseOptionChart } from '@/components/chart';
import merge from 'lodash/merge';

const CHART_HEIGHT = 400;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
}));

export default function EntriesChart({ data }) {
    const sortedData = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50);

    const labels = sortedData.map(([vendor]) => vendor);
    const series = sortedData.map(([, value]) => value);

    const chartOptions = merge(BaseOptionChart(), {
        xaxis: { categories: labels },
        legend: { show: false },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
            },
        },
    });

    return (
        <Card>
            <CardHeader
                title={'Entries'}
                subheader={`Grouping vulnerabilities by vendors helps to get an overview.`}
            />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart
                    type="bar"
                    series={[{ name: 'vuln', data: series }]}
                    options={chartOptions}
                    height={CHART_HEIGHT}
                />
            </ChartWrapperStyle>
        </Card>
    );
}

EntriesChart.propTypes = {
    data: PropTypes.object.isRequired,
};
