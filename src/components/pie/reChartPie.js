import React from 'react';
import { PieChart, Pie, Tooltip, Legend, LabelList, Cell } from 'recharts';
// eslint-disable-next-line id-match
import * as d3 from 'd3';

// eslint-disable-next-line max-lines-per-function
const ReChartPie = (context) => {
	const { config: { pieChartProps: {
		width, height, radius: { inner, outer }, pieFill, labelFill,
	}}, data } = context;
	const colors = d3.scaleOrdinal(d3.schemeDark2);

	return (
		<PieChart { ...{ width, height } }>
			<Pie
				data={ data }
				dataKey="value"
				fill={ pieFill }
				outerRadius={ outer }
				innerRadius={ inner }
			>
				{data.map((dummy, key) =>
					<Cell key={ key } fill={ colors(key) }/>)}
				<LabelList fill={ labelFill }/>
			</Pie>
			<Tooltip/>
			<Legend/>
		</PieChart>);
};

export default ReChartPie;
