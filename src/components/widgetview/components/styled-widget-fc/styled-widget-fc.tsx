import React from 'react';
import StyledWidget from '../styled-widget';
import { Layout } from '../../types';

interface StyledWidgetFCInterface {
	className: string;
	key: string;
	item: Layout;
	removeItem: (i: string) => void;
	style?: React.CSSProperties
}

const StyledWidgetFC: React.FC<StyledWidgetFCInterface> = (props) => {
	const { 
		className,
		key,
		item,
		removeItem,
		style
	} = props;

	// console.log("Rendering a styled widget FC, item: ")
	// console.log(item);
	return (
		<StyledWidget className={className} key={item.i} data-grid={item} style={style}>
			<div className='widget-top-row'>
				<div className='title-container'>
					Header {item.i}
				</div>
				<div 
					className='image-container'
					style={{
						cursor: 'pointer' as 'pointer'
					}}
					onClick={() => removeItem(item.i)}
				>
					x
				</div>	
			</div>
		</StyledWidget>
	)
}

export default StyledWidgetFC;