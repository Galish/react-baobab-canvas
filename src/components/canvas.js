import {React, branch} from '../vendor';
import Menu from './menu';
import tree from '../state';
import ImageUploadForm from './form';
import Mosaic from './mosaic';

@branch({
  cursors: {
    imageSrc: ['image', 'src']
  }
})

export default class extends React.Component {
	render () {
		return (
			<div>
				<Menu />
				<h1>Canvas</h1>
				<ImageUploadForm />
				<Mosaic />
			</div>
		)
	}
};