const config = {
	barChartProps: {
		width: 500,
		height: 500,
		margin: {
			bottom: 20,
			left: 25,
		},
		xscale: {
			padding: 0.2,
		},
		duration: 3000,
		delay: 500,
	},
	pieChartProps: {
		width: 350,
		height: 350,
		radius: {
			outer: 150,
			inner: 60,
		},
	},
	data: [
		{
			product: 'orange',
			sold: 10,
		},
		{
			product: 'apple',
			sold: 30,
		},
		{
			product: 'grape',
			sold: 15,
		},
	],
	data1: [
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
};

export default config;
