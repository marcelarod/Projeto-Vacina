import { useEffect, useState } from "react";

import Chart from 'react-apexcharts'
import moment from "moment";

import LabelForms from '../../../components/label'

import style from '../reports.module.css'

export default function ChartScheduleByPlaces({schedule}) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        const group = schedule.reduce((acc, item) => {
            if (!acc[item.Rooms.Places.name]) {
              acc[item.Rooms.Places.name] = [];
            }
            acc[item.Rooms.Places.name].push(item.length);
            return acc;
        }, {})
          
        let product =[]
        let name =[]
        for (let [area, schedule] of Object.entries(group)) {
            product.push(schedule.length)
            name.push(area)
        }
        setOptions({
            labels: name,
                plotOptions: {
                  pie: {
                    donut: {
                      size: '50%',
                    },
                  },
                },
                legend: {
                  position: 'bottom',
                  offsetY: 0,
                
             },
        })
        setSeries(product)
        
    }, [schedule]);

    return (
        <>
            <div className={style.chart}>
                <LabelForms>Agendamentos por UBS</LabelForms>
                <Chart options={options} series={series} type="donut" />
            </div>
        </>
    )
}