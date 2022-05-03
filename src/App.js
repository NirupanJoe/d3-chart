import { React } from 'react';
import './App.scss';
import BarChart from './components/barChart';

const App = (context) => {
	const { config } = context;

	return (
		<div className="App" role="App">
			<BarChart { ...{ ...context, data: config.data } }/>
			<BarChart { ...{ ...context, data: config.data1 } }/>
		</div>);
};

export default App;
