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
            if (isSulfuras(item) && item.quality !== 80) {
                item.quality = 80;
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

            if (quality === 0 || quality === 50) {
                continue;
            }

            if (isAgedBrie(item) || isBackstagePasses(item)) {
                let qualityAdvance = 1;
                if (isBackstagePasses(item)) {
                    qualityAdvance = sellIn <= 5 ? 3 : 2;
                    if (sellIn <= 0) {
                        qualityAdvance = -item.quality;
                    }
                }
                item.quality += qualityAdvance;
            } else {
                const qualityDegradation = isConjured(item) || sellIn <= 0 ? 2 : 1;
                item.quality -= qualityDegradation
            }
        }

        return this.items;
    }
}
