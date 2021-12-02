import React, {useEffect, useState} from 'react';
import {Chart} from 'react-google-charts';
import {Container, Skeleton, Typography} from '@mui/material';
import '@fontsource/heebo';

const BarChart = () => {
    const [barData, setBarData] = useState(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const defaultColors = {
        5: 'initial',
        6: 'initial',
        7: 'initial',
        8: 'initial',
        9: 'initial',
        10: 'initial',
        11: 'initial',
        12: 'initial',
        13: 'initial',
        14: 'initial',
        15: 'initial',
        16: 'initial',
        17: 'initial',
        18: 'initial',
        19: 'initial',


    }
    const [barColor, setBarColor] = useState(defaultColors);


    useEffect(()=> {},[barColor])
    useEffect(() => {
        barDataFetch();
        const date = new Date();
        const hours = date.getHours()

        if (hours <= 19 && hours >= 5) {
            setBarColor({...defaultColors, [hours]: 'DarkMagenta'})
            console.log('osuu ikkunaan', barColor, hours)
        }
    }, []);
    const barDataFetch = async () => {
        let data = [];
        try {
            const response = await fetch('/data/metrici.json');
            const json = await response.json();
            const obj = Object.values(json);
            console.log('new array', obj);
            data = obj.map((x) => Math.round(x + 3.7));
            console.log('finaali array', data);
            setBarData(data);
        } catch (err) {
            console.log('barDataFetch error', err.message);
        }
    };
    return (
        <Container disableGutters={true}
                   sx={{
                       margin: 0,
                       overflow: 'hidden',
                       maxWidth: 'none !important',
                       textAlign: 'center',
                       backgroundColor: '#f2f2f2',
                       padding: '1rem 0'
                   }}>
            <Typography variant={'h5'} fontFamily={'Heebo'}>Edellisen päivän paikkatilanne</Typography>
            <Chart
                chartType={'ColumnChart'}
                width={'100%'}
                height={'100%'}
                data={[
                    ['Kellonaika', '%', {role: 'style'}],
                    ['05', barData[5], barColor["5"]],
                    ['06', barData[6], barColor["6"]],
                    ['07', barData[7], barColor["7"]],
                    ['08', barData[8], barColor["8"]],
                    ['09', barData[9], barColor["9"]],
                    ['10', barData[10], barColor["10"]],
                    ['11', barData[11], barColor["11"]],
                    ['12', barData[12], barColor["13"]],
                    ['13', barData[13], barColor["13"]],
                    ['14', barData[14], barColor["14"]],
                    ['15', barData[15], barColor["15"]],
                    ['16', barData[16], barColor["16"]],
                    ['17', barData[17], barColor["17"]],
                    ['18', barData[18], barColor["18"]],
                    ['19', barData[19], barColor["19"]],
                ]}
                options={{
                    backgroundColor: '#f2f2f2',
                    bar: {groupWidth: '93%'},
                    animation: {
                        startup: true,
                        duration: 700,
                        easing: 'out'
                    },
                    chartArea: {
                        width: '80%',
                        height: '60%',
                    },
                    hAxis: {
                        title: 'Klo',
                    },
                    vAxis: {
                        maxValue: 100,
                        format: '#\'%\'',
                    },
                    legend: {position: 'none'},
                }
                }
            />
        </Container>
    );
};

export default BarChart;