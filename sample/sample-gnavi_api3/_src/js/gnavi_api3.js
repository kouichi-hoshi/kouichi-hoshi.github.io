"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * namespace
 */

var gVar = gVar || {};
gVar.bp_xs = 480;
gVar.bp_sm = 768;
gVar.bp_md = 992;
gVar.bp_lg = 1200;

//ユーザーエージェントを取得してデバイスを判定 https://w3g.jp/blog/js_browser_sniffing2015
var _ua = function (u) {
	return {
		Tablet: u.indexOf("windows") != -1 && u.indexOf("touch") != -1 || u.indexOf("ipad") != -1 || u.indexOf("android") != -1 && u.indexOf("mobile") == -1 || u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1 || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
		Mobile: u.indexOf("windows") != -1 && u.indexOf("phone") != -1 || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || u.indexOf("android") != -1 && u.indexOf("mobile") != -1 || u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1 || u.indexOf("blackberry") != -1
	};
}(window.navigator.userAgent.toLowerCase());

/**
 *　API 初期設定
 */

// 初期値
var hit_per_page_num = 10; //一度に表示する件数
var offset_page_num = 1; //初期ページ
var pref_name_ini = 12; //都道府県初期設定 (PREF13=東京都)
var pref_name = 'PREF' + (pref_name_ini + 1); //都道府県名キー作成
var freeword = 'コーヒー,カフェ,珈琲,喫茶,喫茶店';
var getDataCount = 0; //店舗データ数判定
var container = '.result'; //wrapper要素指定
var category_l = '';

// エンドポイント
gVar.endPoints = {
	rest: 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?', //レストラン検索API
	pref: 'http://api.gnavi.co.jp/master/PrefSearchAPI/20150630/?callback=?', //エリアマスタ取得API
	css: 'http://api.gnavi.co.jp/master/CategorySmallSearchAPI/20150630/?callback=?', //小業態マスタ取得API				
	cls: 'http://api.gnavi.co.jp/master/CategoryLargeSearchAPI/20150630/?callback=?' //大業態マスタ取得API

};

// 基本パラメータ
gVar.params = {
	keyid: 'a6154b84e515ec01816a2abfe80fc329',
	format: 'json'
};

// カスタムパラメータ レストラン検索用
gVar.optsRest = {
	pref: pref_name,
	//	freeword: freeword, //キーワード設定
	hit_per_page: hit_per_page_num, //表示件数
	offset_page: offset_page_num, //ページ数初期化
	category_l: category_l
};

gVar.rest = Object.assign({}, gVar.params, gVar.optsRest);

var getAPIdata = function () {
	function getAPIdata() {
		_classCallCheck(this, getAPIdata);
	}

	_createClass(getAPIdata, [{
		key: "_showResultNum",


		// constructor(getDataCount){
		// 	this.getDataCount = getDataCount;
		// 	this.paramsOpts = paramsOpts;
		// }

		value: function _showResultNum(data, view) {
			var count = data.total_hit_count;
			if (count > 0) {
				jQuery(view).html(count + '件のお店が見つかりました。');
			} else {
				jQuery(view).html('お店が見つかりませんでした。');
			}
		}

		//店舗データ取得

	}, {
		key: "_getData",
		value: function _getData(data) {

			for (var i in data.rest) {

				var elm = {
					name: data.rest[i].name,
					shop_image1: data.rest[i].image_url.shop_image1,
					url: data.rest[i].url,
					address: data.rest[i].address
				};

				if (Object.keys(elm.shop_image1).length === 0) {
					jQuery('.result').append('<li class="grid-item"><a href="' + elm.url + '">' + elm.name + '<br />' + elm.address + '</a></li>');
				} else {
					var img_li = '<img class="fluid_img" src="' + elm.shop_image1 + '" />' + '<br />';
					jQuery('.result').append('<li class="grid-item"><a href="' + elm.url + '">' + img_li + elm.name + '<br />' + elm.address + '</a></li>');
				}

				//取得データカウント更新
				getDataCount++;
				console.log('取得データ数: ' + getDataCount);

				//全データ取得時メッセージ
				if (getDataCount >= data.total_hit_count) {
					jQuery('.btn--more-load').after('<p class="vew-end">全データを表示しました。</p>').addClass('none');
				}
			}

			//ページ数をアップデート
			gVar.rest.offset_page++;
			console.log('ページ数更新値： ' + gVar.rest.offset_page);
		}

		// API 地域名初期表示

	}, {
		key: "_farstPrefTitle",
		value: function _farstPrefTitle(data) {
			var pref_title = data.pref[pref_name_ini].pref_name;
			jQuery('.pref_title').html(pref_title);
		}

		//現在の地域名を更新

	}, {
		key: "_changePrefTitle",
		value: function _changePrefTitle(val) {
			jQuery('.pref_title').html(val);
		}

		//API 都道府県データをselect要素として生成する

	}, {
		key: "_createPrefSelector",
		value: function _createPrefSelector(data) {
			for (var i in data.pref) {
				var name = data.pref[i].pref_name;
				var code = data.pref[i].pref_code;
				jQuery("[name = pref_name]").append('<option value="' + code + '">' + name + '</option>');
			}
		}
	}, {
		key: "_createClsRadioBtn",
		value: function _createClsRadioBtn(data) {
			console.log(data.category_l[0].category_l_code);
			for (var i in data.category_l) {
				var code = data.category_l[i].category_l_code;
				var name = data.category_l[i].category_l_name;
				jQuery('.block-cls').append('<label><input type="radio" name="cls" value="' + code + '">' + name + '</label>');
			}
		}
	}]);

	return getAPIdata;
}();

jQuery(function () {
	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


	var rest = new getAPIdata();

	//ページがロードされたら
	jQuery(window).one('load', function () {

		console.log('ページ数更新値： ' + gVar.rest.offset_page);

		//レストラン検索
		jQuery.getJSON(gVar.endPoints.rest, gVar.rest, function (data) {
			console.log(data);

			rest._showResultNum(data, '.total'); //店舗件数を表示

			rest._getData(data); //店舗データ表示
		});

		//都道府県マスタ
		jQuery.getJSON(gVar.endPoints.pref, gVar.params, function (data) {
			console.log(data);
			rest._farstPrefTitle(data); //地域名を表示
			rest._createPrefSelector(data); //地域選択select要素を作成
		});

		//小業態マスタ
		jQuery.getJSON(gVar.endPoints.css, gVar.params, function (data) {
			console.log(data);
		});

		//大業態マスタ
		jQuery.getJSON(gVar.endPoints.cls, gVar.params, function (data) {
			//console.log(data);
			rest._createClsRadioBtn(data);
		});
	});

	//指定要素がクリックされたら次のデータを取得し表示する
	jQuery('.btn--more-load').on('click', function () {

		//レストラン検索
		jQuery.getJSON(gVar.endPoints.rest, gVar.rest, function (data) {

			//店舗データ表示
			rest._getData(data);
		});
	});

	//指定要素がクリックされたら都道府県を変更して店舗データを再取得し表示する
	jQuery('[name = pref_btn]').on('click', function () {

		console.log(gVar.rest);

		//初期化処理
		jQuery('.vew-end').remove(); //「全データ取得済み」表示を削除
		getDataCount = 0; //店舗データ数判定を初期化
		jQuery(container).empty(); //商品データ一覧を初期化
		gVar.rest.offset_page = 1; //ページ数を初期化


		// form要素から取得した値をオブジェクトで取得
		var out = $('.pref_search').serializeObject();

		//取得した値をエンドポイントのパラメータにセット

		gVar.rest.pref = out.pref_name; //都道府県コード
		gVar.rest.category_l = out.cls; //大業態コード


		//<select name="pref_name">で選択されている要素(都道府県名)を取得
		var selectPref_name = jQuery('[name = pref_name] option:selected').text();

		//現在の地域名表示をアップデート
		rest._changePrefTitle(selectPref_name);

		//APIデータを取得
		jQuery.getJSON(gVar.endPoints.rest, gVar.rest, function (data) {

			// 店舗件数を表示
			rest._showResultNum(data, '.total');

			// 店舗データ表示
			rest._getData(data);
		});

		//データ取得ボタンを再表示
		jQuery('.btn--more-load').removeClass('none');
	});

	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
});
//# sourceMappingURL=gnavi_api3.js.map
