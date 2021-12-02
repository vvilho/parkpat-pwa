import React, {useEffect, useState} from 'react';
import {Chart} from 'react-google-charts';
import {Container, Skeleton, Typography} from '@mui/material';
import '@fontsource/heebo';

const BarChart = () => {
  const [barData, setBarData] = useState(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    barDataFetch();
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
                 sx={{margin: 0, overflow: 'hidden', maxWidth: 'none !important', textAlign: 'center', backgroundColor: '#f2f2f2', padding: '1rem 0'}}>
        <Typography variant={'h5'} fontFamily={'Heebo'}>Edellisen päivän paikkatilanne</Typography>
        <Chart
            chartType={'ColumnChart'}
            width={'100%'}
            height={'100%'}
            data={[
              ['Kellonaika', '%'],
              ['05', barData[5]],
              ['06', barData[6]],
              ['07', barData[7]],
              ['08', barData[8]],
              ['09', barData[9]],
              ['10', barData[10]],
              ['11', barData[11]],
              ['12', barData[12]],
              ['13', barData[13]],
              ['14', barData[14]],
              ['15', barData[15]],
              ['16', barData[16]],
              ['17', barData[17]],
              ['18', barData[18]],
              ['19', barData[19]],
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
