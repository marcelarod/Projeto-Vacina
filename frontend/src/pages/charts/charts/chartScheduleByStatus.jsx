import { useEffect, useState } from "react";

import Chart from 'react-apexcharts'
import moment from "moment";

import LabelForms from '../../../components/label'

import style from '../reports.module.css'

export default function ChartScheduleByStatus({schedule}) {
    const [series, setSeries] = useState([]);

    const optionsStatus = {
        labels: ['Vacinados', 'Não vacinados'],
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
        
        colors:['#77dd77', '#ff6961', '#fdfd96', '#f9d99a'],
    }

  
    useEffect(() => {
        var SerieVacinados = schedule.filter((e) => e.isVaccinated === true)
        var SerieNaoVacinados = schedule.filter((e) => e.isVaccinated === false)

        setSeries([SerieVacinados.length, SerieNaoVacinados.length ])
    }, [schedule]);
    return (
        <>
            <div className={style.chart}>
                <LabelForms>Agendamentos por status</LabelForms>
                <Chart options={optionsStatus} series={series} type="donut" />
            </div>
        </>
    )
}