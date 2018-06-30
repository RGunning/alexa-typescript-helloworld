import {} from 'jasmine';

import {getRandomItem} from '../../src/helpers/randomItem.helper';

describe('getRandomItem', () => {
    it('Should return a random item from the given array',()=>{
        const list = [1,2,3,4,5];
        expect(list).toContain(getRandomItem(list));
    })
});