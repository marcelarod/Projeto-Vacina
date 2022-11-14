import { useEffect, useState } from "react";

import Chart from 'react-apexcharts'
import moment from "moment";

import LabelForms from '../../../components/label'

import style from '../reports.module.css'

export default function ChartScheduleByRooms({schedule}) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        const group = schedule.reduce((acc, item) => {
            if (!acc[item.Rooms.name]) {
              acc[item.Rooms.name] = [];
            }
            acc[item.Rooms.name].push(item.length);
            return acc;
        }, {})
          
        let product =[]
        let name =[]
        console.log(group)
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
                <LabelForms>Agendamentos por sala em UBS</LabelForms>
                <Chart options={options} series={series} type="donut" />
            </div>
        </>
    )
}