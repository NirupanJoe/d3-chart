import { select } from 'd3';

const Tooltip = {
	tooltip: () => select('#tooltip'),

	mouseover: (event, { data: { name, value }}) => {
		Tooltip.tooltip()
			.html(`${ name }: ${ value }`)
			.style('opacity', 1);
	},

	mousemove: (event) => {
		Tooltip.tooltip()
			.style('left', `${ event.x }px`)
			.style('top', `${ event.pageY }px`);
	},

	mouseleave: () => {
		Tooltip.tooltip()
			.style('opacity', 0);
	},

};

export default Tooltip;
