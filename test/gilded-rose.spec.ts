import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const name = 'foo';
        const gildedRose = new GildedRose([ new Item(name, 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(name);
    });

});
