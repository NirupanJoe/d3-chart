import { map, values } from '@laufire/utils/collection';

const ChartManager = {
	productBarChartData: ({ config: { product }}) =>
		product.map(({ product: label, ...props }) => ({
			label: label,
			value: map(props, (value, key) => ({
				key,
				value,
			})),
		})),

	marketPieChartData: ({ config: { market }}) =>
		market.map(({ product, sold }) => ({
			label: product,
			value: sold,
		})),

	populationBarChartData: ({ config: { population }}) =>
		population.map(({ country: label, population: value }) => ({
			label,
			value,
		})),

	productRechartBarData: ({ config: { product }}) =>
		product.map(({ product: label, ...props }) => ({
			label: label,
			value: { ...props },
		})),

	regionRechartPieData: (data) => {
		const getRegion = data.map(({ region }) => region.value)
			.reduce((prev, cur) => ({
				...prev,
				[cur]: (prev[cur] || 0) + 1,
			}), {});

		return values(map(getRegion, (value, key) => ({
			name: key,
			value: value,
		})));
	},
};

export default ChartManager;
