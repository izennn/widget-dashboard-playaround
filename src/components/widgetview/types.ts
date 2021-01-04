export interface Breakpoints {
	[size: string]: number;
}

export interface Columns {
	[size: string]: number
}

export interface Layout {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	add?: boolean;
}

export interface Layouts {
	[size: string]: Layout[];
}