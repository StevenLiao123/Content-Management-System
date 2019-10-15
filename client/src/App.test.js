import React from 'react';
import App from './App';
import { shallow, configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

configure({
    adapter: new EnzymeAdapter()
});
describe('<App />', () => {
    it('renders 1 <App /> component', () => {
        const component = shallow(<App />);
        expect(component).toHaveLength(1);
    });
});

describe('<App />', () => {
    it('<App /> should have 2 routes', () => {
        const component = shallow(<App />);
        expect(component.find('Route')).toHaveLength(2);
    });
});



