export const chartOptionsOne = {
  chart: {
    height: 230,
    type: 'bar',
    stacked: true,
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
      columnWidth: '15%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: 'Male',
      color: '#2E37A4',
      data: [], //[20, 30, 41, 67, 22, 43, 40, 10, 30, 20, 40],
    },
    {
      name: 'Female',
      color: '#00D3C7',
      data: [], //[13, 23, 20, 8, 13, 27, 30, 25, 10, 15, 20],
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
    axisBorder: {
      show: false, // set to false to hide the vertical gridlines
    },
  },
};
export const chartOptionsTwo = {
  series: [],
  labels: [],
  chart: {
    type: 'donut',
    height: 200,
    width: 200,
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: false,
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
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
};
export const chartOptionsThree = {
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
  series: [
    {
      name: 'Income',
      color: '#2E37A4',
      data: [], //[45, 60, 75, 51, 42, 42, 30],
    },
  ],
  xaxis: {
    categories: [], //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
};
