import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

export class Component implements OnInit {

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
    }

    private async load() {
        const datasetData = [69, 25, 52, 33, 45];
        const total = datasetData.reduce((a, b) => a + b, 0);

        const data = {
            labels: ['Blue', 'Mint', 'Purple', 'Orange', 'Pink'],
            datasets: [{
                label: 'Dataset 1',
                data: datasetData,
                datalabels: { anchor: 'center' },
                backgroundColor: ['#37A2EB', '#4BC0C0', '#9966FF', '#F77825', '#FF3784']
            },
            ]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    datalabels: {
                        backgroundColor: ['#37A2EB', '#4BC0C0', '#9966FF', '#F77825', '#FF3784'],
                        color: 'white',
                        font: {
                            weight: 'bold',
                            size: '14px'
                        },
                        padding: 6,
                        formatter: (value) => {
                            const percentage = (value / total) * 100;
                            return percentage.toFixed(1) + '%';
                        },
                    },
                }
            },
        };

        const ctx = document.getElementById('test').getContext('2d');
        let myChart = new Chart(ctx, config);

        await this.service.render();
    }
}