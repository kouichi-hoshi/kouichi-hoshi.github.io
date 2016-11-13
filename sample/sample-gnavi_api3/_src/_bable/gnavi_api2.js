
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
var paramsShopData = jQuery.extend({ }, params);
paramsShopData.pref = pref_name_key; //都道府県設定
paramsShopData.freeword = 'コーヒー,カフェ,珈琲,喫茶,喫茶店'; //キーワード設定
paramsShopData.hit_per_page = hit_per_page_num;
paramsShopData.offset_page = offset_page_num; //ページ数





jQuery(function() {
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------



	//API　取得件数を表示
	var getTotalHitCount = function(data){
		 return data.total_hit_count;
	};

	//店舗データを取得し表示する
	var shopData = jQuery.getJSON(url_rest, paramsShopData, function(data){

		var gnavData = {};
		gnavData.totalHitCount = getTotalHitCount(data);
		console.log(gnavData.totalHitCount);

	});

/*

関数リテラル(変数shopData)で実行しているgetJsonメソッドの第三引数で実行させる関数は、
APIから各種データを取得するクラスメソッドと、そのデータを加工する
クラスメソッドを実行させるclass構文に書き換える。
gnavDataとparamsとpramsShopDataはクラス変数(コンストラクタ)にまとめて、
インスタンス生成時にAPIエンドポイントのパラメーターを渡す仕様にする。

*/




//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
});