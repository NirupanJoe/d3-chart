/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { React, useEffect, useRef } from 'react';
// eslint-disable-next-line id-match
import * as d3 from 'd3';

const two = 2;

const drawTree = ({ data, ref, config: { treeMapProps:
	{ fontSize, radius, width, height, margin: {
		top, bottom, left, right,
	}}}}) => {
	const xWidth = width - left - right;
	const x = (left + right) / two;
	const y = (top + bottom) / two;

	const svg = d3.select(ref.current)
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', `translate(${ left },${ top })`);

	const cluster = d3.cluster()
		.size([height - bottom, xWidth - right]);

	const root = d3.hierarchy(data, (d) => d.children);

	cluster(root);

	svg.selectAll('path')
		.data(root.descendants().slice(1))
		.join('path')
		.attr('d', (d) => `M${ d.y },${ d.x
		}C${ d.parent.y + x },${ d.x
		} ${ d.parent.y + y },${ d.parent.x
		} ${ d.parent.y },${ d.parent.x }`)
		.attr('class', 'link');

	const node = svg.selectAll('g')
		.data(root.descendants())
		.join('g')
		.attr('class', 'node')
		.attr('transform', (d) => `translate(${ d.y },${ d.x })`);

	node.append('circle')
		.attr('r', radius);

	node.append('text')
		.attr('y', -(radius + two))
		.attr('text-anchor', 'middle')
		.attr('font-size', `${ fontSize }px`)
		.text((d) => d.data.name);
};

const TreeChart = (context) => {
	const { data } = context;

	const ref = useRef();

	useEffect(() => {
		drawTree({ ...context, ref });
	}, [data]);

	return (
		<div className="tree-map-chart">
			<svg ref={ ref }/>
		</div>
	);
};

export default TreeChart;
