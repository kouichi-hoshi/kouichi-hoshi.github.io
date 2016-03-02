<?php
	mb_http_output('utf-8');
	mb_internal_encoding('utf-8');
	header('Content=Type: text/xml;charset=UTF-8');


	//エンドポイントのURIとフォーマットパラメータを変数に入れる
	$uri = "http://api.gnavi.co.jp/RestSearchAPI/20150630/";
	//APIアクセスキーを変数に入れる
	$acckey = "a6154b84e515ec01816a2abfe80fc329";
	//返却値のフォーマットを変数に入れる
	$format = "json";

	// API 店舗データ取得用パラメータ設定
	$freeword = 'コーヒー,カフェ,珈琲,喫茶,喫茶店'; //キーワード設定

	$pref = $_POST['pref'];
//	$pref = 'PREF13';

	//URL組み立て
	$url = sprintf("%s%s%s%s%s%s%s%s%s", $uri, "?keyid=", $acckey, "&format=", $format, "&freeword=", $freeword, "&pref=", $pref);

	//API実行
	file_get_contents($url);