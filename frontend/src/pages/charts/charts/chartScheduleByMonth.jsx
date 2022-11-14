import { useEffect, useState } from "react";

import Chart from 'react-apexcharts'
import moment from "moment";

import LabelForms from '../../../components/label'

import style from '../reports.module.css'

export default function ChartScheduleByMonth({schedule, dateReports}) {
    const [optionsLine, setOptionsLine] = useState({});
    const [seriesLine, setSeriesLine] = useState([]);
    let mesesCategorias = [];

    useEffect(() => {
        if(schedule.length > 0 ){
            let data = {};
            var monthInicial = Math.min(...schedule.map(e => moment(e.startTime).month()))
            var monthFinal = Math.max(...schedule.map(e => moment(e.startTime).month()))

            if (dateReports) {
                for (let i = Number(monthInicial); i <= monthFinal; i++) {
                    switch (i) {
                        case 1:
                            mesesCategorias.push("Jan");
                            break;
                        case 2:
                            mesesCategorias.push("Feb");
                            break;
                        case 3:
                            mesesCategorias.push("Mar");
                            break;
                        case 4:
                            mesesCategorias.push("Apr");
                            break;
                        case 5:
                            mesesCategorias.push("May");
                            break;
                        case 6:
                            mesesCategorias.push("Jun");
                            break;
                        case 7:
                            mesesCategorias.push("Jul");
                            break;
                        case 8:
                            mesesCategorias.push("Aug");
                            break;
                        case 9:
                            mesesCategorias.push("Sep");
                            break;
                        case 10:
                            mesesCategorias.push("Oct");
                            break;
                        case 11:
                            mesesCategorias.push("Nov");
                            break;
                        case 12:
                            mesesCategorias.push("Dec");
                            break;
                    }
                }
            } else {
                mesesCategorias.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
            }

            const months = [...new Set(schedule.map((d) => moment(d.startTime).month())),].sort((a, b) => a - b);
            data = new Array(12).fill(0);
            months.forEach((m) => {
                const count = schedule.filter((d) => moment(d.startTime).month() === m).length;
                data[m] = count;
            });
            if (dateReports) {
                if (monthInicial <= monthFinal) {
                    data = data.slice(
                        monthInicial,
                        monthFinal + 1
                    );
                } else {
                    const aux = [];
                    aux.push(...data.slice(monthInicial, 11));
                    aux.push(...data.slice(0, monthFinal));
                    data = aux;
                }
            }
        
            setOptionsLine({
                chart: {
                    height: "100%",
                    type: "line",
                    dropShadow: {
                        enabled: true,
                        color: "#000",
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ["#5A58A8"],
                dataLabels: {
                    enabled: true,
                },
                xaxis: {
                    categories: mesesCategorias,
                },
            })
            setSeriesLine([
                {
                    name: "Agendamentos",
                    data: data,
                },
            ])
        }
    }, [schedule]);

    return (
        <>
            <div className={style.chartLine}>
                <LabelForms>Agendamentos por mês</LabelForms>
                {seriesLine ? 
                <Chart options={optionsLine} series={seriesLine} height={300} />:
                null}
            </div>
        </>
    )
}