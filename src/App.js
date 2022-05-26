import { React } from 'react';
import './App.scss';
import BarChart from './components/bar/barChart';
import BarAndLineChart from './components/bar/barAndLineChart';
import ChartManager from './services/chartManager';
import HorizontalBar from './components/bar/HorizontalBar';
import RadarChart from './components/radar';
import ReChartBar from './components/bar/reChartBar';

// eslint-disable-next-line max-lines-per-function
const App = (context) => {
	const { config } = context;
	const {
		productBarChartData,
		populationBarChartData,
		productRechartBarData,
	} = ChartManager;

	return (
		<div className="App" role="App">
			<BarChart { ...{ ...context,
				data: productBarChartData(context) } }
			/>
			<BarAndLineChart { ...{ ...context,
				data: populationBarChartData(context) } }
			/>
			<HorizontalBar { ...{ ...context,
				data: populationBarChartData(context) } }
			/>
			<RadarChart { ...{ ...context, data: config.smartPhones } }/>
			<ReChartBar { ...{ ...context,
				data: productRechartBarData(context) } }
			/>
		</div>);
};

export default App;
