import React from 'react';
import {Chart} from 'react-google-charts';
import {Skeleton} from '@mui/material';
import '@fontsource/heebo';

const BarChart = () => {
  return (
      <Chart
          chartType={'ColumnChart'}
          width={'100%'}
          height={'auto'}
          loader={<Skeleton/>}
          data={[
            ['Kellonaika', '%'],
            ['05', 20],
            ['06', 10],
            ['07', 30],
            ['08', 70],
            ['09', 90],
            ['10', 100],
            ['11', 100],
            ['12', 100],
            ['13', 85],
            ['14', 100],
            ['15', 80],
            ['16', 50],
            ['17', 30],
            ['18', 5],
            ['19', 0]
          ]}
          options={{
            backgroundColor: '#f2f2f2',
            title: 'Edellisen päivän paikkatilanne',
            titleTextStyle: {
              fontName: 'Heebo'
            },
            hAxis: {
              title: '\0',
            },
            vAxis: {
              maxValue: 100,
              format: '#%'
            },
            legend: {position: 'none'}
          }
          }
      />
  );
};

export default BarChart;
