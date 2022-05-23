/* eslint-disable max-lines-per-function */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';
import { map, pick, values } from '@laufire/utils/collection';
import { keys } from '@laufire/utils/lib';

const half = 2;

// eslint-disable-next-line max-statements
const barChart = (context) => {
	const { config: {
		barChartProps: {
			width, height, xScale: { padding },
			duration, delay, subBarPadding,
			margin: { top, bottom, right, left },
		},
	}, ref, data } = context;
	const xWidth = width - left - right;
	const yHeight = height - bottom - top;
	const color = d3.scaleOrdinal()
		.range(d3.schemeCategory10)
		.domain(pick(data, 'label'));
	const subgroups = data.length && keys(data[0].value);
	const svg = d3.select(ref.current).attr('width', width)
		.attr('height', height);
	const xScale = d3.scaleBand().range([0, xWidth])
		.padding(padding)
		.domain(pick(data, 'label'));
	const yScale = d3.scaleLinear().range([yHeight, bottom])
		.domain([0, d3.max(data, ({ value }) =>
			Math.max(...values(map(value, (d) => d.value))))]);

	const tooltip = d3.select('#tooltip')
		.style('opacity', 0)
		.style('position', 'absolute')
		.style('background-color', 'white')
		.style('border', '1px solid')
		.style('border-radius', '5px')
		.style('padding', '10px');

	const mouseover = (event, d) => {
		tooltip
			.html(`${ d.key }: ${ d.value }`)
			.style('opacity', 1);
	};
	const mousemove = (event) => {
		tooltip
			.style('left', `${ event.x }px`)
			.style('top', `${ event.y / half }px`);
	};
	const mouseleave = () => {
		tooltip
			.style('opacity', 0);
	};
	const g = svg.append('g').attr('transform', `translate(${ left }, ${ top } )`);

	const xSubgroup = d3.scaleBand()
		.domain(subgroups)
		.range([0, xScale.bandwidth()])
		.padding([subBarPadding]);

	g.append('g').attr('transform', `translate(${ 0 }, ${ yHeight } )`)
		.call(d3.axisBottom(xScale));

	g.append('g')
		.call(d3.axisLeft(yScale));

	const bar = g.append('g').selectAll('g')
		.data(data)
		.join('g')
		.attr('transform', (d) => `translate(${ xScale(d.label) }, 0)`)
		.selectAll('rect')
		.data((d) => values(map(d.value, (value) => ({
			...value, label: d.label,
		}))));

	const radius = xSubgroup.bandwidth() / half;

	bar.join('circle').attr('fill', (d) => color(d.label))
		.attr('cx', (d) => xSubgroup(d.key) + radius)
		.attr('cy', () => yHeight - yScale(0))
		.attr('r', radius)
		.on('mouseover', mouseover)
		.on('mousemove', mousemove)
		.on('mouseleave', mouseleave);

	g.selectAll('circle').transition()
		.duration(duration)
		.attr('cy', (d) => yScale(d.value))
		.delay((d, i) => i * delay);
};

const BarChart = (context) => {
	const ref = useRef();

	useEffect(() => barChart({ ...context, ref }));

	return (
		<div>
			<svg ref={ ref }/>
			<div id="tooltip"/>
		</div>
	);
};

export default BarChart;
