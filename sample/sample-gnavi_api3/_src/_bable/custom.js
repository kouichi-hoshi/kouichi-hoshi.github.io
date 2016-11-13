//riotテスト用
function rem(){
	jQuery('body').removeAttr('style');
}

jQuery(function() {


if(jQuery('body').hasClass('develop_front-page')){
	var ajaxPost = new ajaxGetPost('/posts/?filter[posts_per_page]=6','.post','.frame__sub-inner');
	ajaxPost._getPost();
}




/**
 * フルスクリーンナビゲーション 実行
 */
{

	let navBtn  = '#nav_btn';
	let nav     = '.footer-nav';
	let navBody = '.footer-nav__body,.menu > ul';
	let fsn     = new fullScreenNavigation(navBtn,nav,navBody);
	let flag    = true;

	//ナビゲーションの開閉をクリックイベントにバインド
	jQuery(navBtn).on('click',function(){
		if(flag){
			flag = false;
			fsn._trigger();
			setTimeout(function(){
				flag = true;
			},500);
		}else{
			return;
		}
	});

	//ウィンドウをリサイズすると、ナビゲーションとスクロールを初期設定に戻す
	jQuery(window).on('resize',function(){
		fsn._navgationInitialize();
	});

}



/**
 * topページでスライド実行
 */
{

	let slid = new sd_slideshow(7500);

	jQuery(window).on('load',function(){

		if(jQuery('body').hasClass('home')){

			//スライドショウ実行
			slid.slideshow();

			//スライド高さセット実行
		 	slid.heightSet();

		}

	 });

	/**
	 * スライドショウ高さ再セット実行
	 */
	jQuery(window).on('resize',function(){


		if(jQuery('body').hasClass('home')){

			//timerID;
			var timer = false;

			if (timer !== false) {
				clearTimeout(timer);
			}

			timer = setTimeout(function() {
				slid.heightSet();
			}, 1000);

		}

	 });

};



/**
 * 可視領域に要素が出現した時にanimate.cssのclassを付与し、スクロールに対するインタラクションを実行させる。
 */

var getVal = new getValue('.ani-fadeIn');

jQuery(window).on('load', function(){
	animateScroll();
});

jQuery(window).on('touchstart scroll', function(){
	animateScroll();
	fadeIn('.go-to-top');
});




/**
 * ウィンドウ上部に戻る
 */
jQuery('.go-to-top').on('click',function(){
	jQuery('body, html').animate({ scrollTop: 0 }, 800, 'swing');
	return false;
});



/**
 * ページ内スムーズスクロール実行(a要素を指定する)
 */
smoothScroll('a[href^=#]');






//////////////////////////////////////////////////////////////////////////////////////////////


/*
 * test code
 * page-develop.phpで使用
 */


//WordPressの投稿を取得して表示
(function(){
	if (jQuery('body').hasClass('develop')) {
		// var agp     = new ajaxGetPost('/posts/?filter[posts_per_page]=3', '.ajax-post');
		// var getPost = agp._getPost();
	}
}());


//センターに配置した要素の幅が広がるエフェクト
setTimeout(function(){
	jQuery('.develop-02 .sample-01').addClass('on');
},2000);



// //class 構文テスト
// class testClass{

// 	constructor(val){
// 		this.val = val;
// 	}

// 	_testFunc(){
// 		console.log(this.val);
// 		jQuery(this.val).css('color','red');
// 	}

// }

//Deferred test
if (jQuery('body').hasClass('develop_deferred')) {



	var doSomething = function() {
	  var defer = $.Deferred();
	  setTimeout(function() {
	    defer.resolve(); // 解決
	  }, 2000);
	  return defer.promise(); // プロミスを作って返す
	};

	$(function() {
	  $('#button').on('click', function() {
	    var promise = doSomething();
	    promise.done(function() {
	      alert('成功しました');
	    });
	  });
	});


func1().then(func2).then(func3)

function func1(){
	var dfd = new $.Deferred();
	setTimeout(function(){
		console.log('func1');
		dfd.resolve();
	},3000);
	return dfd.promise();
}

function func2(){
	var dfd = new $.Deferred();
	setTimeout(function(){
		console.log('func2');
		dfd.resolve();
	},3000);
	return dfd.promise();
}

function func3(){
	var dfd = new $.Deferred();
	setTimeout(function(){
		console.log('func3');
		dfd.resolve();
	},3000);
	return dfd.promise();
}




exec1().then(exec2).then(exec3);

function exec1(){
    var def = new $.Deferred();

    //ajaxの処理と仮定
    setTimeout(function(){
        $('div#content').append('<p>exec1</p>');
        def.resolve();
    },3000);

    return def.promise();
}

function exec2(){
    var def = new $.Deferred();

    //ajaxの処理と仮定
    setTimeout(function(){
        $('div#content').append('<p>exec2</p>');
        def.resolve();
    },2000);

    return def.promise();
}

function exec3(){
    var def = new $.Deferred();

    //ajaxの処理と仮定
    setTimeout(function(){
        $('div#content').append('<p>exec3</p>');
        def.resolve();
    },1000);

    return def.promise();
}


}//Deferred test end







//test code end
//////////////////////////////////////////////////////////////////////////////////////////////



});//jQuery end