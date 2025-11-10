window.loadCharts = function () {

    const colorPrimary = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();

    const colorLabel = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-label')
        .trim();

    const fontFamily = getComputedStyle(document.documentElement)
        .getPropertyValue('--font-family')
        .trim();

    const defaultOptions = {
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            width: '100%',
            height: 180,
            offsetY: 0
        },
        dataLabels: { enabled: false }
    };

    let barOptions = {
    ...defaultOptions,
    chart: { ...defaultOptions.chart, type: 'area' },
    tooltip: {
        enabled: true,
        style: { fontFamily: fontFamily },
        y: { formatter: value => `${value}K` }
    },

    series: [{ name: 'Views', data: [15, 50, 18, 90, 30, 65, 0, 0] }], 
    colors: [colorPrimary],
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 0,
            stops: [0, 100],
            colorStops: [
                { offset: 0, opacity: .2, color: '#ffffff' },
                { offset: 100, opacity: 0, color: '#ffffff' }
            ]
        }
    },
    stroke: { colors: [colorPrimary], lineCap: 'round' },
    grid: {
        borderColor: 'rgba(0, 0, 0, 0)',
        padding: { top: -30, right: 0, bottom: -8, left: 12 }
    },
    markers: { strokeColors: colorPrimary },
    yaxis: { show: false },
    xaxis: {
        labels: {
            show: true,
            floating: true,
            style: { colors: colorLabel, fontFamily: fontFamily }
        },
        axisBorder: { show: false },
        crosshairs: { show: false },
        categories: [
            '00:00', '03:00', '06:00', '09:00', 
            '12:00', '15:00', '18:00', '21:00'
        ]
    }
};

    let pieOptions = {
        ...defaultOptions,
        chart: {
            ...defaultOptions.chart,
            type: 'pie',
            height: 300
        },
        series: [300, 50, 100, 80],
        labels: ['Plastic', 'Cardboard', 'Glass', 'Paper'],
        colors: ['#FF4560', '#00E396', '#FEB019', '#775DD0'],
        legend: {
            position: 'bottom',
            labels: { colors: colorLabel, fontFamily: fontFamily }
        },
        title: {
            text: 'Type of Waste Collected',
            align: 'center',
            style: { fontFamily: fontFamily, color: colorLabel }
        },
        tooltip: { style: { fontFamily: fontFamily } }
    };

    const areaChartElement = document.querySelector('.area-chart');
    const pieChartElement = document.querySelector('#pieChartContainer');

    if (areaChartElement) {
        new ApexCharts(areaChartElement, barOptions).render();
    }
    if (pieChartElement) {
        new ApexCharts(pieChartElement, pieOptions).render();
    }
};

window.toggleDarkMode = function (isDark) {
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
};