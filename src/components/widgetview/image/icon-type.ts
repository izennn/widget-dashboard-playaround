export default interface IconInterface {
	className?: string;
	color?: string;
	style?: React.CSSProperties;
	onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}