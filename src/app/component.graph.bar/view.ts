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
        const data1 = [1349, 4950, 2045, 2034, 2345, 5960];
        const data2 = [3940, 2034, 2040, 1234, 5956, 8565];

        const data = {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Dataset 1',
                data: data1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: data2,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    datalabels: {
                        display: false
                    }
                }
            },
        };

        const ctx = document.getElementById('graph-bar').getContext('2d');
        let myChart = new Chart(ctx, config);

        await this.service.render();
    }
}