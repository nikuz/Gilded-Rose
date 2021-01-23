import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should lower sellIn and quality at the end of the day', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(4);
    });

    it('should reduce quality twice as fast once the sell by date has passed', function() {
        const gildedRose = new GildedRose([ new Item('foo', 1, 10) ]);

        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(9);

        items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(7);
    });

    it('should never make quality of an item as negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 1, 1) ]);

        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(0);

        items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('should increase quality for "Aged Brie" items', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 1) ]);

        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(2);
    });

    it('should never set quality more than 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 5, 49) ]);

        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(50);

        items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(3);
        expect(items[0].quality).to.equal(50);
    });

    it('should not lower sellIn and quality for "Sulfuras" items', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras', 5, 5) ]);

        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Sulfuras');
        expect(items[0].sellIn).to.equal(5);
        expect(items[0].quality).to.equal(5);
    });

    it('should increase quality for "Backstage passes" items', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes', 6, 5) ]);

        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes');
        expect(items[0].sellIn).to.equal(5);
        expect(items[0].quality).to.equal(7);

        items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes');
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(10);
    });

    it('should set quality to zero for "Backstage passes" items after concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes', 1, 5) ]);

        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes');
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(8);

        items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes');
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('should lower quality for "Conjured" items twice as fast as normal items', function() {
        const gildedRose = new GildedRose([ new Item('Conjured', 5, 5) ]);

        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Conjured');
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(3);
    });
});
