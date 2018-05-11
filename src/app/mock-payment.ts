import { Payment, Months, Utilities, Settings, DatePicked } from './payment';

export const PAYMENTS: Payment[] = [
  {  utility: 'Light', year:2018,month:"May", total:1250 },
  {  utility: 'Gas', year:2018,month:"May", total:1250  },
  {  utility: 'Water', year:2018,month:"May", total:1250  },
  {  utility: 'Trash', year:2018,month:"May", total:1250  },
  {  utility: 'Another', year:2018,month:"May", total:1250  }
];

export const YEARS: Months[] = [];
export const MONTHS: Months[] = [
  {name:"Jan",total:31},
  {name:"Feb",total:28},
  {name:"Mar",total:31},
  {name:"May",total:30},
  {name:"Apr",total:31},
  {name:"Jun",total:30},
  {name:"Jul",total:31},
  {name:"Aug",total:31},
  {name:"Sep",total:30},
  {name:"Oct",total:31},
  {name:"Nov",total:30},
  {name:"Dec",total:31}
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