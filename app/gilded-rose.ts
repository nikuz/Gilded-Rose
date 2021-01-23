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

            if (!isAgedBrie(item) && !isBackstagePasses(item)) {
                if (item.quality > 0) {
                    if (!isSulfuras(item)) {
                        const qualityDegradation = isConjured(item) ? 2 : 1;
                        item.quality = item.quality - qualityDegradation
                    }
                }
            } else if (item.quality < 50) {
                let qualityAdvance = 1;
                if (isBackstagePasses(item)) {
                    qualityAdvance = item.sellIn <= 5 ? 3 : 2;
                }
                item.quality += qualityAdvance;
            }
            if (!isSulfuras(item)) {
                item.sellIn = item.sellIn - 1;
            }
            if (item.sellIn < 0) {
                if (!isAgedBrie(item)) {
                    if (!isBackstagePasses(item)) {
                        if (item.quality > 0) {
                            if (!isSulfuras(item)) {
                                item.quality = item.quality - 1
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
