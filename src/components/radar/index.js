import { React, useEffect, useRef } from 'react';
import CreateRadarChart from './createRadarChart';

const RadarChart = (context) => {
	const ref = useRef();

	useEffect(() => CreateRadarChart({ ...context, ref }));

	return <svg ref={ ref }/>;
};

export default RadarChart;
