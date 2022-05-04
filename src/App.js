import { React } from 'react';
import './App.scss';
import BarChart from './components/barChart';
import PieChart from './components/pieChart';

const App = (context) => {
	const { config } = context;

	return (
		<div className="App" role="App">
			<BarChart { ...{ ...context, data: config.data } }/>
			<PieChart { ...{ ...context, data: config.data1 } }/>
		</div>);
};

export default App;
