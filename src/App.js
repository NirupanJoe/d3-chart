import { React } from 'react';
import './App.scss';
import BarChart from './components/barChart';
import PieChart from './components/pieChart';
import ChartManager from './services/chartManager';

const App = (context) => {
	const {
		productBarChartData, marketPieChartData,
	} = ChartManager;

	return (
		<div className="App" role="App">
			<BarChart { ...{ ...context,
				data: productBarChartData(context) } }
			/>
			<PieChart { ...{ ...context, data: marketPieChartData(context) } }/>
		</div>);
};

export default App;
