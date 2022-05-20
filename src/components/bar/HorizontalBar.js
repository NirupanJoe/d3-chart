/* eslint-disable max-lines-per-function */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';
import { pick } from '@laufire/utils/collection';

const half = 2;

// eslint-disable-next-line max-statements
const horizontalBar = (context) => {
	const { config: {
		barAndLineChartProps: {
			width, height, xScale: { padding },
			lineStrokeWidth,
			margin: { top, bottom, right, left },
		},
	}, ref, data } = context;
	const xWidth = width - left - right;
	const yHeight = height - bottom - top;
	const color = d3.scaleOrdinal(d3.schemeCategory10);
	const svg = d3.select(ref.current).attr('width', width)
		.attr('height', height);
	const xScale = d3.scaleLinear().range([0, xWidth])
		.domain([0, d3.max(pick(data, 'value'))]);
	const yScale = d3.scaleBand().range([yHeight, bottom])
		.padding(padding)
		.domain(pick(data, 'label'));
	const g = svg.append('g').attr('transform', `translate(${ left }, ${ top } )`);

	g.append('g').attr('transform', `translate(0, ${ yHeight } )`)
		.call(d3.axisBottom(xScale));
	g.append('g')
		.call(d3.axisLeft(yScale));
	g.selectAll('bar').data(data)
		.join('rect')
		.attr('fill', (d) => color(d.label))
		.attr('x', () => xScale(0))
		.attr('y', (d) => yScale(d.label))
		.attr('width', (d) => xScale(d.value))
		.attr('height', () => yScale.bandwidth());

	g.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', '#ff0000')
		.attr('stroke-width', lineStrokeWidth)
		.attr('opacity', 1)
		.attr('d', d3.line()
			.y(({ label }) => yScale(label) + (yScale.bandwidth() / half))
			.x(({ value }) => (xScale(value) + xScale(0)) / half));
};

const HorizontalBar = (context) => {
	const ref = useRef();

	useEffect(() => horizontalBar({ ...context, ref }));

	return (
		<svg ref={ ref }/>
	);
};

export default HorizontalBar;
