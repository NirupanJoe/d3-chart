import React from 'react';
import { PieChart, Pie, Tooltip, Legend, LabelList } from 'recharts';

const ReChartPie = (context) => {
	const { config: { pieChartProps: {
		width, height, radius: { inner, outer }, pieFill, labelFill,
	}}, data } = context;

	return (
		<PieChart { ...{ width, height } }>
			<Pie
				data={ data }
				dataKey="value"
				fill={ pieFill }
				outerRadius={ outer }
				innerRadius={ inner }
			>
				<LabelList fill={ labelFill }/>
			</Pie>
			<Tooltip/>
			<Legend/>
		</PieChart>);
};

export default ReChartPie;
