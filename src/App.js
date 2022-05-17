import { React } from 'react';
import './App.scss';
import BarChart from './components/bar/barChart';
import BarAndLineChart from './components/bar/barAndLineChart';
import ChartManager from './services/chartManager';

const App = (context) => {
	const {
		productBarChartData,
		populationBarChartData,
	} = ChartManager;

	return (
		<div className="App" role="App">
			<BarChart { ...{ ...context,
				data: productBarChartData(context) } }
			/>
			<BarAndLineChart { ...{ ...context,
				data: populationBarChartData(context) } }
			/>
		</div>);
};

export default App;
