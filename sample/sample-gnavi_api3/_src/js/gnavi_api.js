'use strict';

jQuery(function () {
	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


	(function () {

		/**************************************************************************************
   * 変数定義
   **************************************************************************************/

		// masonry 初期設定
		var $container = jQuery('.grid'); //wrapper要素指定
		var $inner = '.grid-item'; //inner要素指定

		// API
		var api_key = 'a6154b84e515ec01816a2abfe80fc329'; //アクセスキー
		var hit_per_page_num = 10; //一度に表示する件数
		var offset_page_num = 1; //初期ページ
		var pref_name_ini = 13; //都道府県初期設定 (PREF13=東京都)
		var pref_name_key = 'PREF' + pref_name_ini; //都道府県名キー作成

		// API URL
		var url_rest = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?'; //レストラン検索API
		var url_pref = 'http://api.gnavi.co.jp/master/PrefSearchAPI/20150630/?callback=?'; //エリアマスタ取得API

		//API 基本パラメータ
		var params = {
			keyid: api_key,
			format: 'json'
		};

		// API 店舗データ取得用パラメータ設定
		var params_shop = jQuery.extend({}, params);
		params_shop.pref = pref_name_key; //都道府県設定
		params_shop.freeword = 'コーヒー,カフェ,珈琲,喫茶,喫茶店'; //キーワード設定
		params_shop.hit_per_page = hit_per_page_num;
		params_shop.offset_page = offset_page_num; //ページ数

		//店舗データ数判定
		var resultLooplength = 0;

		/**************************************************************************************
   * masonry　データ配置処理
   **************************************************************************************/

		var preLoad = function preLoad() {
			$container.imagesLoaded(function () {
				$container.masonry({
					itemSelector: $inner, //タイトル状に配置する要素のclassの指定
					isFitWidth: true, //親要素の幅に合わせてタイル状のコンテンツ数を自動調整
					isAnimated: false //伸縮時のアニメーションの設定
				});
			});
		};

		/**************************************************************************************
   * API 店舗データ 出力
   **************************************************************************************/

		//API 店舗データ出力
		var resultLoop = function resultLoop(result) {

			for (var i in result.rest) {

				var elm = {
					name: result.rest[i].name,
					shop_image1: result.rest[i].image_url.shop_image1,
					url: result.rest[i].url,
					address: result.rest[i].address
				};

				var img_url = elm.shop_image1.toString();

				if (img_url === '[object Object]') {
					preLoad();
					jQuery('.result').append('<li class="grid-item"><a href="' + elm.url + '">' + elm.name + '<br />' + elm.address + '</a></li>');
				} else {
					var img_li = '<img class="fluid_img" src="' + elm.shop_image1 + '" />' + '<br />';
					preLoad();
					jQuery('.result').append('<li class="grid-item"><a href="' + elm.url + '">' + img_li + elm.name + '<br />' + elm.address + '</a></li>');
				}

				resultLooplength++;

				if (resultLooplength >= result.total_hit_count) {
					jQuery('.btn--more-load').after('<p class="vew-end">全データを表示しました。</p>').addClass('none') /*.remove()*/;
					resultLooplength = 0;
				}
			}

			params_shop.offset_page++;
		};

		//API　取得件数を表示
		var resultNum = function resultNum(result) {
			if (result.total_hit_count > 0) {
				jQuery('.total').html(result.total_hit_count + '件のお店が見つかりました。\n');
			} else {
				jQuery('.total').html('お店が見つかりませんでした。');
			}
		};

		/**************************************************************************************
   * API 都道府県データ 出力
   **************************************************************************************/

		// API 地域名初期表示
		var farstPrefTitle = function farstPrefTitle(result) {
			var pref_title = result.pref[pref_name_ini - 1].pref_name;
			jQuery('.pref_title').html(pref_title);
		};

		//現在の地域名を更新
		var changePrefTitle = function changePrefTitle(val, result) {
			jQuery('.pref_title').html(val);
		};

		//API 都道府県データをselect要素として生成する
		var resultPref = function resultPref(result) {
			for (var i in result.pref) {
				var name = result.pref[i].pref_name;
				var code = result.pref[i].pref_code;
				jQuery("[name = pref_name]").append('<option value="' + code + '">' + name + '</option>');
			}
		};

		/**************************************************************************************
   * APIデータ取得/イベント実行
   **************************************************************************************/

		//ページがロードされたら
		jQuery(window).one('load', function () {

			_showData();
			//店舗データを取得し表示する
			jQuery.getJSON(url_rest, params_shop, function (result) {

				//店舗件数を表示
				resultNum(result);

				//店舗データ表示
				resultLoop(result);

				//ページ数を更新
				offset_page_num++;
			});

			//都道府県データを取得し表示/セットする
			jQuery.getJSON(url_pref, params, function (result) {
				farstPrefTitle(result);
				resultPref(result);
			});
		});

		//指定要素がクリックされたら次のデータを取得し表示する
		jQuery('.btn--more-load').on('click', function () {

			//APIデータを取得
			jQuery.getJSON(url_rest, params_shop, function (result) {

				//店舗データ表示
				resultLoop(result);

				//masonryを再配置
				$container.masonry('reloadItems');
			});
		});

		//指定要素がクリックされたら都道府県を変更して店舗データを再取得し表示する
		jQuery('[name = pref_btn]').on('click', function () {

			//店舗データ数判定を初期化する
			resultLooplength = 0;

			//「全データ取得済み」表示を削除する
			jQuery('.vew-end').remove();

			//データ取得ボタンを再表示する
			jQuery('.btn--more-load').removeClass('none');

			//<select name="pref_name">で選択されているoption要素のvalue(都道府県パラメータ)を取得 
			var pref_val = jQuery('[name = pref_name]').val();

			//<select name="pref_name">で選択されている要素(都道府県名)を取得
			var selectPref_name = jQuery('[name = pref_name] option:selected').text();

			//商品データ一覧を初期化
			$container.empty();

			//ページ数を初期化
			params_shop.offset_page = 1;

			//都道府県パラメータを都道府県データ取得API用オブジェクトにセット
			params_shop.pref = pref_val;

			//現在の地域名を更新
			changePrefTitle(selectPref_name);

			//APIデータを取得
			jQuery.getJSON(url_rest, params_shop, function (result) {

				//店舗件数を表示
				resultNum(result);

				//店舗データ表示
				resultLoop(result);

				//masonryを再配置
				$container.masonry('reloadItems');
			});
		});
	}).call(this);

	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
});
//# sourceMappingURL=gnavi_api.js.map
