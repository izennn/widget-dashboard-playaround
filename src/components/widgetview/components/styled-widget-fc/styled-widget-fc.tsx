import React from 'react';
import StyledWidget from '../styled-widget';
import { Layout } from 'react-grid-layout';

interface StyledWidgetFCInterface {
	className?: string;
	item: Layout;
	removeItem: (i: string) => void;
	style?: React.CSSProperties
}

// // essentially just a StyledWidget (styled.div) wrapped in a FC
// const StyledWidgetFC: React.FC<StyledWidgetFCInterface> = (props) => {

// 	console.log("Props from Styled Widget FC:");
// 	console.log(props);
// 	return (
// 		<StyledWidget 
// 			{...props}
// 			className={`wrapper ${props.className}`}
// 		>
// 			<div className='widget-top-row'>
// 				<div className='title-container'>
// 					Header {props.item.i}
// 				</div>
// 				<div 
// 					className='image-container'
// 					style={{
// 						cursor: 'pointer' as 'pointer'
// 					}}
// 					onClick={() => props.removeItem(props.item.i)}
// 				>
// 					x
// 				</div>	
// 			</div>
// 		</StyledWidget>
// 	)
// }

const StyledWidgetFC: React.FC<StyledWidgetFCInterface> = (props) => {
	const {
		item,
		removeItem,
	} = props;

	return (
		<div className='widget' key={item.i} {...props}>
			<div className='widget-top-row'>
				<div className='title-container'>
					Header {props.item.i}
				</div>
				<div 
					className='image-container'
					style={{
						cursor: 'pointer' as 'pointer'
					}}
					onClick={() => props.removeItem(props.item.i)}
				>
					x
				</div>	
			</div>
			{props.children}
		</div>
	)
}

export default StyledWidgetFC;