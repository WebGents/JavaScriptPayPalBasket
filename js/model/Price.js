/*!
 * Require jQuery to work
 * https://jquery.com/
 *
 * Created by Henrik Bøgelund Lavstsen
 * email: henrik@webgents.dk
 */
function Price(obj){
	this.amount = 0;
	this.quantity = 1;
	this.options = [];
	Price.prototype.addOption = function(option){
		this.options.push(option);
	}
	for (var prop in obj) {
		this[prop] = obj[prop];
	}
};