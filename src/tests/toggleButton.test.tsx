import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButton from '../components/ToggleButton';

describe('<Toggle /> Component test', () => {
    it('It should render OFF by default', () => {
        render(<ToggleButton />);
        expect(screen.getByText(/OFF/)).toBeInTheDocument();
    });

    it('It should render ON when clicked', () => {
        render(<ToggleButton />);
        expect(screen.getByText(/OFF/)).toBeInTheDocument(); 
        fireEvent.click(screen.getByText(/OFF/))
        expect(screen.getByText(/ON/)).toBeInTheDocument();
    });
});