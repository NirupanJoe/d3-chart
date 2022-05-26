import React from 'react';
import { keys } from '@laufire/utils/collection';
import { unique } from '@laufire/utils/predicates';
// eslint-disable-next-line id-match
import { scaleOrdinal, schemeCategory10 } from 'd3';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
	Legend,
} from 'recharts';

const color = scaleOrdinal(schemeCategory10);

const radar = (data) =>
	<Radar
		key={ data }
		name={ data }
		dataKey={ `value.${ data }` }
		stroke={ color(data) }
		fill={ color(data) }
		fillOpacity={ 0.35 }
		dot={ true }
	/>;

const RaChartRadar = (context) => {
	const { config: { radarChartOptions: { width, height }}, data } = context;
	const radarData = data.map(({ value }) => keys(value)).flat()
		.filter(unique);

	return (
		<RadarChart { ...{ width, height, data } }>
			<PolarGrid gridType="circle"/>
			<PolarAngleAxis dataKey="label"/>
			<PolarRadiusAxis/>
			{radarData.map(radar)}
			<Tooltip/>
			<Legend/>
		</RadarChart>);
};

export default RaChartRadar;
