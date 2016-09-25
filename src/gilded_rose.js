function update_quality(items) {

  items.forEach((item) => {
    quality(item);
    sellIn(item);
  })

  function quality(item) {
    if (item.name == 'Aged Brie' || item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality < 50) {
        item.quality++
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.sell_in < 11 && item.quality < 50) {item.quality++}
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.sell_in < 6  && item.quality < 50) {item.quality++}
      }
    }else{
      if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {item.quality--}
    }
    if (item.sell_in < 0) {
      if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {item.quality--}
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {item.quality = item.quality - item.quality}
    }
  }

  function sellIn(item) {
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sell_in--;
    }
  }
}

module.exports = update_quality;
