<?php
	mb_http_output('utf-8');
	mb_internal_encoding('utf-8');
	header('Content=Type: text/xml;charset=UTF-8');

	require_once 'variable.php';

	//URL組み立て
	$url = sprintf("%s%s%s%s%s", $uri_pref, "?keyid=", $acckey, "&format=", $format);

	//API実行
	echo file_get_contents($url);