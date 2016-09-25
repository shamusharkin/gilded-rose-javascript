function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function ArrayOfItems() {
  var items = []

  //       Product    Name           /Sell-in /quality
  //Sellin is the number of Days to Sell a Product
  //Quality is the price of an item
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 6));
  return items;
}

module.exports = ArrayOfItems;
