window.loadCharts = function (isDark) {
    const colorPrimary = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();

    const colorLabel = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-label')
        .trim();

    const fontFamily = getComputedStyle(document.documentElement)
        .getPropertyValue('--font-family')
        .trim();

    const chartPrimaryColor = isDark ? '#6ee7b7' : '#2596be';
    const chartBackgroundColor = isDark ? '#242526' : '#FFFFFF';
    const chartTextColors = isDark ? '#ccc' : colorLabel;
    const chartGridBorderColor = isDark ? '#333' : '#e0e0e0'; 

    const defaultOptions = {
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            width: '100%',
            height: 300,
            offsetY: 0
        },
        dataLabels: { enabled: false }
    };

    let barOptions = {
        ...defaultOptions,
        chart: {
            ...defaultOptions.chart,
            type: 'area',
            background: chartBackgroundColor,
            dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 5,
                opacity: 0.5,
                color: chartPrimaryColor
            }
        },
        title: {
            text: 'Uptime',
            align: 'center',
            style: { fontFamily: fontFamily, color: chartTextColors }
        },
        tooltip: {
            enabled: true,
            style: { fontFamily: fontFamily },
            y: { formatter: value => `${value}min` }
        },
        series: [{ name: 'Uptime (min)', data: [0, 50, 18, 500, 30, 65, 0, 0] }],
        colors: [chartPrimaryColor],
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                opacityFrom: 1,
                opacityTo: 0,
                stops: [0, 100],
                colorStops: [
                    { offset: 0, opacity: .2, color: chartPrimaryColor },
                    { offset: 100, opacity: 0, color: chartPrimaryColor }
                ]
            }
        },
        stroke: { colors: [chartPrimaryColor], lineCap: 'round' },
        grid: {
            show: true, 
            borderColor: chartGridBorderColor,
            xaxis: { 
                lines: { show: false }
            },
            yaxis: { 
                lines: { show: true, opacity: 1.0, colors: [chartTextColors] }
            },
            padding: { top: -30, right: 0, bottom: -8, left: 12 },
        },
        markers: { strokeColors: chartPrimaryColor },

        yaxis: {
            show: true,
            title: {
                text: 'Minutes',
                style: {
                    color: chartTextColors,
                    fontFamily: fontFamily,
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    colors: chartTextColors,
                    fontFamily: fontFamily
                }
            }
        },

        xaxis: {
            labels: {
                show: true,
                style: { colors: chartTextColors, fontFamily: fontFamily }
            },
            axisBorder: { show: false },
            crosshairs: { show: false },
            categories: [
                '00:00', '03:00', '06:00', '09:00',
                '12:00', '15:00', '18:00', '21:00'
            ],
            title: {
                text: 'Time of Day',
                style: {
                    color: chartTextColors,
                    fontFamily: fontFamily,
                    fontSize: '12px'
                }
            }
        }
    };

    let pieOptions = {
        ...defaultOptions,
        chart: {
            ...defaultOptions.chart,
            type: 'pie',
            height: 300,
            background: chartBackgroundColor
        },
        series: [300, 50, 100, 80],
        labels: ['Plastic', 'Cardboard', 'Glass', 'Paper'],
        colors: ['#FF4560', '#00E396', '#FEB019', '#775DD0'],
        legend: {
            position: 'bottom',
            labels: { colors: chartTextColors, fontFamily: fontFamily }
        },
        title: {
            text: 'Type of Waste Collected',
            align: 'center',
            style: { fontFamily: fontFamily, color: chartTextColors }
        },
        tooltip: { style: { fontFamily: fontFamily } }
    };

    const areaChartElement = document.querySelector('.area-chart');
    const pieChartElement = document.querySelector('#pieChartContainer');

    if (areaChartElement) {
        areaChartElement.innerHTML = '';
        window.areaChart = new ApexCharts(areaChartElement, barOptions);
        window.areaChart.render();
    }
    if (pieChartElement) {
        pieChartElement.innerHTML = '';
        window.pieChart = new ApexCharts(pieChartElement, pieOptions);
        window.pieChart.render();
    }
};

window.updateChartColors = function (isDark) {
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }

    const chartPrimaryColor = isDark ? '#6ee7b7' : '#2596be';
    const chartBackgroundColor = isDark ? '#242526' : '#FFFFFF';
    const chartTextColors = isDark ? '#ccc' : '#a7a7a7';
    const chartGridBorderColor = isDark ? '#333' : '#e0e0e0';

    if (window.areaChart) {
        window.areaChart.updateOptions({
            colors: [chartPrimaryColor],
            fill: {
                gradient: {
                    colorStops: [
                        { offset: 0, opacity: 0.2, color: chartPrimaryColor },
                        { offset: 100, opacity: 0, color: chartPrimaryColor }
                    ]
                }
            },
            stroke: { colors: [chartPrimaryColor] },
            markers: { strokeColors: chartPrimaryColor },
            chart: { background: chartBackgroundColor },

            grid: {
                borderColor: chartGridBorderColor,
                yaxis: {
                    lines: { show: true, opacity: 1.0, colors: [chartTextColors] }
                }
            },
            yaxis: {
                title: { style: { color: chartTextColors } },
                labels: { style: { color: chartTextColors } }
            },
            xaxis: {
                labels: { style: { color: chartTextColors } },
                title: { style: { color: chartTextColors } }
            }
        });
    }

    if (window.pieChart) {
        window.pieChart.updateOptions({
            chart: { background: chartBackgroundColor },
            legend: { labels: { colors: chartTextColors } },
            title: { style: { color: chartTextColors } }
        });
    }
};

window.toggleDarkMode = function (isDark) {
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    window.loadCharts(isDark);
};