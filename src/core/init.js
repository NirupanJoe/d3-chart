import axios from 'axios';
import context from './context';

const init = async () => {
	const { data } = await axios
		.get('http://api.worldbank.org/v2/country/?format=json');

	context.patchState({ region: data[1] });
};

export default init;
