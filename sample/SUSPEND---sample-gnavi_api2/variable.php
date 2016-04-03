<?php

	//エンドポイントのURIとフォーマットパラメータを変数に入れる
	$uri_rest = "http://api.gnavi.co.jp/RestSearchAPI/20150630/"; //レストラン検索API
	$uri_pref = 'http://api.gnavi.co.jp/master/PrefSearchAPI/20150630/'; //エリアマスタ取得API

	//APIアクセスキーを変数に入れる
	$acckey = "a6154b84e515ec01816a2abfe80fc329";

	//返却値のフォーマットを変数に入れる
	$format = "json";

	// API 店舗データ取得用パラメータ設定
	$freeword = 'コーヒー,カフェ,珈琲,喫茶,喫茶店'; //キーワード設定