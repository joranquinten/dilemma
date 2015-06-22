<?php
session_start();

if (isset($_SESSION['user'])){
	$user = $_SESSION['user']['id'];
}else{
	$user = 'null';
};

date_default_timezone_set('Europe/Amsterdam');
header('Content-Type: application/json');

// Start timer
$time = microtime();
$time = explode(' ', $time);
$time = $time[1] + $time[0];
$start = $time;

$items = array();
$guid = isset($_GET['hash']) ? $_GET['hash'] : '';

// Connect
try {
    $dbh = new PDO('mysql:host=localhost;dbname=db_dilemma', 'root', '');
	
	// select
	if ($guid!=='') {
		$sql  = ' SELECT items.id, items.title, items.created_at ';
		$sql .= '  , IFNULL((SELECT SUM(rating) FROM vote WHERE vote.item = items.id),0) AS score ';
		$sql .= '  , IFNULL((SELECT COUNT(id) FROM vote WHERE vote.item = items.id),0) AS votes ';
		$sql .= '  , CASE ';
		$sql .= ' 	WHEN games.item1 = items.id THEN 1 ';
		$sql .= ' 	WHEN games.item2 = items.id THEN 2 ';
		$sql .= '  END AS sortOrder ';
		$sql .= ' FROM items ';
		$sql .= ' INNER JOIN games ON (games.item1 = items.id OR games.item2 = items.id) AND games.guid = "'.$guid.'" ';
		$sql .= ' ORDER BY sortOrder ';
		$sql .= ' LIMIT 0, 2 ';
	} else  {
		$sql  = ' SELECT id, title, created_at ';
		$sql .= '  , IFNULL((SELECT SUM(rating) FROM vote WHERE vote.item = items.id),0) AS score ';
		$sql .= '  , IFNULL((SELECT COUNT(id) FROM vote WHERE vote.item = items.id),0) AS votes ';
		$sql .= ' FROM items ';
		$sql .= ' ORDER BY RAND() ';
		$sql .= ' LIMIT 0, 2 ';
	}
	
	// Display
    foreach($dbh->query($sql) as $row) {
	
		$score = $row[3];
		if ($row[4] > 0) $score = $row[3]/$row[4];
	
		$item = array(
					'dilemma_id' => $row[0],
					'created_at' => date('r', strtotime($row[2])),
					'score' => $score,
					'votes' => $row[4],
					'title' => $row[1]
		);
		array_push($items, $item);
    }
    
	// save only new game
	if ($guid==='') {
		$guid = GUID();
		$sql = ' INSERT INTO games ';
		$sql .= ' (guid, item1, item2, user) ';
		$sql .= ' VALUES ';
		$sql .= ' ("'. $guid .'", '. $items[0]['dilemma_id'] .', '. $items[1]['dilemma_id'] .', "'.$user.'"); ';
		$dbh->query($sql);
	}
	$dbh = null;
	
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

// Stop timer
$time = microtime();
$time = explode(' ', $time);
$time = $time[1] + $time[0];
$finish = $time;
$total_time = round(($finish - $start), 4);

$response = array(
	'meta' => array(
		'code' => 200,
		'response_time' => array(
			'time' => $total_time,
			'measure' => 'seconds'
			)
		), 
	'dilemma' => array(
		'items' => $items,
		'guid' => $guid
	)
);

echo json_encode($response);

function GUID()
{
    if (function_exists('com_create_guid') === true)
    {
        return trim(com_create_guid(), '{}');
    }
    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}
?>
