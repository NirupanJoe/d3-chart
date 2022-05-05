/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';

// eslint-disable-next-line max-statements
const pieChart = (context) => {
	const { config: { pieChartProps: { radius: { inner, outer }}},
		ref, data } = context;
	const createPie = d3.pie().value((d) => d.value);
	const createArc = d3.arc()
		.innerRadius(inner)
		.outerRadius(outer);
	const colors = d3.scaleOrdinal(d3.schemeCategory10);
	const svg = d3.select(ref.current);

	const arcs = svg
		.selectAll()
		.data(createPie(data))
		.enter()
		.append('g')
		.attr('class', 'arc')
		.attr('transform', `translate(${ outer }, ${ outer })`);

	arcs
		.append('path')
		.attr('fill', (d, i) => colors(i))
		.attr('d', createArc);

	arcs
		.append('text')
		.attr('transform', (d) => `translate(${ createArc.centroid(d) })`)
		.call((text) =>
			text
				.append('tspan')
				.attr('x', '-2em')
				.attr('fill', 'white')
				.attr('fontSize', '12')
				.text((d) => d.data.label))
		.call((text) =>
			text
				.append('tspan')
				.attr('x', '-2em')
				.attr('y', '-1em')
				.attr('fill', 'white')
				.attr('fontSize', '15')
				.text((d) => d.data.value));
};

const PieChart = (context) => {
	const { config: { pieChartProps }} = context;
	const ref = useRef();

	useEffect(() => pieChart({ ...context, ref }), []);

	return (
		<svg ref={ ref } { ...pieChartProps }/>
	);
};

export default PieChart;
