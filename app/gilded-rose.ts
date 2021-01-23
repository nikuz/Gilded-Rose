//
function compareName(name: string, target: string): boolean {
    return name.toLocaleLowerCase().indexOf(target) !== -1
}

function isAgedBrie(item: Item): boolean {
    return compareName(item.name, 'aged brie');
}

function isSulfuras(item: Item): boolean {
    return compareName(item.name, 'sulfuras');
}

function isBackstagePasses(item: Item): boolean {
    return compareName(item.name, 'backstage passes');
}

function isConjured(item: Item): boolean {
    return compareName(item.name, 'conjured');
}

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        items.forEach((item) => {
            if (isSulfuras(item)) {
                if (item.sellIn < 0) {
                    item.sellIn = 0;
                }
                if (item.quality < 80) {
                    item.quality = 80;
                }
            }
        });
        this.items = items;
    }

    updateQuality() {
        const items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i];

            if (isSulfuras(item)) {
                continue;
            }

            const sellIn = item.sellIn;
            const quality = item.quality;

            item.sellIn--;

            if (isAgedBrie(item) || isBackstagePasses(item)) {
                if (isAgedBrie(item) && quality < 50) {
                    item.quality++;
                } else if (isBackstagePasses(item)) {
                    if (sellIn <= 0) {
                        item.quality = 0;
                    } else if (quality < 50) {
                        item.quality += sellIn <= 5 ? 3 : 2;
                    }
                }
            } else if (quality > 0) {
                const qualityDegradation = isConjured(item) || sellIn <= 0 ? 2 : 1;
                item.quality -= qualityDegradation
            }
        }

        return this.items;
    }
}
