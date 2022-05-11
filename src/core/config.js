const config = {
	barChartProps: {
		width: 500,
		height: 500,
		margin: {
			bottom: 20,
			left: 25,
		},
		xScale: {
			padding: 0.2,
		},
		subBarPadding: 0.005,
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
};

export default config;
