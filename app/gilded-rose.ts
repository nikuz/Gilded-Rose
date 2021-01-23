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

            if (quality === 0 || quality === 50) {
                continue;
            }

            if (!isAgedBrie(item) && !isBackstagePasses(item)) {
                const qualityDegradation = isConjured(item) ? 2 : 1;
                item.quality = item.quality - qualityDegradation
            } else {
                let qualityAdvance = 1;
                if (isBackstagePasses(item)) {
                    qualityAdvance = sellIn <= 5 ? 3 : 2;
                }
                item.quality += qualityAdvance;
            }

            if (item.sellIn < 0) {
                if (!isAgedBrie(item)) {
                    if (!isBackstagePasses(item)) {
                        item.quality = item.quality - 1
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else {
                    item.quality = item.quality + 1
                }
            }
        }

        return this.items;
    }
}
