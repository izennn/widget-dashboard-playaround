export type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

export interface Breakpoints {
	[size: string]: number;
}

export interface Columns {
	[size: string]: number
}

type WidgetTypeOptions = 'figure' | 'chart' | 'table' | undefined;

export interface Widget {
	title: string;
	// location: 
	// widgetDataType: 
	widgetType: WidgetTypeOptions;
}