# JavaScript PayPal Basket
This is a simple JavaScript basket that requires JQuery.
The goal is simply to make a simple fast to implement basket to CMS like Joomla or Wordpress.

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
´´´
<input type="hidden" name="basket-empty-label" value="Basket is empty..." />
<input type="hidden" name="business-email" value="pearldivingkohtao@gmail.com"/>
<input type="hidden" name="business-currency" value="THB" />
<input type="hidden" name="checkout-label" value="Make booking with PayPal" />
<div id="cartContainer">
</div>
´´´

### Item setup