/* eslint-disable id-match */
/* eslint-disable max-lines-per-function */
import { React, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Tooltip from './tooltip';

const two = 2;

// eslint-disable-next-line max-statements
const renderTreeMap = ({ ref, data, config: { treeMapProps:
	{ width, height, fontSize, margin: {
		top, bottom, left, right,
	}}}}) => {
	const svg = d3.select(ref.current);
	const xWidth = width - left - right;
	const yHeight = height - top - bottom;
	const gx = (left + right) / two;
	const gy = (top + bottom) / two;

	const { mouseleave, mousemove, mouseover } = Tooltip;

	svg.attr('width', width).attr('height', height);

	const g = svg.append('g').attr('transform', `translate(${ gx }, ${ gy } )`);

	const root = d3
		.hierarchy(data)
		.sum((d) => d.value)
		.sort((a, b) => b.value - a.value);

	const treeMapRoot = d3.treemap().size([xWidth, yHeight])
		.padding(1)(root);

	const nodes = g
		.selectAll('g')
		.data(treeMapRoot.leaves())
		.join('g')
		.attr('transform', (d) => `translate(${ d.x0 },${ d.y0 })`);

	const fader = (color) => d3.interpolateRgb(color, '#fff')('0.3');
	const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

	nodes
		.append('rect')
		.attr('width', (d) => d.x1 - d.x0)
		.attr('height', (d) => d.y1 - d.y0)
		.attr('fill', ({ data: { category }}) => colorScale(category))
		.on('mouseover', mouseover)
		.on('mousemove', mousemove)
		.on('mouseleave', mouseleave);

	nodes
		.append('text')
		.text((d) => d.data.value)
		.attr('font-size', `${ fontSize }px`)
		.attr('x', '3')
		.attr('y', fontSize);
	nodes
		.append('text')
		.text((d) => d.data.name)
		.attr('font-size', `${ fontSize }px`)
		.attr('x', '3')
		.attr('y', fontSize * two);
};

const TreeMap = (context) => {
	const ref = useRef();

	useEffect(() => {
		renderTreeMap({ ...context, ref });
	}, []);

	return (
		<div>
			<svg ref={ ref }/>
		</div>
	);
};

export default TreeMap;
