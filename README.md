# JavaScript PayPal Basket
This is a simple JavaScript basket that requires JQuery.
The goal is simply to make a simple fast to implement basket to CMS like Joomla or Wordpress.

**WARNING: since this is handled in JavaScript and uses LocalStorage to generate an order it can be _manipulated_ in the browser.**
**So if you choose to use this, make sure that you double check every order you receive if prices are correct.**

## Usage
Script in any location before implementation

### Basket setup
Look in comments in example for setup. only Email is required, rest have default values.
```
    <div id="cartContainer">
    </div>
     <script>
      document.getElementById('cartContainer').basket({
          email : "bamma1985@gmail.com", // Must be set
          currency : "DKK", // optional GBP is default
          locale  : "DK", // optional GB is default
          checkoutLabel : "Pay now", // optional "Checkout" is default
          emptyBasketString : "No items in basket", //optional "basket is empty..." is default
          customAction : function(){ //optional if not set is will only execute checkout
            alert("Do stuff before checkout");
            checkout();
      }});
    </script>
```
### Item setup
Items is setup by added the addProduct function, it contains 2 parameters, first is the label and the second is the price or prices
if no items changed based on options or prices its fine to write .addProduct("name",123); for a price of 123, no matter options or quantity.
The id of the form MUST be unique across ENTIRE website, not just the page, the id is used by basket to list items.
```
<form id="apple-item" class="cart-item">
    <select name="option">
        <option value="red-apple">Red</option>
        <option value="green-apple">Green</option>
    </select>
    Amount:	<input type="number" name="quantity" value="1" />
    <input type="submit" name="summit" value="Add to cart" /> 
</form>
<script>
document.getElementById('apple-item').addProduct("Apple",{
    prices:[
    {
        price: {
            value:60,
            options:["red-apple"]
        }
    },
    {
        price: {
            value:50,
            options:["red-apple"],
            quantity:5
        }
    },
      {
        price: {
            value:60,
            options:["green-apple"]
        }
      }
    ]
});
</script>
```
