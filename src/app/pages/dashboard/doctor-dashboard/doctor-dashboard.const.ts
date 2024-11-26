export const CHART_OPTIONS_1 = {
  chart: {
    height: 200,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  series: [],
  xaxis: {
    categories: [], //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
};

export const CHART_OPTIONS_2 = {
  chart: {
    height: 250,
    width: 330,
    type: 'donut',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false,
  },

  series: [44, 55],
  labels: ['Male', 'Female'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  legend: {
    position: 'bottom',
  },
};
export const CHART_OPTIONS_3 = {
  chart: {
    height: 230,
    type: 'bar',
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 6,
    colors: ['transparent'],
  },
  series: [
    {
      name: 'Low',
      color: '#D5D7ED',
      data: [20, 30, 41, 67, 22, 43, 40, 10, 30, 20, 40],
    },
    {
      name: 'High',
      color: '#2E37A4',
      data: [13, 23, 20, 8, 13, 27, 30, 25, 10, 15, 20],
    },
  ],
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
};
