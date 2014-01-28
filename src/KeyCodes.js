this.cutie = this.cutie || {};

(function(module){
	/**
	 * Holds a list of ASCII values for commently-accessed keybard key.s.
	 * @namespace cutie.KeyCodes
	 * @type {Object}
	 * @property {Number} UP The up arrow key on the keyboard.
	 * @property {Number} DOWN The down arrow key on the keyboard.
	 * @property {Number} LEFT The left arrow key on the keyboard.
	 * @property {Number} RIGHT The right arrow key on the keyboard.
	 * @property {Number} W The 'w' key on the keyboard.
	 * @property {Number} A The 'a' key on the keyboard.
	 * @property {Number} S The 's' key on the keyboard.
	 * @property {Number} D The 'd' key on the keyboard.
	 * @property {Number} SHIFT The shift key on the keyboard.
	 * @property {Number} RETURN The enter/return key on the keyboard.
	 * @property {Number} CTRL The control key on the keyboard.
	 * @property {Number} TAB The tab key on the keyboard.
	 * @property {Number} Q The 'q' key on the keyboard.
	 * @property {Number} E The 'e' key on the keyboard.
	 * @property {Number} Z The 'z' key on the keyboard.
	 * @property {Number} X The 'x' key on the keyboard.
	 * @property {Number} C The 'c' key on the keyboard.
	 * @property {Number} V The 'v' key on the keyboard.
	 * @property {Number} F The 'f' key on the keyboard.
	 * @property {Number} ZERO The '0' key on the keyboard.
	 * @property {Number} ONE The '1' key on the keyboard.
	 * @property {Number} TWO The '2' key on the keyboard.
	 * @property {Number} THREE The '3' key on the keyboard.
	 * @property {Number} FOUR The '4' key on the keyboard.
	 * @property {Number} FIVE The '5' key on the keyboard.
	 * @property {Number} SIX The '6' key on the keyboard.
	 * @property {Number} SEVEN The '7' key on the keyboard.
	 * @property {Number} EIGHT The '8' key on the keyboard.
	 * @property {Number} NINE The '9' key on the keyboard.
	 */
	var KeyCodes = {
		
		"UP": 38,
		"DOWN": 40,
		"LEFT": 37,
		"RIGHT": 39,
		"W": 87,
		"A": 65,
		"S": 83,
		"D": 68,
		"SHIFT": 16,
		"RETURN": 13,
		"CTRL": 17,
		"TAB": 9,
		"Q": 81,
		"E": 69,
		"Z": 90,
		"X": 88,
		"C": 67,
		"V": 86,
		"F": 70,
		"ZERO": 48,
		"ONE": 49,
		"TWO": 50,
		"THREE": 51,
		"FOUR": 52,
		"FIVE": 53,
		"SIX": 54,
		"SEVEN": 55,
		"EIGHT": 56,
		"NINE":57
	};

	module.KeyCodes = KeyCodes;
})(this.cutie);