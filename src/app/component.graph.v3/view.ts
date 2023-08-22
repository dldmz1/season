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
                datalabels: { 
                    anchor: 'center',
                    font: { size: 14 },
                },
                backgroundColor: ['#37A2EB', '#4BC0C0', '#9966FF', '#F77825', '#FF3784'],
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
                        position: 'right',
                        maxWidth: 150,
                        labels: {
                            usePointStyle: true,
                            boxWidth: 10,
                            padding: 15,
                            generateLabels: function(chart) {
                                const labels = chart.data.labels;
                                const dataset = chart.data.datasets[0];
                                const total = dataset.data.reduce((a, b) => a + b, 0);
                                return labels.map((label, index) => {
                                    const value = dataset.data[index];
                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return {
                                        text: ` ${label}   ${percentage}%`,
                                        fillStyle: dataset.backgroundColor[index]
                                    };
                                });
                            }
                        }
                    },
                    datalabels: {
                        color: 'white',
                        font: {
                            weight: 'bold',
                            size: '14px'
                        },
                        padding: 6,
                    },
                }
            },
        };

        const ctx = document.getElementById('test3').getContext('2d');
        let myChart = new Chart(ctx, config);

        await this.service.render();
    }
}