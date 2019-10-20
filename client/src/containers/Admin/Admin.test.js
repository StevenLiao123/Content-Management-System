import Admin from './Admin';
import React from 'react';
import { shallow, configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

configure({
    adapter: new EnzymeAdapter()
});

describe('<Admin />', () => {
    const warpper = shallow(<Admin />);

    it('should render login' , () => {
        console.log(warpper.debug());
    });

    it('should render login' , () => {
        expect(warpper.find('Redirect')).toHaveLength(1);
    });
});
