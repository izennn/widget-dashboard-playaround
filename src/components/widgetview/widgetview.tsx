import React, { FC, useState, useEffect } from 'react';
// import mock values
import { mockBreakpoints, mockCols, mockLayouts } from './mock-initial-values';
// react grid layout
import { WidthProvider, Responsive, Layout, Layouts } from 'react-grid-layout';
// lodash for common JS functions
import _ from 'lodash';
// styling
import StyledWidget from './components/styled-widget';
import StyledWidgetFC from './components/styled-widget-fc';
import { Button, Header } from 'semantic-ui-react';
// images
import GearIcon from './image/gear-icon';
import { v4 as uuidv4 } from 'uuid';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface TopBarInterface {
	addItem: () => void;
	windowWidth: number;
	currBreakpoint: string | undefined;
	colsCount: number
}

// Functional Component for top bar of dashboard
const TopBar = (props: TopBarInterface) => {
	const { 
		addItem,
		windowWidth,
		currBreakpoint,
		colsCount
	} = props;

  const topBarStyle = {
    height: '5%',
    minHeight: '100px',
    width: '100%',
    padding: '1em 1.5em 1em 1.5em',
    background: '#F8F8F8',
    display: 'flex',
		flexDirection: 'row' as 'row',
		justifyContent: 'space-between',
  }

  const getDate = () => {
    let d = new Date();
    let dString = d.toString().split(' ');

    let Day = dString[0];
    let Month = dString[1];
    let date = dString[2];
    let Year = dString[3]

    // date.toString() returns as 'Day, Month Date Year ...'
    return `${date} ${Month} ${Year}, ${Day}`
  }

  return (
    <div style={topBarStyle}>
			<div style={{display: 'flex'}}>
				<Header
					as='h2'
					textAlign='left'
					content='Welcome back, Alex'
					subheader={getDate()}
				/>
				<div style={{padding: '1em'}} />
				<div 
					className='grid-data-display' 
					style={{
						textAlign: 'left'
					}}
				>
					<span><b>Grid Width: </b>{windowWidth} px</span><br />
					<span><b>Breakpoint: </b>{currBreakpoint}</span><br />
					<span><b>Columns:    </b>{colsCount}</span>
				</div>
			</div>
			<Button
				content='Add Box'
				onClick={() => addItem()}
			/>
    </div>
  )
}

// Functional component for dashboard carrying a ResponsiveGridLayout
const WidgetView: FC<any> = () => {
	const [ layouts, setLayouts ] = useState<Layouts>(mockLayouts);

	const [ windowWidth, setWindowWidth ] = useState<number>(window.innerWidth);
	const [ colsCount, setColsCount ] = useState(0);
	const [ currBreakpoint, setCurrBreakpoint ] = useState<string>('lg');

	// set windowWidth variable value when window resizes (only needed for Alex's playground)
	useEffect(() => {
		const handleResize = () => { setWindowWidth(window.innerWidth) }
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize)
	})

	// on mount, determine initial breakpoint size (string) & col count (only needed for Alex's playground)
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

	const addItem = () => {
    // new item must have unique key
    let newItem = {
      i: uuidv4(),
      x: layouts[currBreakpoint].length * 1,
      y: Infinity,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
    };
    const lgLayouts = [...layouts[currBreakpoint], newItem];
    setLayouts((prev) => ({ ...prev, [currBreakpoint]: lgLayouts }));
  };

	// on triggered, remove specified box from grid
	const removeItem = (i: string) => {
		const newLayout = _.reject(layouts[currBreakpoint], {i: i});
		const newLayouts = {
			...layouts,
			[currBreakpoint]: newLayout
		}
		setLayouts(newLayouts);
	}

	// take item from layouts array and render it as HTML element
	const renderItem = (el: Layout) => {
		const i = el.i;
		const uuid = parseInt(i);

		if (uuid % 2 === 0) {
			return (
				<StyledWidget className='react-grid-item' key={i} data-grid={el}>
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
							x
						</div>	
					</div>
				</StyledWidget>
			)
		} else {
			return (
				<StyledWidgetFC
					// className='react-grid-item'
					key={i}
					item={el}
					removeItem={removeItem}
					style={{
						border: '1px dotted black'
					}}
				/>
			)
		}
	}

	const onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
		setLayouts(allLayouts);
	}

	const onBreakpointChange = (newBreakpoint: string, newCols: number) => {
		console.log(`Breakpoint changed: ${newBreakpoint}`)
		setCurrBreakpoint(newBreakpoint);
		setColsCount(newCols);
	}

	return (
		<div 
			className='wrapping-div'
			style={{
				height: '100%',
				width: '100%',
				maxWidth: '100%',
				maxHeight: '100%',
				display: 'flex',
				flexDirection: 'column' as 'column'
			}}
		>
			<TopBar 
				addItem={addItem}
				windowWidth={windowWidth}
				currBreakpoint={currBreakpoint}
				colsCount={colsCount}
			/>
			<ResponsiveReactGridLayout 
				className='responsive-grid-layout'
				isDraggable={true}
				isResizable={true}
				breakpoints={mockBreakpoints}
				layouts={layouts}
				cols={mockCols}
				rowHeight={windowWidth / colsCount} // row height will be (width / column_count)
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				verticalCompact={true}
				style={{
					border: '1px solid red',
					maxHeight: '100%',
					overflow: 'auto'
				}}
			>
				{layouts[currBreakpoint].map((el) => {
					// return renderItem(el)
					return (
						<StyledWidgetFC
							// className='react-grid-item'
							key={el.i}
							item={el}
							removeItem={removeItem}
							style={{
								border: '1px dotted black'
							}}
						/>
					)
				})}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default WidgetView;
