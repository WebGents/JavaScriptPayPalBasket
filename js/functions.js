/*!
 * Require jQuery to work
 * https://jquery.com/
 *
 * Created by Henrik Bøgelund Lavstsen
 * email: henrik@webgents.dk
 */
var cartContainer = undefined;
var checkoutButton = undefined;
var paypalEmail = undefined;
var paypalCurrency = "GBP";
var doCustomAction = undefined;
var paypalLanguage = "GB";
var basketEmptyString = "Basket is empty...";
function addHiddenInput(target,name, value){
	return target.append(jQuery('<input>',{
		'type' : 'hidden',
		'name' : name,
		'value' : value
	}));
};
HTMLFormElement.prototype.addProduct = function(label,priceOrPrices){
	console.log(label);
	jQuery(this).submit(function(event){
		event.preventDefault();
		var cartItem = new CartItem();
		cartItem.id = this.id;
		cartItem.label = label;
		for(var i=0; i < this.elements.length; i++){
			var element = this.elements[i];
			var value = element.value;
			var currentName = element.name;
			if(currentName == "quantity"){
				cartItem.quantity = value;
			}
		}

		var selects =	this.getElementsByTagName('select');
		for(var i = 0; i < selects.length; i++){
			var element = selects[i];
			var option = new SelectOption();
			option.id =	element.value;
			option.label = element.options[element.selectedIndex].text;
			cartItem.options.push(option);
		}
		if(Number.isInteger(priceOrPrices)){
			var price = new Price();
			price.amount = priceOrPrices;
			cartItem.addPrice(price);
			console.log(priceOrPrices);
		}
		else
		{
			console.log(label);
			console.log(priceOrPrices);
		 	prices =	priceOrPrices["prices"]
			for(var i = 0 ; i < prices.length; i++){
				var jsonPrice = prices[i]
				var price = new Price();
				price.amount = jsonPrice.price.value;
				price.quantity = jsonPrice.price.quantity;
				price.options = jsonPrice.price.options;
				cartItem.addPrice(price);
			}
		}
		console.log(cartItem);
		var basket = getBasket();
		basket.addCartItem(cartItem);
		setBasket(basket);
	});
}
HTMLDivElement.prototype.basket = function (settings) { 
	if(settings.email == undefined)
	{
		console.log("WARNING no email in settings, can't continue");
		return;
	}
	if(settings.currency != undefined)
		paypalCurrency = settings.currency;
	if(settings.locale != undefined)
		paypalLanguage = settings.locale;
	if(settings.emptyBasketString != undefined)
		emptyBasketString = settings.emptyBasketString;
	paypalEmail = settings.email;
    cartContainer = this;
	doCustomAction =settings.customAction;
	redrawCart();
	jQuery(this).on('change','#cart-amount', function () {
		var id = jQuery(this).parents("#cart-item-container").attr("data-id");
		var options = jQuery(this).parents("#cart-item-container").attr("data-options").split(" ");
		var cartData =getBasket();
		var newQuantity = jQuery(this).val();
		if(newQuantity<=0)
		{
		 	cartData.removeCartItem(id,options);
		}
		else
		{
			cartData.updateQuantity(id,options,newQuantity);
		}
		setBasket(cartData);
	});
	jQuery(this).on('click','#remove-cart-item',function(){
		var id = jQuery(this).parent("#cart-item-container").attr("data-id");
		var options = jQuery(this).parent("#cart-item-container").attr("data-options").split(" ");
		var cartData =getBasket();
		cartData.removeCartItem(id,options);
		setBasket(cartData);
	});
	
}
function checkout(){
	var cartData =	getBasket();

	if(cartData.hasItems()){

		var newForm = jQuery('<form>', {
			'action': 'https://www.paypal.com/cgi-bin/webscr',
			'method': 'post',
			'target' : "_blank"
		});
		newForm = addHiddenInput(newForm,"cmd","_cart");
		newForm = addHiddenInput(newForm,"upload","1");
		newForm = addHiddenInput(newForm,"business",paypalEmail);
		newForm = addHiddenInput(newForm,"currency_code",paypalCurrency);
		newForm = addHiddenInput(newForm,"lc",paypalLanguage);
		newForm = addHiddenInput(newForm,"landing_page","Billing");
		var index = 1;
		cartData.cartItems.forEach(function(element) {
			var label = element.label;
			if(element.options.length>0)
			{
				var first = true;
				for(var i= 0;i<element.options.length;i++){
					var selectOptions = element.options[i];
					label+= ' - ' + selectOptions.label;
				}
			}
			newForm = addHiddenInput(newForm,'item_name_'+index,label);
			newForm = addHiddenInput(newForm,'amount_'+index,element.getPrice().amount);
			newForm = addHiddenInput(newForm,'quantity_'+index,element.quantity);
			index +=1;
		}, this);
		newForm.hide();
		jQuery(cartContainer).parent().append(newForm);
		newForm.submit();
	}
}
function redrawCart(){
	var container = jQuery(cartContainer)
	container.empty();
	var cartData =	getBasket();
	
	if(cartData.hasItems())
	{
		cartData.cartItems.sort(function(a,b){
			var aName = a.label.toLowerCase();
  			var bName = b.label.toLowerCase(); 
  			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		});
		cartData.cartItems.forEach(function(element) {
			var price = element.getPrice();
			var label = element.label;
			var options = "";
			if(element.options.length>0)
			{
				var first = true;
				for(var i= 0;i<element.options.length;i++){
					var selectOptions = element.options[i];
					label+= ' - ' + selectOptions.label;
					if(first){
						first = false;
						options = selectOptions.id;
					}
					else
					{
						options+= ' ' +selectOptions.id;
					}
				}
			}

			var cartItem = '<div id="cart-item-container" data-id="'+ element.id +'" data-options="'
				+ options +'"><div class="cart-item-input-container"><input id="cart-amount" class="cart-item-amount" type="number" value="'+element.quantity 
				+'"/></div><div class="cart-item-text"><div class="cart-item-label">' + label +'</div><br/><div class="cart-item-price">'
				+ element.quantity+'x '+ price.amount+'</div></div><input id="remove-cart-item" type="submit" class="cart-item-remove"/ value="x"></div>';
				container.append(cartItem);
		}, this);
		if(checkoutButton != undefined){
			checkoutButton.disabled = false;
		}
	}
	else
	{
		var emptyItem = '<p>'+emptyBasketString+'</p>';
		container.append(emptyItem);
		if(checkoutButton != undefined){
			checkoutButton.disabled = true;
		}
	}
	var basketTotal = '<div id="basket-total">Total: ' + cartData.getTotalPrice()+' '+ paypalCurrency + '</div>';
	container.append(basketTotal);

};

HTMLElement.prototype.checkout = function(){
	checkoutButton = this;
	if(!getBasket().hasItems())
		checkoutButton.disabled = true;
	jQuery(this).click(function(event)
	{
		event.preventDefault();
		if(doCustomAction != undefined)
	 		doCustomAction();
		else
		 	checkout();
		
	});	
}
function getBasket(){
	var untypedObjects= JSON.parse(localStorage.getItem("junglecoder-basket"));
	if(untypedObjects)
		return new Basket(untypedObjects);
	return new Basket();
};
function setBasket(basket){
	localStorage.setItem("junglecoder-basket",JSON.stringify(basket));
	redrawCart();
};



function parsePrice(priceNames,amount){
	var price = new Price();
	price.amount=amount;
	for(var i=0; i < priceNames.length; i++){
		var name = priceNames[i];
		if(name=="option"){
			i++;
			var option = priceNames[i];
			price.addOption(option);
		}
		if(name == 'quantity'){
			i++;
			var quantity = priceNames[i];
			price.quantity = quantity;
		}
	}
	return price;
};
Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { //To test values in nested arrays
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
};

function isInt(n) {
   return n % 1 === 0;
};