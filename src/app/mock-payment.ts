import { Payment, Months, Utilities, Settings, DatePicked } from './payment';

export const PAYMENTS: Payment[] = [
  { id:1,utility: 'Light', year:2018,month:"May", total:1250 },
  { id:2,utility: 'Gas', year:2018,month:"April", total:1250  },
  { id:3,utility: 'Water', year:2018,month:"December", total:1250  },
  { id:4,utility: 'Trash', year:2018,month:"March", total:1250  },
  { id:5,utility: 'Another', year:2018,month:"January", total:1250  }
];

export const MONTHS: Months[] = [
  "Jan",
  "Feb",
  "Mar",
  "May",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const UTILITIES: Utilities[] = [
  {name:"Light", total: 400},
  {name:"Gas", total:200},
  {name:'Water',total: 300},
  {name:"Another",total:200}
];

export const SETTINGS: Settings[] = [
  {lightPrice:123,
  lightCounter:1234,
  gasPrice:100,
  gasCounter:3255,
  waterPrice:65,
  waterCounter:21412412}
];

export const DATEPICKER: DatePicked[] = [
  {year: 2018, month:"May"}
];