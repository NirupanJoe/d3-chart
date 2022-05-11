import { map } from '@laufire/utils/collection';

const ChartManager = {
	getBarChartData: ({ config: { product }}) =>
		product.map(({ product: label, ...props }) => ({
			label: label,
			value: map(props, (value, key) => ({
				key,
				value,
			})),
		})),

	getPieChartData: ({ config: { market }}) =>
		market.map(({ product, sold }) => ({
			label: product,
			value: sold,
		})),
};

export default ChartManager;
