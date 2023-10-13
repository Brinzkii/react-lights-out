import { render, fireEvent } from '@testing-library/react';
import Cell from './Cell';

it('renders without crashing', function () {
	render(<Cell />);
});

it('matches snapshot', function () {
	const { asFragment } = render(<Cell />);
	expect(asFragment()).toMatchSnapshot();
});
