import { map } from '@laufire/utils/collection';

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
};

export default ChartManager;
