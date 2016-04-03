<?php
	mb_http_output('utf-8');
	mb_internal_encoding('utf-8');
	header('Content=Type: text/xml;charset=UTF-8');

	require_once 'variable.php';

	if (isset($_GET["offset"])) {
		$offset = $_GET['offset'];
	} else {
		$offset = '1';
	}

	if (isset($_GET["pref"])) {
		$pref = $_GET['pref'];
	} else {
		$pref = 'PREF13';
	}

	//URL組み立て
	$url = sprintf("%s%s%s%s%s%s%s%s%s%s%s", $uri_rest, "?keyid=", $acckey, "&format=", $format, "&freeword=", $freeword, "&pref=", $pref, "&offset_page=", $offset);

	//API実行
	echo file_get_contents($url);