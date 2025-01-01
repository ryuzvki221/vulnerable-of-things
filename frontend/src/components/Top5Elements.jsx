import PropTypes from "prop-types";

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { fNumber } from '@/utils/format';

import ReactApexChart, { BaseOptionChart } from '@/components/chart';


// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 100;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        // flexdirection column
        display: 'flex',
        flexDirection: 'column',
        height: LEGEND_HEIGHT,
        alignContent: 'left',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
    '& .apexcharts-legend-text': {
        fontSize: '12px !important',
    },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [12244, 53345, 44313, 78343, 23333];

export default function Top5Elements(
    {
        title = '',
        data,
        labels,
        total

    }
) {
    const theme = useTheme();

    const chartOptions = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.info.lighter,
            theme.palette.error.main,
            theme.palette.warning.main,
        ],
        labels: labels ?? ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5'],
        stroke: { colors: [theme.palette.background.paper] },
        legend: { 
            floating: true,
            horizontalAlign: 'center',
            },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '87%',
                    labels: {
                        value: {
                            formatter: (val) => fNumber(val),
                        },
                        total: {
                            formatter: (w) => {
                                // const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return fNumber(total);
                            },
                        },
                    },
                },
            },
        },
    });

    return (
        <Card>
            <CardHeader title={`Current Top Five ${title}`} />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="donut" series={data ?? CHART_DATA} options={chartOptions} height={300}  />
            </ChartWrapperStyle>
        </Card>
    );
}


Top5Elements.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    labels: PropTypes.array,
    total: PropTypes.number

} 