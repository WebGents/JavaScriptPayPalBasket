# JavaScript PayPal Basket
This is a simple JavaScript basket that requires JQuery.
The goal is simply to make a simple fast to implement basket to CMS like Joomla or Wordpress.

**WARNING: since this is handled in JavaScript and uses LocalStorage to generate an order it can be _manipulated_ in the browser.**
**So if you choose to use this, make sure that you double check every order you receive if prices are correct.**

## Usage
There is 2 ways of using this script, first script is loaded in the header and the second its loaded in the body, best after DOM is ready.
### Header Loading
Minify the following script files with whatever tool you like best:
 - **/js/model/Basket.js**
 - **/js/model/CartItem.js**
 - **/js/model/Price.js**
 - **/js/model/SelectOption.js**
 - **/js/functions.js**
 - **/js/headerstart.js**

### Body Loading
Minify the following script files with whatever tool you like best:
 - **/js/model/Basket.js** 
 - **/js/model/CartItem.js**
 - **/js/model/Price.js**
 - **/js/model/SelectOption.js**
 - **/js/functions.js**
 - **/js/bodystart.js**

### Basket setup
```
<!-- Optional -->
<input type="hidden" name="basket-empty-label" value="Basket is empty..." />
<input type="hidden" name="checkout-label" value="Make booking with PayPal" />
<!-- Required -->
<input type="hidden" name="business-currency" value="THB" />
<input type="hidden" name="business-email" value="pearldivingkohtao@gmail.com"/>
<div id="cartContainer">
</div>
```
If basket-empty-label is not set, there will just be an empty line at the basket.
if checkout-label is not set, the default text is "Checkout"
The rest must be set, business-email is the PayPal account e-mail.
The business-currency is for PayPal, check PayPal documentation around accepted currencies.
### Item setup
```
<form class="cart-item">
    <input type="hidden" name="id" value="banana"/>
    <input type="hidden" name="price" value="100"/>
    <input type="hidden" name="price_quantity_5" value="90"/>
    <input type="hidden" name="price_quantity_10" value="80"/>
    <input type="hidden" name="label" value="Banana" />
    Amount:	<input type="number" name="quantity" value="1" />
    <input type="submit" value="Add to cart" /> 
</form>
```
When setting the id in the hidden parameret, make sure its unique so it does not collide with other objects that has same id.
label is shown in basket both on PayPal and the cartContainer in the browser.
A product can have multiple prices, but make sure all prices are unique. In above example we see that pice of banana is 100 each if higher than 5 its 90 and if higher than 10 its 80.
```
<form class="cart-item">
    <input type="hidden" name="id" value="apples"/>
    <input type="hidden" name="price_option_red-apple" value="60"/>
    <input type="hidden" name="price_option_red-apple_quantity_5" value="50"/>
    <input type="hidden" name="price_quantity_1_option_green-apple" value="50"/>
    <input type="hidden" name="label" value="Apple" />
    <select name="option">
	    <option value="red-apple">Red</option>
	    <option value="green-apple">Green</option>
    </select>
    Amount:	<input type="number" name="quantity" value="1" />
    <input type="submit" name="summit" value="Add to cart" /> 
</form>
```
In above example you can add changes in price with the option_{id of option}, if multiple options, you must write each combination, and give a price.