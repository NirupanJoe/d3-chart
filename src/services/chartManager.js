const ChartManager = {
	getBarChartData: ({ config: { data }}) => data.map(({ product, sold }) => ({
		label: product,
		value: sold,
	})),

	// eslint-disable-next-line id-match
	getPieChartData: ({ config: { data1 }}) =>
		data1.map(({ product, sold }) => ({
			label: product,
			value: sold,
		})),
};

export default ChartManager;
