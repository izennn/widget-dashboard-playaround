import React, { FC, useState, useEffect } from 'react';
// types def
import { Breakpoints, Columns, Layout, Layouts} from './types';
// import mock values
import { mockBreakpoints, mockCols, mockLayouts } from './mock-initial-values';
// react grid layout
import { WidthProvider, Responsive } from 'react-grid-layout';
// lodash for common JS functions
import _ from 'lodash';
// styling
import StyledWidget from './components/styled-widget';
import { Button } from 'semantic-ui-react';
// images
import GearIcon from './image/gear-icon';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// the add item button that will be at the top
const AddButton: FC<any> = (props) => {
	const topBarStyle = {
		display: 'flex',
		flexDirection: 'row' as 'row',
	}

	return (
		<div style={topBarStyle}>
			<Button 
				onClick={() => props.addItem()}
				content='Add New Box'
			/>
		</div>
	)
}

// Functional component for dashboard carrying a ResponsiveGridLayout
const WidgetView: FC<any> = () => {
	const [ breakpoints, setBreakpoints ] = useState<Breakpoints>(mockBreakpoints)
	const [ cols, setCols ] = useState<Columns>(mockCols)
	const [ layouts, setLayouts ] = useState<Layouts>(mockLayouts);
	const [ newCounter, setNewCounter ] = useState(0);

	const [ windowWidth, setWindowWidth ] = useState<number>(window.innerWidth);
	const [ colsCount, setColsCount ] = useState(0);
	const [ currBreakpoint, setCurrBreakpoint ] = useState<string | undefined>(undefined);

	// set windowWidth variable value when window resizes
	useEffect(() => {
		const handleResize = () => { setWindowWidth(window.innerWidth) }
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize)
	})

	// on mount, determine initial breakpoint size (string) & col count
	useEffect(() => {
		// first, determine currBreakpoint from windowSize
		let newBreakpoint: string;
		const mountedWindowWidth: number = window.innerWidth;
		if (mountedWindowWidth >= mockBreakpoints['lg']) { newBreakpoint = 'lg'}
		else if (mountedWindowWidth >= mockBreakpoints['md']) { newBreakpoint = 'md'}
		else { newBreakpoint = 'sm' } 

		setCurrBreakpoint(newBreakpoint);
		setColsCount(mockCols[newBreakpoint]);
	}, [])

	// on triggered, will add a new box to layouts array
	const addItem = () => {
		// new item must have unique key
		let newItem = {
			i: `n${newCounter}`,
			x: (layouts['lg'].length * 1),
			y: Infinity,
			w: 1,
			h: 1,
			minW: 1,
			minH: 1
		}
		layouts['lg'].push(newItem)
		setLayouts(layouts); 
		setNewCounter(newCounter + 1);
	}

	// on triggered, remove specified box from grid
	const removeItem = (i: string) => {
		const newLayout = _.reject(layouts['lg'], {i: i});
		const newLayouts = {
			...layouts,
			lg: newLayout
		}
		setLayouts(newLayouts);
	}

	// take item from layouts array and render it as HTML element
	const renderItem = (el: Layout) => {
		const i = el.add ? '+' : el.i;
		return (
			<StyledWidget key={i} data-grid={el}>
				<div className='widget-top-row'>
					<div className='title-container'>
						Header {i}
					</div>
					<div 
						className='image-container'
						style={{
							cursor: 'pointer' as 'pointer'
						}}
						onClick={() => removeItem(i)}
					>
						<GearIcon />
					</div>	
				</div>
			</StyledWidget>
		)
	}

	const onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
		setLayouts(allLayouts);
	}

	const onBreakpointChange = (newBreakpoint: string, newCols: number) => {
		setCurrBreakpoint(newBreakpoint);
		setColsCount(newCols);
	}

	return (
		<div 
			className='wrapping-div'
			style={{
				display: 'flex',
				flexDirection: 'column' as 'column'
			}}
		>
			<div 
				className='top-column'
				style={{
					display: 'flex',
					flexDirection: 'row' as 'row',
					padding: '0.25em 0.5em 0.25em 0.5em'
				}}
			>
				<AddButton 
					addItem={addItem}
				/>
				<div className='spacer' style={{padding: '0.5em'}}></div>
				<div 
					className='grid-data-display' 
					style={{
						display: 'flex',
						flexDirection: 'column' as 'column',
						textAlign: 'left'
					}}
				>
					<p><b>Grid Width: </b>{windowWidth} px</p>
					<p><b>Breakpoint Key: </b>{currBreakpoint}</p>
					<p><b>Columns: </b>{colsCount}</p>
				</div>
			</div>
			<ResponsiveReactGridLayout 
				className='layout'
				breakpoints={breakpoints}
				cols={cols}
				layouts={layouts}
				verticalCompact={true}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				rowHeight={windowWidth / colsCount} // row height will be (width / column_count)
				style={{border: '1px solid red'}}
			>
				{layouts['lg'].map((el) => {
					return renderItem(el)
				})}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default WidgetView;