import { React } from 'react';
import './App.scss';
import BarChart from './components/barChart';
import PieChart from './components/pieChart';
import ChartManager from './services/chartManager';

const App = (context) => {
	const { getBarChartData, getPieChartData } = ChartManager;

	return (
		<div className="App" role="App">
			<BarChart { ...{ ...context, data: getBarChartData(context) } }/>
			<PieChart { ...{ ...context, data: getPieChartData(context) } }/>
		</div>);
};

export default App;
