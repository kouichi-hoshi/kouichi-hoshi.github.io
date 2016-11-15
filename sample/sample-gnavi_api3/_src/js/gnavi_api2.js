'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getAPIdata = function () {
	function getAPIdata(hit_per_page_num, pref_name_key, url_type) {
		_classCallCheck(this, getAPIdata);

		this.api_key = 'a6154b84e515ec01816a2abfe80fc329'; //アクセスキー
		this.offset_page_num = 1; //初期ページ
		this.hit_per_page_num = hit_per_page_num; //一度に表示する件数
		this.pref_name_key = pref_name_key; //都道府県(PREF13=東京都)
		this.url_type = url_type;
	}

	_createClass(getAPIdata, [{
		key: '_getUrl',
		value: function _getUrl() {

			var endPoint = {
				rest: 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?', //レストラン検索API
				pref: 'http://api.gnavi.co.jp/master/PrefSearchAPI/20150630/?callback=?' };

			switch (this.url_type) {
				case 'pref':
					return endPoint.pref;
					break;
				default:
					return endPoint.rest;
					break;
			}
		}
	}, {
		key: '_getParameter',
		value: function _getParameter() {

			//API 基本パラメータ
			var params = {
				keyid: this.api_key,
				format: 'json'
			};

			// API 店舗データ取得用パラメータ設定
			var paramsShopData = jQuery.extend({}, params);
			paramsShopData.pref = this.pref_name_key; //都道府県設定
			paramsShopData.freeword = 'コーヒー,カフェ,珈琲,喫茶,喫茶店'; //キーワード設定
			paramsShopData.hit_per_page = this.hit_per_page_num;
			paramsShopData.offset_page = this.offset_page_num; //ページ数

			return paramsShopData;
		}
	}]);

	return getAPIdata;
}();

jQuery(function () {
	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

	var api = new getAPIdata(10, 'PREF13', 'rest');
	var apiUrl = api._getUrl();
	var apiParams = api._getParameter();
	console.log(apiUrl);
	console.log(apiParams);

	/*
 
 関数リテラル(変数shopData)で実行しているgetJsonメソッドの第三引数で実行させる関数は、
 APIから各種データを取得するクラスメソッドと、そのデータを加工する
 クラスメソッドを実行させるclass構文に書き換える。
 gnavDataとparamsとpramsShopDataはクラス変数(コンストラクタ)にまとめて、
 インスタンス生成時にAPIエンドポイントのパラメーターを渡す仕様にする。
 
 */

	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
});
//# sourceMappingURL=gnavi_api2.js.map
