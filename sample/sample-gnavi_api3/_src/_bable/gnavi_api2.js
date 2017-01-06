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






	
class getAPIdata{

	constructor(params, paramsOpts){
		this.params     = params;
		this.paramsOpts = paramsOpts;
	}

	//パラメーターをマージ
	_getParameter(){
		return jQuery.extend({ }, this.params, this.paramsOpts);
	}

	// 取得件数を表示
	_getResultNum(data){
		let c = data.total_hit_count;
		if ( c > 0 ) {
			let resultNum = c + '件のお店が見つかりました。';
			console.log(resultNum);
			return resultNum;
		} else {
			return 'お店が見つかりませんでした。';
		}
	}

	_showResultNum(data, view){
		let show = this._getResultNum(data);
		jQuery(view).html(show);
	}

	//店舗データ取得
	_getData(data){

		for ( var i in data.rest ){

			var elm = {
				name: data.rest[i].name,
				shop_image1: data.rest[i].image_url.shop_image1,
				url: data.rest[i].url,
				address:data.rest[i].address
			}

			var img_url = elm.shop_image1.toString();

			if(img_url === '[object Object]'){
				jQuery('.result').append('<li class="grid-item"><a href="' + elm.url + '">' + elm.name + '<br />' + elm.address + '</a></li>');
			} else {
				var img_li = '<img class="fluid_img" src="' + elm.shop_image1 + '" />' + '<br />';
				jQuery('.result').append('<li class="grid-item"><a href="' + elm.url + '">' + img_li + elm.name + '<br />' + elm.address + '</a></li>');
			}

			//取得データカウント更新
			gVar.valueUpdate.DataCountUp++;
			console.log('取得データ数: ' + gVar.valueUpdate.DataCountUp);

			//全データ取得時メッセージ
			if( gVar.valueUpdate.getDataCount >= data.total_hit_count ){
				jQuery('.btn--more-load').after('<p class="vew-end">全データを表示しました。</p>').addClass('none')/*.remove()*/;
				gVar.valueUpdate.getDataCount = 0;
			}

		}

		//
		gVar.valueUpdate.offset_page++;
		console.log('ページ数更新値： ' + gVar.valueUpdate.offset_page);

	};




	// API 地域名初期表示
	_farstPrefTitle(data){
		var pref_title = data.pref[gVar.valueUpdate.pref_num].pref_name;
		jQuery('.pref_title').html(pref_title);
	};

	//現在の地域名を更新
	_changePrefTitle(data){
		jQuery('.pref_title').html(val);		
	};

	//API 都道府県データをselect要素として生成する
	_dataPref(data){
		for ( var i in data.pref ){
			var name = data.pref[i].pref_name;
			var code = data.pref[i].pref_code;
			jQuery("[name = pref_name]").append( '<option value="' + code + '">' + name + '</option>' );
		}
	};





}




jQuery(function() {
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------



/**
 *　API 初期設定
 */

// API エンドポイントURL
gVar.endPoints = {
	rest : 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?', //レストラン検索API
	pref : 'http://api.gnavi.co.jp/master/PrefSearchAPI/20150630/?callback=?', //エリアマスタ取得API			
};

//API 基本パラメータ
gVar.params = {
	keyid: 'a6154b84e515ec01816a2abfe80fc329',
	format: 'json'
};

// API 更新データ
gVar.valueUpdate = {
	offset_page: 1, //ページ数初期化
	DataCountUp: 0, //取得したデータ数
	pref_num: 12 //都道府県名初期設定(12 = 東京)
}

//API オプションパラメータ
gVar.paramsOpts　= {
	
	base: {
		freeword: 'コーヒー,カフェ,珈琲,喫茶,喫茶店', //キーワード設定
		hit_per_page: 10, //表示件数
		pref: 'PREF' + (gVar.valueUpdate.pref_num + 1) //都道府県名初期設定(東京)
	}

}


console.log(gVar.valueUpdate.pref_num);


/**
 *　
 */
let rest = new getAPIdata(gVar.params, gVar.paramsOpts.base);
let restParameter = rest._getParameter();

let pref = new getAPIdata(gVar.params);


//ページがロードされたら
jQuery(window).one('load', function(){

	console.log('ページ数更新値： ' + gVar.valueUpdate.offset_page);

	/**
	 * 店舗データを取得し表示する
	 */
	jQuery.getJSON(gVar.endPoints.rest, restParameter, function(data){

		// 店舗件数を表示
		rest._showResultNum(data, '.total');

		// 店舗データ表示
		rest._getData(data);

	})

	//都道府県データを取得し表示/セットする
	jQuery.getJSON(gVar.endPoints.pref, gVar.params, function(data){
		console.log(data);
		pref._farstPrefTitle(data);
		pref._dataPref(data);
	})

});



//指定要素がクリックされたら次のデータを取得し表示する
jQuery('.btn--more-load').on('click', function(){

	// データを取得
	jQuery.getJSON(gVar.endPoints.rest, restParameter, function(data){

		// 店舗データ表示
		rest._getData(data);

		// ページ数更新
		gVar.valueUpdate.offset_page++


	})

});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
});