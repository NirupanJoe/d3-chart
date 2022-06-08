/* eslint-disable id-match */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const two = 2;
const ten = 10;

// eslint-disable-next-line max-statements
const pieChart = (context) => {
	const { config: { pieChartProps: {
		radius: { inner }, width, height, margin,
	}}, ref, data } = context;

	const radius = (Math.min(width, height) / two) - margin;
	const createPie = d3.pie().sort(null)
		.value((d) => d.value);
	const createArc = d3.arc()
		.innerRadius(inner)
		.outerRadius(radius);
	const outerArc = d3.arc()
		.innerRadius(inner)
		.outerRadius(radius);
	const midAngle = (d) => d.startAngle + ((d.endAngle - d.startAngle) / two);
	const colors = d3.scaleOrdinal(d3.schemeCategory10);
	const svg = d3.select(ref.current).attr('width', width)
		.attr('height', height);

	const g = svg.append('g').attr('class', 'parent')
		.attr('transform', `translate(${ width / two }, ${ height / two })`);

	const arcs = g
		.selectAll()
		.data(createPie(data))
		.join('g')
		.attr('class', 'arc');

	arcs
		.append('path')
		.attr('fill', (d, i) => colors(i))
		.attr('d', createArc);

	arcs
		.append('text')
		.attr('transform', (d) => `translate(${ createArc.centroid(d) })`)
		.attr('fill', 'white')
		.attr('fontSize', '15')
		.text((d) => d.data.value);

	arcs.append('polyline')
		.attr('stroke', 'black')
		.style('fill', 'none')
		.attr('stroke-width', 1)
		.attr('points', (d) => {
			const posA = createArc.centroid(d);
			const posB = outerArc.centroid(d);
			const posC = outerArc.centroid(d);

			posC[0] = radius * (midAngle(d) < Math.PI ? 1 : '-1');
			return [posA, posB, posC];
		});

	arcs.append('text')
		.text((d) => d.data.label)
		.attr('transform', (d) => {
			const pos = outerArc.centroid(d);

			pos[0] = radius * (midAngle(d) < Math.PI ? 1 : '-1');
			return `translate(${ pos })`;
		})
		.style('font-size', '1.5vMin')
		.style('text-anchor', (d) => (midAngle(d) < Math.PI ? 'start' : 'end'));

	const legend = svg.append('g').attr('transform',
		`translate(${ 0 },${ ten })`);

	legend
		.selectAll('rect')
		.data(data)
		.join('rect')
		.attr('x', ten)
		.attr('y', (d, i) => i * (ten * two))
		.attr('width', ten)
		.attr('height', ten)
		.style('fill', (d, i) => colors(i));

	legend
		.selectAll('text')
		.data(data)
		.join('text')
		.attr('x', (ten * two) + ten)
		.attr('y', (d, i) => (i * (ten * two)) + ten)
		.attr('font-size', '15px')
		.attr('fill', '#000')
		.text((d) => d.label);
};

const PieChart = (context) => {
	const ref = useRef();

	useEffect(() => pieChart({ ...context, ref }), [context]);

	return (
		<svg ref={ ref }/>
	);
};

export default PieChart;
