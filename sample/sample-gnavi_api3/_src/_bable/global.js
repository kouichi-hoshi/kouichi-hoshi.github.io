/**
 * namespace
 */

var gVar = gVar || {};
gVar.bp_xs    = 480;
gVar.bp_sm    = 768;
gVar.bp_md    = 992;
gVar.bp_lg    = 1200;

//ユーザーエージェントを取得してデバイスを判定 https://w3g.jp/blog/js_browser_sniffing2015
var _ua = (function(u){
	return {
		Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
		Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
	};
})(window.navigator.userAgent.toLowerCase());



/**
 * functions
 */

class getValue{
	constructor(elm){
		this.elm = elm;
	}

	_getWindowWidth(){
		let winIW = window.innerWidth;
		return winIW;
	};

	_getThisTop(){
		let top = jQuery(this.elm).offset().top;
		return top;
	}

	_getWindowScroll(){
		let winTop = jQuery(window).scrollTop();
		return winTop;
	}

	_getWindowHeight(){
		let windowH = jQuery(window).height();
		return windowH;
	}

}

/**
 * serializeObject関数
 * serializeArray拡張し、フォーム内のnameの値を配列として返す。
 */
(function(jQuery){
	jQuery.fn.serializeObject = function(){

		var object = {};
		var array = this.serializeArray();
		
		$.each(array, function() {
			if (object[this.name] !== undefined) {
				if (!object[this.name].push) {
					object[this.name] = [object[this.name]];
				}
				object[this.name].push(this.value || '');
			} else {
				object[this.name] = this.value || '';
			}
		});
	
	return object;

	}
})(jQuery);


/**
 * ウィンドウサイズに応じて処理を切り分けたいときに、判定するための値を返す。
 * loadやresizeイベントの中で使う。
 */
// function getWindowWidth(){
// 	var winIW = window.innerWidth;
// 	return winIW;
// };



/**
 * タブレットとPCでクリックイベントとホバーイベントを切り替える
 * 開発中
 */

// 実行例
// var CM = new changeMenu();
// if (_ua.Tablet) {
// 	CM._menuClick();
// } else {
// 	CM._menuHover();
// }

class changeMenu{

	constructor(){

	}

	_menuHover(){
		jQuery('.menu-item').on('mouseenter', function(){

			let $target = jQuery('.sub-menu',this);
			jQuery($target).addClass('is-on');

		}).on('mouseleave', function(){

			let $target = jQuery('.sub-menu',this);
			jQuery($target).removeClass('is-on');

		});
	}

	_menuClick(){

		//親のa要素を停止
		jQuery('.menu-item-has-children > a').on('click',function(){
			return false;
		});

		//停止したa要素を複製
		jQuery('.header-nav .menu-item-has-children > a').each(function(){

			let $target = jQuery(this).next('.sub-menu'); //　子メニューのラッパーを選択
			let $itme = jQuery(this).clone(); //　親メニューのオブジェクトを複製
			let $href = $itme.attr('href'); // オブジェクトからurlを取得
			let $text = $itme.text(); // オブジェクトからメニューの文字列を取得

			//複製した親メニューを子メニューに挿入
			$target.prepend('<li><a href="' + $href + '">' + $text + '</a></li>');

		});

		//クリックイベントでメニュー開閉
		jQuery('.menu-item a').on('click', function(){

			let $target_this = jQuery(this);
			let $target_subMenu = jQuery(this).next();

			if ($target_subMenu.css('display') === 'none') {
				jQuery('.sub-menu').removeClass('is-on');
				$target_subMenu.addClass('is-on');
			} else {
				$target_subMenu.removeClass('is-on');
			}

		});

	}

}




/**
 * animate
 * 可視領域に要素が出現した時にanimate.cssのclassを付与し、スクロールに対するインタラクションを実現する。
 * animate.cssのトリガーとなるclassと、要素の出現タイミングを設定する値を引数にして関数に渡す。
 * 動作させたい要素は、ani-{トリガーclass}の組み合わせのclassを作成し、付与する。
 */

//引数$ani → animate.cssのclass
//引数$valPos → 要素が出現するタイミングの設定 数字が小さいほうが遅いタイミングで実行される

function animate($ani,$valPos){

	// if($ani === 'fadeInLeft' || 'fadeIn'){
	// 	$('.ani-'+ $ani + ':gt(1)').css("opacity","0");
	// }

	jQuery('.ani-'+ $ani).each(function(){

		var imgPos       = jQuery(this).offset().top;
		var scroll       = jQuery(window).scrollTop();
		var windowHeight = jQuery(window).height();

		if (scroll > imgPos - windowHeight + windowHeight/$valPos){
			jQuery(this).addClass("animated "+ $ani);
		} else {
			jQuery(this).removeClass("animated "+ $ani);
		}

	});

}

//animate関数呼び出し
function animateScroll(){

	//timerID;
	var timer = false;

	if (timer !== false) {
		clearTimeout(timer);
	}

	timer = setTimeout(function() {
		animate('fadeIn','7');
		animate('fadeInLeft','7');
//		animate('bounce','3');
//		animate('pulse','5');
//		animate('swing','5');
//		animate('bounceIn','5');
	}, 100);

}

/**
 * スクロールに応じてフェードイン
 */
function fadeIn($val){
	if (jQuery(window).scrollTop() > 300){
		 jQuery($val).fadeIn();
	} else {
		 jQuery($val).fadeOut();
	}
}



/*
* スクロール禁止/禁止解除
*/

//スクロール禁止用関数
function no_scroll(){
	//PC用
	var scroll_event = 'onwheel' in window ? 'wheel' : 'onmousewheel' in window ? 'mousewheel' : 'DOMMouseScroll';
	jQuery(window).on(scroll_event,function(e){e.preventDefault();});
	//SP用
	jQuery(window).on('touchmove.noScroll', function(e) {e.preventDefault();});
}

//スクロール禁止解除用関数
function return_scroll(){
	//PC用
	var scroll_event = 'onwheel' in window ? 'wheel' : 'onmousewheel' in window ? 'mousewheel' : 'DOMMouseScroll';
	jQuery(window).off(scroll_event);
	//SP用
	jQuery(window).off('.noScroll');
}



/**
 * ページ内スクロールをスムーズに実行
  *アンカー要素を指定
 */
function smoothScroll($val){

	// #で始まるアンカーをクリックした場合に処理
	jQuery($val).click(function() {

	  // スクロールの速度
	  var speed = 800;// ミリ秒
	  // アンカーの値取得
	  var href= $(this).attr("href");
	  // 移動先を取得
	  var target = $(href == "#" || href == "" ? 'html' : href);
	  // 移動先を数値で取得
	  var position = target.offset().top;

	  // スクロール実行
	  jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
	  return false;

   });

}


/**
 * sd_slideshow
 */
class sd_slideshow{

	constructor(millisecond){
		this.fadeInterval = millisecond;
	}

	heightSet(){

		// 画像の高さを取得してコンテナに設定
		var $H = jQuery('.sd_slideshow img:first-child').height();
		jQuery('.sd_slideshow').css('height',$H);

	}

	slideshow(){

		var fadeInterval = this.fadeInterval; // mm秒 7500など

		//フェード処理
		jQuery('.sd_slideshow').each(function () {

			var $slides      = jQuery(this).find('img');
			var slideCount   = $slides.length;
			var currentIndex = 0;

			//1番目のスライドをフェードインで表示
			$slides.eq(currentIndex).fadeIn();

			// 設定秒ごとshowNextSlide関数を実行
			setInterval(showNextSlide, fadeInterval);

			//次のスライドを表示する関数
			function showNextSlide(){
				//次に表示するスライドのインデックス
				//(もし最後のスライドなら最初に戻る)
				var nextIndex = (currentIndex + 1) % slideCount;

				//現在のスライドをフェードアウト
				$slides.eq(currentIndex).fadeOut();

				//次のスライドをフェードイン
				$slides.eq(nextIndex).fadeIn();

				//現在のスライドのインデックスを更新
				currentIndex = nextIndex;
			}

		});

	}
}




/**
 * ローディング
 */
class loading{

	constructor(setLoading) {

		this.loading = setLoading;

		//loadingイメージ生成
		this.loadingImage = '<div class="loading-image sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>';

	}

	_getloading(){
		return this.loading;
	}

	//ローディングイメージを挿入
	_insertLoading(){
		jQuery(this.loadingImage).prependTo(this.loading);
	}

	//ローディングイメージを削除
	_removeLoading(){
		//jQuery(this.loading + ' .sd-loading').addClass('sd-fade-out--1s');
		jQuery('.loading-image').addClass('is-fade-out--long');
		setTimeout(function(){
			jQuery('.loading-image').remove();
		},500);
	}

}



/**
 * ajaxGetPost
 * WordPressの投稿をajaxで表示させる
 * paramsはJSONのurlのパラメーターを渡す
 * 例→ '/posts/?filter[posts_per_page]=16&filter[category_name]=news'
 */
class ajaxGetPost extends loading{

	constructor(params,setTarget,setLoading){
		super(setLoading);
		this.params = params;
		this.target = setTarget;
	}

	_getTarget(){
		return this.target;
	}

	//投稿出力
	_getPost(){

		let params = gVar.APIurl + this.params;
		let target = this._getTarget();

		//ローディングイメージ挿入
		super._insertLoading();

		//JSON形式の投稿データを取得
		jQuery.ajax({
			type: "GET",
			url: params,
			dataType: "json"
		})
		.then(
			//取得したデータを処理
			function(data){
			let dfd = jQuery.Deferred();
			setTimeout(function(){
				createPost(data);
				dfd.resolve();
			},2000);
			return dfd.promise();
		},
			function(){
				alert("データをロードできませんでした。");
			}
		).then(
			slideDown //投稿をスライドダウンで表示
		).then(
			super._removeLoading //ローディングイメージを削除
		)

		//ロードした投稿データからhtmlを生成
		function createPost(data){
			for(var i in data){

				var d = data[i].date;
				d = new Date(d);
				var dateY = d.getFullYear();
				var dateM = d.getMonth() + 1;
				var dateD = d.getDate();

				jQuery(target).append('<dt>' + dateY + '年' + dateM + '月' + dateD + '日' + '</dt><dd><a href="' + data[i].guid.rendered + '">' + data[i].title.rendered + '</a></dd>');

			}
		}

		//投稿データをスライドダウンで表示
		function slideDown(){
			jQuery(target).slideDown();
		}

	}

}




/**
 * フルスクリーンナビゲーション
 */
class fullScreenNavigation{

	constructor(navBtn,nav,navBody) {
		this.navBtn  = navBtn;
		this.nav     = nav;
		this.navBody = navBody;
	}

	_trigger(){
		if(jQuery(this.nav).hasClass('is-fade-in')){
			this._openNavgation();
		} else {
			this._closeNavgation();
		}
	}

	//ナビゲーションをフェードイン/、ウィンドウのスクロール停止。
	_openNavgation(){
		let navBody = jQuery(this.navBody);
		return_scroll();
		jQuery(this.nav).addClass('is-fade-out').removeClass('is-fade-in');
		jQuery(this.navBtn).text('menu');
		setTimeout(function(){
			navBody.removeClass('is-nav-on');
		},700);
	}

	//ナビゲーションをフェードアウト、ウィンドウのスクロール再開。
	_closeNavgation(){
//		setTimeout(function(){
			no_scroll();
			jQuery(this.nav).addClass('is-fade-in').removeClass('is-fade-out');
			jQuery(this.navBody).addClass('is-nav-on');
			jQuery(this.navBtn).text('close');
//		},100);
	}

	//ウィンドウをリサイズすると、ナビゲーションとスクロールを初期設定に戻す。
	_navgationInitialize(){
		return_scroll();
		jQuery(this.navBtn).text('menu');
		jQuery(this.nav).removeClass('is-fade-in is-fade-out');
		jQuery(this.navBody).removeClass('is-nav-on');
	}

}



/**
 * slick
 */
class slickRun{

	constructor(target){
		this.target = target;
	};

	_slick(){

		jQuery(this.target).slick({

			//初期設定
			speed: 400,
			infinite: true,
			// variableWidth: true, //trueでスライド画像を可変を止める

			//レイアウトの設定
			// centerMode: false, //スライドをセンターに設定

			//オートプレイ実行時の設定
			autoplay: true, //自動でスライドさせる
			autoplaySpeed: 8000,
			// slidesToShow: 3,
			// slidesToScroll: 1, // 一枚ずつスライドさせる

			//コントローラーの設定
			arrows: true,
			dots: true, //スライド下部のドットの表示設定
			// appendArrows: jQuery('#arrow') //スライド作動ボタンを任意の要素の中に出力
			// prevArrow: '<button type="button" class="sd-btn slick-prev arrow-l"></button>',
			// nextArrow: '<button type="button" class="sd-btn slick-next arrow-r"></button>',

			//その他
			// fade: true,
			// adaptiveHeight: true,

		});

	}

}