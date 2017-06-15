import React from 'react';
import'react-native';
import renderer from 'react-test-renderer';
import {LoginScene} from '../LoginScene';
import { Spinner} from 'native-base';
    
describe('LoginScene', ()=> {
      const props = {
          busy: false,
          authenticated: false,
          error:null
      };
 	
     test('Should Render Snapshot Correctly', ()=> {
        const tree = renderer.create(
        <LoginScene { ...props} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
     });
});