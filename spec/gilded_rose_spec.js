"use strict"
var updateQuality = require('../src/gilded_rose');

var items = []

function setItems() {
  function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  }

  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 6));

}

describe("Gilded Rose", function() {

  it("All items have a *sell_in* value, the number of days to sell an item, and a quality which is the price", function() {
    //setup
    setItems()
    console.log('items', items);

    //exercise
    //Assertations
    items.forEach((item) => {
        expect(item.sell_in).not.toBeUndefined();
        expect(item.quality).not.toBeUndefined();
    });
  });

  it(" At the end of each day our system lowers both values for every item", function() {
    //setup
    items = [];
    setItems();

    var expectedSi0 = items[0].sell_in;
    var expectedSi1 = items[1].sell_in;
    var expectedSi2 = items[2].sell_in;
    var expectedSi3 = items[3].sell_in;
    var expectedSi4 = items[4].sell_in;
    var expectedSi5 = items[5].sell_in;

    var expectedQ0 = items[0].quality;
    var expectedQ1 = items[1].quality;
    var expectedQ2 = items[2].quality;
    var expectedQ3 = items[3].quality;
    var expectedQ4 = items[4].quality;
    var expectedQ5 = items[5].quality;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[0].sell_in).toBeLessThan(expectedSi0);
    expect(items[1].sell_in).toBeLessThan(expectedSi1);
    expect(items[2].sell_in).toBeLessThan(expectedSi2);
    //Exception - Sulfuras, sell_in days do not decrease, they do not need to be sold
    expect(items[3].sell_in).toEqual(expectedSi3);
    expect(items[4].sell_in).toBeLessThan(expectedSi4);
    expect(items[5].sell_in).toBeLessThan(expectedSi5);

    expect(items[0].quality).toBeLessThan(expectedQ0);
    //Exception - Aged bre increases in Quality
    expect(items[1].quality).toBeGreaterThan(expectedQ1);
    expect(items[2].quality).toBeLessThan(expectedQ2);
    //Exception - sulfuras is always 80 quality, it does not decrease in quality
    expect(items[3].quality).toEqual(80);
    //Exception - Backstage passes increases in quality
    expect(items[4].quality).toBeGreaterThan(expectedQ4);
    expect(items[5].quality).toBeLessThan(expectedQ5);

  });

  it(" Once the *sell_in* days is less then zero, *quality* degrades twice as fast", function() {
    //setup
    items = [];
    setItems();
    //set +5 Dexterity Vest to less than zero
    items[0].sell_in = -1;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[0].quality).toEqual(18);

  });

  it("The *quality* of an item is never negative", function() {
    //setup
    items = [];
    setItems();
    //set +5 Dexterity Vest to less than zero
    items[0].sell_in = -1;
    //set the quality to be zero
    items[0].quality = 0;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[0].quality).toEqual(0);

  });

  it("The *quality* of an item is never more than 50", function() {
    //setup
    items = [];
    setItems();
    //set aged bre to be 50, as aged bre increases in value
    items[1].quality = 50;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[1].quality).toEqual(50);

  });

  it('Backstage passes, *quality* increases by 2 when there are 10 days or less', function() {
    //setup
    items = [];
    setItems();
    //
    items[4].sell_in = 10;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[4].quality).toEqual(22);

  });

  it('Backstage passes, *quality* increases by 3 when there are 5 days or less', function() {
    //setup
    items = [];
    setItems();
    //
    items[4].sell_in = 5;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[4].quality).toEqual(23);

  });

  it('Backstage passes, *quality* drops to 0 after the concert', function() {
    //setup
    items = [];
    setItems();
    //
    items[4].sell_in = -1;

    //exercise
    updateQuality(items);

    //assertation
    expect(items[4].quality).toEqual(0);

  });





});
