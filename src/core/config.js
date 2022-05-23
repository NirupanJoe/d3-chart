/* eslint-disable no-magic-numbers */
import { range, map } from '@laufire/utils/collection';
import { rndBetween, rndString } from '@laufire/utils/random';

const config = {
	barChartProps: {
		width: 300,
		height: 300,
		margin: {
			bottom: 30,
			left: 55,
			top: 10,
			right: 10,
		},
		xScale: {
			padding: 0.2,
		},
		subBarPadding: 0.05,
		duration: 1000,
		delay: 100,
	},
	barAndLineChartProps: {
		width: 300,
		height: 300,
		margin: {
			bottom: 30,
			left: 55,
			top: 10,
			right: 10,
		},
		xScale: {
			padding: 0.3,
		},
		lineStrokeWidth: 3,
		duration: 1000,
		delay: 100,
	},
	pieChartProps: {
		width: 300,
		height: 300,
		radius: {
			outer: 150,
			inner: 60,
		},
	},
	product: [
		{
			product: 'orange',
			weekOne: 10,
			weekTwo: 200,
			weekThree: 45,
		},
		{
			product: 'apple',
			weekOne: 30,
			weekTwo: 80,
			weekThree: 45,
		},
		{
			product: 'grape',
			weekOne: 15,
			weekTwo: 54,
			weekThree: 45,
		},
	],
	market: [
		{
			product: 'carrot',
			sold: 120,
		},
		{
			product: 'cabbage',
			sold: 30,
		},
		{
			product: 'tomato',
			sold: 65,
		},
	],

	population: map(range(0, 8), () => ({
		country: rndString(),
		population: rndBetween(0, 60),
	})),

	radarChartOptions: {
		width: 350,
		height: 350,
		margin: { top: 20, right: 20, bottom: 20, left: 20 },
		levels: 5,
		maxValue: 0.5,
		labelFactor: 1.25,
		wrapWidth: 60,
		opacityArea: 0.35,
		dotRadius: 4,
		opacityCircles: 0.1,
		strokeWidth: 2,
		roundStrokes: true,
	},

	smartPhones: [
		{
			name: 'iPhone',
			axes: [
				{ axis: 'Battery Life', value: 0.22 },
				{ axis: 'Brand', value: 0.28 },
				{ axis: 'Contract Cost', value: 0.29 },
				{ axis: 'Design And Quality', value: 0.17 },
				{ axis: 'Have Internet Connectivity', value: 0.22 },
				{ axis: 'Large Screen', value: 0.02 },
				{ axis: 'Price Of Device', value: 0.21 },
				{ axis: 'To Be A Smartphone', value: 0.50 },
			],
		},
		{ name: 'Samsung',
			axes: [
				{ axis: 'Battery Life', value: 0.27 },
				{ axis: 'Brand', value: 0.16 },
				{ axis: 'Contract Cost', value: 0.35 },
				{ axis: 'Design And Quality', value: 0.13 },
				{ axis: 'Have Internet Connectivity', value: 0.20 },
				{ axis: 'Large Screen', value: 0.13 },
				{ axis: 'Price Of Device', value: 0.35 },
				{ axis: 'To Be A Smartphone', value: 0.38 },
			] },
		{
			name: 'Nokia',
			axes: [
				{ axis: 'Battery Life', value: 0.26 },
				{ axis: 'Brand', value: 0.10 },
				{ axis: 'Contract Cost', value: 0.30 },
				{ axis: 'Design And Quality', value: 0.14 },
				{ axis: 'Have Internet Connectivity', value: 0.22 },
				{ axis: 'Large Screen', value: 0.04 },
				{ axis: 'Price Of Device', value: 0.41 },
				{ axis: 'To Be A Smartphone', value: 0.30 },
			],
		},
	],

};

export default config;
