/* eslint-disable max-lines-per-function */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';

// eslint-disable-next-line max-statements
const barChart = (context) => {
	const { config: { barChartProps: { width, height, xscale: { padding },
		duration, delay, margin: { bottom, left }}}, ref, data } = context;
	const h = height - bottom;
	const color = d3.scaleOrdinal(d3.schemeCategory10);
	const svg = d3.select(ref.current);
	const xScale = d3.scaleBand().range([0, width])
		.padding(padding)
		.domain(data.map((d) => d.product));
	const yScale = d3.scaleLinear().range([h, bottom])
		.domain([0, d3.max(data, (d) => d.sold)]);
	const g = svg.append('g');

	g.append('g').attr('transform', `translate(0, ${ h } )`)
		.call(d3.axisBottom(xScale));
	g.append('g')
		.attr('transform', `translate(${ left },0)`)
		.call(d3.axisLeft(yScale));
	g.selectAll('bar').data(data)
		.enter()
		.append('rect')
		.attr('transform', `translate(${ left },0)`)
		.attr('fill', (d) => color(d.product))
		.attr('x', (d) => xScale(d.product))
		.attr('y', () => yScale(0))
		.attr('width', xScale.bandwidth())
		.attr('height', () => h - yScale(0));

	g.selectAll('rect').transition()
		.duration(duration)
		.attr('y', (d) => yScale(d.sold))
		.attr('height', (d) => h - yScale(d.sold))
		.delay((d, i) => i * delay);
};

const BarChart = (context) => {
	const { config: { barChartProps }} = context;
	const ref = useRef();

	useEffect(() => barChart({ ...context, ref }));

	return (
		<svg ref={ ref } { ...barChartProps }/>
	);
};

export default BarChart;
