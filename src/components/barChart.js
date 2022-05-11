/* eslint-disable max-lines-per-function */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';
import { map, pick, values } from '@laufire/utils/collection';
import { keys } from '@laufire/utils/lib';

// eslint-disable-next-line max-statements
const barChart = (context) => {
	const { config: {
		barChartProps: {
			width, height, xScale: { padding },
			duration, delay, subBarPadding,
			margin: { bottom, left },
		},
	}, ref, data } = context;
	const xWidth = width - left;
	const yHeight = height - bottom;
	const color = d3.scaleOrdinal(d3.schemeCategory10);
	const subgroups = data.length && keys(data[0].value);
	const svg = d3.select(ref.current).attr('width', width)
		.attr('height', height);
	const xScale = d3.scaleBand().range([0, xWidth])
		.padding(padding)
		.domain(pick(data, 'label'));
	const yScale = d3.scaleLinear().range([yHeight, bottom])
		.domain([0, d3.max(data, ({ value }) =>
			Math.max(...subgroups.map((key) => value[key].value)))]);
	const g = svg.append('g');

	const xSubgroup = d3.scaleBand()
		.domain(subgroups)
		.range([0, xScale.bandwidth()])
		.padding([subBarPadding]);

	g.append('g').attr('transform', `translate(${ left }, ${ yHeight } )`)
		.call(d3.axisBottom(xScale));

	g.append('g')
		.attr('transform', `translate(${ left },0)`)
		.call(d3.axisLeft(yScale));

	g.append('g').selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr('transform', (d) => `translate(${ xScale(d.label) }, 0)`)
		.selectAll('rect')
		.data((d) => values(map(d.value, (value) => value)))
		.enter()
		.append('rect')
		.attr('fill', (d) => color(d.key))
		.attr('x', (d) => xSubgroup(d.key))
		.attr('y', () => yScale(0))
		.attr('width', xSubgroup.bandwidth())
		.attr('height', () => yHeight - yScale(0));

	g.selectAll('rect').transition()
		.duration(duration)
		.attr('y', (d) => yScale(d.value))
		.attr('height', (d) => yHeight - yScale(d.value))
		.delay((d, i) => i * delay);
};

const BarChart = (context) => {
	const ref = useRef();

	useEffect(() => barChart({ ...context, ref }));

	return (
		<svg ref={ ref }/>
	);
};

export default BarChart;
