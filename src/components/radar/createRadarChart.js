/* eslint-disable max-statements */
// eslint-disable-next-line id-match
import * as d3 from 'd3';

const two = 2;

// eslint-disable-next-line max-lines-per-function
const CreateRadarChart = (context) => {
	const {
		config: { radarChartOptions: option },
		ref,
		data,
	} = context;
	const {
		width, height, margin: { left, right, top, bottom }, levels,
		opacityCircles,
	} = option;
	const xWidth = width - left - right;
	const yHeight = height - top - bottom;
	const xMargin = (left + right) / two;
	const yMargin = (top + bottom) / two;
	const radius = Math.min((xWidth / two) - xMargin
		, (yHeight / two) - yMargin);
	const gx = (xWidth / two) + xMargin;
	const gy = (yHeight / two) + yMargin;
	const format = d3.format('.0%');
	const maxValue = d3.max(data, ({ axes }) =>
		d3.max(axes.map((a) => a.value)));
	const allAxis = data.length && data[0].axes.map(({ axis }) => axis);
	const rScale = d3.scaleLinear().range([0, radius])
		.domain([0, maxValue]);
	const angleSlice = Math.PI * two / allAxis.length;

	const svg = d3.select(ref.current).attr('width', width)
		.attr('height', height);

	const g = svg.append('g')
		.attr('transform', `translate(${ gx }, ${ gy } )`);

	const axisGrid = g.append('g');

	axisGrid.selectAll()
		.data(d3.range(0, levels + 1))
		.join('circle')
		.attr('r', (d) => (radius / levels) * d)
		.style('fill', '#CDCDCD')
		.style('stroke', '#CDCDCD')
		.style('fill-opacity', opacityCircles);

	axisGrid
		.selectAll()
		.data(d3.range(0, levels + 1))
		.join('text')
		.attr('class', 'axisLabel')
		.attr('x', 1)
		.attr('y', (d) => (-d * radius) / levels)
		.attr('dy', '0.4em')
		.style('font-size', '10px')
		.attr('fill', '#474444')
		.text((d) => format((maxValue * d) / levels));

	const axis = axisGrid.selectAll().data(allAxis)
		.join('g');

	axis.append('line').attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', (d, i) => rScale(maxValue)
		* Math.cos((angleSlice * i) - (Math.PI / two)))
		.attr('y2', (d, i) => rScale(maxValue)
		* Math.sin((angleSlice * i) - (Math.PI / two)))
		.style('stroke-width', '2px')
		.style('stroke', 'white');
};

export default CreateRadarChart;
