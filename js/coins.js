jQuery(document).ready(function($) {
  function flipCoin(e) {
    e.preventDefault();
    
    var flipTime = 2500; 
    var $theCoin = $('#coin');
    var $flipTrigger = $('.js-flip-coin');
    var heads = 'is-heads';
    var tails = 'is-tails';
    var flipping = 'is-flipping';
	$("p").fadeOut(1250);
	$("#anim_div").css("paddingLeft","300px");
	$("#anim_div").animate({height: 0,width: 0},{duration:4000});
	//$("#anim_div").animate({width: 0}, "slow");
	
	$("#anim_div_1").css("backgroundImage","url('http://s1.iconbird.com/ico/2013/11/481/w256h2561383944523summerswimringnotext.png')");
	$("#anim_div_1").css("paddingLeft","300px");
	$("#anim_div_1").animate({
            //left: '250px',
        });
	
    // текст результату
    function theResult(string) {
      var $result = $('.result');
      $result.text(string);
    }
    
    // текст кнопки
    function btnText(string) {
      $flipTrigger.text(string);
    }
    
    theResult('Flipping Coin...');
    btnText('Flipping...');
    
    // зараз монетка перевертається
    if(!$flipTrigger.hasClass(flipping)) {
      
      // додаємо відповідні класи
      function coinLanded(result) {
        $theCoin.addClass(result);
        $theCoin.removeClass(flipping);
        $flipTrigger.removeClass(flipping);
      }
      
      $flipTrigger.addClass(flipping);
      
      // отримуємо результат
      function coinResult() {
        
        // 50:50 chance
        if(Math.random() >= 0.5) {
          // орел
          coinLanded(heads);
          theResult('Landed on Heads!');
          btnText('Flip Coin');
        } else {
          // решка
          coinLanded(tails);
          theResult('Landed on Tails!');
          btnText('Flip Coin');
        }
      }
      
      // скидаємо на початок
      if($theCoin.hasClass(heads) || $theCoin.hasClass(tails)) {
        $theCoin.removeClass(heads).removeClass(tails);
      }
      
      // монетка а процесі
      $theCoin.addClass(flipping);
      setTimeout(coinResult, flipTime);
    }
  }
    
  // викликаємо
  $('.js-flip-coin').on('click', flipCoin);
  $('#coin').on('click', flipCoin);
}(jQuery));