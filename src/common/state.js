import Baobab from 'baobab'

let initState = {
	elements: {
		canvas: 'canvas',
		buffer: 'buffer',
		link: 'download-link'
	},
	menu: [
		{
			title: 'Canvas',
			link: 'canvas'
		},
		{
			title: 'Statistics',
			link: 'statistics'
		}
	],
	image: 	{},
	scaled: {},
	mosaic: {},
	stat: 	{},
	svg: 	{},
	status: null,
	progress: {}
};

export default new Baobab(initState);