import { keys } from '@laufire/utils/collection';
import { unique } from '@laufire/utils/predicates';
// eslint-disable-next-line id-match
import { scaleOrdinal, schemeCategory10 } from 'd3';
import { React } from 'react';
import { Bar, BarChart, CartesianGrid, Legend,
	Tooltip, XAxis, YAxis } from 'recharts';

const color = scaleOrdinal(schemeCategory10);

const bar = (data) =>
	<Bar key={ data } name={ data } dataKey={ `value.${ data }` } fill={ color(data) }/>;

const ReChartBar = (context) => {
	const { config: { barChartProps: { width, height }}, data } = context;
	const barData = data.map(({ value }) => keys(value)).flat()
		.filter(unique);

	return (
		<BarChart { ...{ width, height, data } }>
			<CartesianGrid strokeDasharray="3"/>
			<XAxis dataKey="label"/>
			<YAxis/>
			{ barData.map(bar) }
			<Tooltip/>
			<Legend/>
		</BarChart>
	);
};

export default ReChartBar;
