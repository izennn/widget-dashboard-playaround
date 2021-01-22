import React from 'react';
import StyledWidget from '../styled-widget';
import { Layout } from 'react-grid-layout';

interface StyledWidgetFCInterface {
	className: string;
	// key: string;
	item: Layout;
	removeItem: (i: string) => void;
	style?: React.CSSProperties
}

// essentially just a StyledWidget (styled.div) wrapped in a FC
const StyledWidgetFC: React.FC<StyledWidgetFCInterface> = (props) => {
	const { 
		className,
		// key,
		item,
		removeItem,
		style
	} = props;

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