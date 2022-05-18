/* eslint-disable max-lines-per-function */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';
import { pick } from '@laufire/utils/collection';

const half = 2;

// eslint-disable-next-line max-statements
const barAndLineChart = (context) => {
	const { config: {
		barAndLineChartProps: {
			width, height, xScale: { padding },
			duration, delay, lineStrokeWidth,
			margin: { top, bottom, right, left },
		},
	}, ref, data } = context;
	const xWidth = width - left - right;
	const yHeight = height - bottom - top;
	const color = d3.scaleOrdinal(d3.schemeSet2);
	const svg = d3.select(ref.current).attr('width', width)
		.attr('height', height);
	const xScale = d3.scaleBand().range([0, xWidth])
		.padding(padding)
		.domain(pick(data, 'label'));
	const yScale = d3.scaleLinear().range([yHeight, bottom])
		.domain([0, d3.max(pick(data, 'value'))]);
	const g = svg.append('g').attr('transform', `translate(${ left }, ${ top } )`);

	g.append('g').attr('transform', `translate(0, ${ yHeight } )`)
		.call(d3.axisBottom(xScale));
	g.append('g')
		.call(d3.axisLeft(yScale));
	g.selectAll('bar').data(data)
		.join('rect')
		.attr('fill', (d) => color(d.label))
		.attr('x', (d) => xScale(d.label))
		.attr('y', () => yScale(0))
		.attr('width', xScale.bandwidth())
		.attr('height', () => yHeight - yScale(0));

	g.selectAll('rect').transition()
		.duration(duration)
		.attr('y', (d) => yScale(d.value))
		.attr('height', (d) => yHeight - yScale(d.value))
		.delay((d, i) => i * delay);

	g.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', '#ff0000')
		.attr('stroke-width', lineStrokeWidth)
		.attr('opacity', 0)
		.attr('d', d3.line()
			.x(({ label }) => xScale(label) + (xScale.bandwidth() / half))
			.y(({ value }) => (yScale(value) + yScale(0)) / half));

	g.selectAll('path').transition()
		.duration(duration)
		.attr('opacity', 1)
		.delay(delay);
};

const BarAndLineChart = (context) => {
	const ref = useRef();

	useEffect(() => barAndLineChart({ ...context, ref }));

	return (
		<svg ref={ ref }/>
	);
};

export default BarAndLineChart;
