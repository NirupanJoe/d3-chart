/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';
import { unique } from '@laufire/utils/predicates';

// eslint-disable-next-line max-statements
const createHeatMap = ({ ref, config, data }) => {
	const { width, height, colorRange, padding, margin: {
		top, bottom, left, right,
	}} = config.heatMapProps;

	const xWidth = width - left - right;
	const yHeight = height - top - bottom;
	const svg = d3.select(ref.current)
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', `translate(${ left },${ top })`);

	const color = d3.scaleLinear()
		.range(colorRange)
		.domain([0, d3.max(data, ({ value }) => value)]);

	const xDomain = data.map(({ xLabel }) => xLabel).filter(unique);
	const yDomain = data.map(({ yLabel }) => yLabel).filter(unique);

	const x = d3.scaleBand()
		.range([0, xWidth])
		.domain(xDomain)
		.padding(padding);

	svg.append('g')
		.attr('transform', `translate(0, ${ yHeight })`)
		.call(d3.axisBottom(x));

	const y = d3.scaleBand()
		.range([yHeight, 0])
		.domain(yDomain)
		.padding(padding);

	svg.append('g')
		.call(d3.axisLeft(y));
	svg.selectAll()
		.data(data)
		.join('rect')
		.attr('x', ({ xLabel }) => x(xLabel))
		.attr('y', ({ yLabel }) => y(yLabel))
		.attr('rx', '5')
		.attr('ry', '5')
		.style('stroke-width', '4')
		.style('stroke', 'none')
		.style('opacity', '0.8')
		.attr('width', x.bandwidth())
		.attr('height', y.bandwidth())
		.style('fill', ({ value }) => color(value));
};

const PieChart = (context) => {
	const ref = useRef();

	useEffect(() => createHeatMap({ ...context, ref }), [context]);

	return (
		<svg ref={ ref }/>
	);
};

export default PieChart;
