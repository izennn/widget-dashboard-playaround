import styled from 'styled-components';

const StyledWidget = styled.div`
	background: #FFFFFF 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 29px #0000000A;
	border-radius: 10px;
	opacity: 1;
	padding: 1em;
	& .widget-top-row {
		display: flex;
		justify-content: space-between;
	}
	& .title-container {
		text-align: left;
		font: normal normal 600 14px/16px SF Pro Display;
		letter-spacing: 0px;
		color: #9FABB7;
		opacity: 1;
	}
	& .image-container {
		visibility: hidden;
		opacity: 0.2;
		transition: 0.2s;
	}
	&:hover .image-container {
		visibility: visible;
		overflow: hidden;
		background: transparent;
		opacity: 1.0;
		transition: background 0.1s ease-in-out;
	}
	& .image-container {
		img, 
		svg {
		}
	}
`
export default StyledWidget;