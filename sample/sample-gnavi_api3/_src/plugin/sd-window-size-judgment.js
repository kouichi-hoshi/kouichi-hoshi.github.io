jQuery(function() {
jQuery(window).on('load resize', function(){
//--------------------------------------------------------------------------------------------------------------------


/*
 * ※※※※※※テストコード
 */
// ブラウザの幅を取得して表示
// 「消去→取得した値を挿入」を繰り返す
//jQuery('.ws').empty().append($w);



/*============================================================================================

ウィンドウサイズを判定
ver 0.2
 ※※※開発中 xs sm md lg それぞれの範囲サイズを判定する関数を作成する※※※

============================================================================================*/

//ウィンドウサイズ ～480
function wXS(){
	if($w <= screen_xs){
		return true;
	}
}

//ウィンドウサイズ 481～768
function wSM(){
	if($w > screen_xs && $w <= screen_sm){
		return true;
	}
}

//ウィンドウサイズ 769～992
function wMD(){
	if($w > screen_sm && $w <= screen_md){
		return true;
	}
}

//ウィンドウサイズ 993～
function wLG(){
	if($w > screen_md && $w < screen_lg){
		return true;
	}
}

/*
 * ※※※※※※テストコード
 */
/*if(wXS()){
	jQuery('body').css('color','red');
} else if(wSM()){
	jQuery('body').css('color','green');
} else if(wMD()){
	jQuery('body').css('color','blue');
} else if(wLG()){
	jQuery('body').css('color','pink');
} else {
  return;
}*/

if(wMD()){
	jQuery('body').css('font-weight','bold');
} else {
	jQuery('body').css('font-weight','normal');
}





//--------------------------------------------------------------------------------------------------------------------
});
});