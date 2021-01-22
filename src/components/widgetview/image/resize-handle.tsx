import React, { FC } from 'react';
import styled from 'styled-components';
import IconInterface from './icon-type';

const StyledLine = styled.line`
	fill:none;
	stroke:#9fabb7;
	stroke-linecap:round;
	stroke-width:2px;
`

const ResizeHandleIcon: FC<IconInterface> = (props) => {
	const { 
		className,
		style,
		// onClick
	} = props;


	return (
		<svg 
			className={className}
			xmlns="http://www.w3.org/2000/svg" 
			width="9.828" 
			height="9.828" 
			viewBox="0 0 9.828 9.828"
			style={style}
			// onClick={onClick}
		>
			<g transform="translate(-308.086 -284.086)">
				<StyledLine 
					y1="6" 
					x2="6" 
					transform="translate(309.5 285.5)"
				/>
				<StyledLine 
					y1="3" 
					x2="3" 
					transform="translate(313.5 289.5)"
				/>
			</g>
		</svg>		
	)
}

export default ResizeHandleIcon;