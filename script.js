$(document).ready(function(){
	$(".digit").on("click", function(){
		digitAction($(this).find('span').text());
	});
	
	$(window).keypress(function(e) {
    var charCode = e.which;
    if (!charCode) { // <-- charCode === 0
        return;// return false, optionally
    }
		var keyPressed = String.fromCharCode(charCode).toLowerCase();
		if (charCode === 13) {
			keyPressed = '=';
		}
		if (charCode === 8 || charCode === 46) {
			console.log('hi back')
		}
		if ( validKey(keyPressed) ) {
			digitAction(keyPressed);
		}
    return false; // Or e.preventDefault(); and/or e.stopPropagation()
	});
	
	function validKey(val) {
		var acceptable = ['%','/','*','-','+','=','.','(',')'];
		if (!isNaN(parseFloat(val)) || acceptable.indexOf(val) > -1) {
			return true;
		}
	}
	
	function isToReplace(val) {
		var acceptable = ['%','/','*','-','+','.'];
		if (acceptable.indexOf(val) > -1) {
			return true;
		}
	}
	
	var inputStr = "";
	
	function digitAction(val) {
		if ( $(".calculator input").hasClass('math-finished') ) {
			inputStr = $(".calculator input").val();
			$(".calculator input").val(inputStr).removeClass('math-finished');
		}
		if ( val === 'AC' ) {
			inputStr = '';
			$(".calculator input").val(inputStr);
		}
		else if ( val === 'CE' ) {
			inputStr = inputStr.slice(0,inputStr.length-1);
			$(".calculator input").val(inputStr);
		} 
		else if ( isToReplace(val) && isToReplace(inputStr[inputStr.length-1]) ) {
			inputStr = inputStr.slice(0,inputStr.length-1);
			inputStr += val;
			$(".calculator input").val(inputStr);
		}
		else if ( val === '=') {
			if (isToReplace(inputStr[inputStr.length-1])) {
				inputStr = inputStr.slice(0,inputStr.length-1);
			}
			doTheMaths(inputStr);
		}
		else {
			inputStr += val.toString();
			$(".calculator input").val(inputStr);
		}
	}
	
	function doTheMaths(inVal) {
		try {
			$(".calculator input").val(math.eval(inVal));	
		} catch(e) {
			console.log(e);
			showError();
		}
		$(".calculator input").addClass('math-finished');
	}
	
	function showError() {
			inputStr = 'Invalid input to calculate';
			$(".calculator input").val(inputStr);
		setTimeout(function(){inputStr = '';$(".calculator input").val(inputStr);},3000);
	}
});