import { useContext } from 'react';
import { FilterContext } from './FilterContextAPI';

export const useFilterContext = () => useContext(FilterContext); 