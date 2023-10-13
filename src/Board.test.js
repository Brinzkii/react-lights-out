import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

it('renders without crashing', function () {
	render(<Board />);
});

it('matches snapshot', function () {
	const { asFragment } = render(<Board chanceLightStartsOn={100} />);
	expect(asFragment()).toMatchSnapshot();
});

it('flips cell and those around it when clicked', function () {
	const { container } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={100} />);

	// expect all 25 cells to be lit
	expect(container.querySelectorAll('td.Cell-lit').length).toEqual(25);

	// click middle cell
	const cells = container.querySelectorAll(`td.Cell`);
	console.log(cells);
	fireEvent.click(cells[8]);

	// expect 5 cells to have flipped after clicking one in the middle
	expect(container.querySelectorAll('td.Cell-lit').length).toEqual(20);
});

it('should display winner message if all lights are off', function () {
	const { container } = render(<Board chanceLightStartsOn={0} />);

	expect(container.querySelector('h1')).toBeInTheDocument();
});
