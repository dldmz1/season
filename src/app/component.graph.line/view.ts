import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';
import { Chart } from 'chart.js/auto';

export class Component implements OnInit {
    constructor(
        public service: Service,
    ) { }

    public async ngOnInit() {
        await this.load();
    }

    private async load() {
        const data1 = [];
        const data2 = [];
        let prev = 100;
        let prev2 = 80;

        for (let i = 0; i < 1000; i++) {
            prev += 5 - Math.random() * 10;
            data1.push({x: i, y: prev});
            prev2 += 5 - Math.random() * 10;
            data2.push({x: i, y: prev2});
        }

        const data = {
            datasets: [{
                label: 'Dataset 1',
                data: data1,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                radius: 0
            },
            {
                label: 'Dataset 2',
                data: data2,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
                radius: 0
            }]
        };

        const ctx = document.getElementById('graph-line').getContext('2d');
        const totalDuration = 5000;
        const delayBetweenPoints = totalDuration / data.datasets[0].data.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                    }
                    ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                    }
                    ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            }
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: false,
                animation,
                interaction: {
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'linear'
                    }
                }
            },
        };

        let myChart = new Chart(ctx, config);

        await this.service.render();
    }
}