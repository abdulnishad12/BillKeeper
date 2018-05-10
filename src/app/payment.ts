export class Payment {
	utility: string;
	year: number;
	month: string;
	total:number;
}
export class Years {
	name:number;
}

export class Months {
	name:string;
	total: number;
}

export class Utilities {
	name:string;
	total:number;
}

export class Settings {
	lightPrice:number;
	lightCounter:number;
	gasPrice:number;
	gasCounter:number;
	waterPrice:number;
	waterCounter:number;
}

export class DatePicked {
	year:number;
	month:string;
}