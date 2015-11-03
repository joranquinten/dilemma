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
$id = isset($_GET['dilemma']) ? $_GET['dilemma'] : '';
$rating = 5; // defaults to 5

// Connect

	// save
	if (($guid !== '') && ($id !== '')) {

		try {
			$dbh = new PDO('mysql:host=localhost;dbname=db_dilemma', 'root', '');

			$sql = ' INSERT INTO vote ';
			$sql .= ' (game, item, user, rating) ';
			$sql .= ' VALUES ';
			$sql .= ' ((SELECT id FROM games WHERE guid = "'.$guid.'" LIMIT 0,1), '. $id .', "'.$user.'", '. $rating .'); ';

			$dbh->query($sql);

			$dbh = null;
		} catch (PDOException $e) {
			print "Error!: " . $e->getMessage() . "<br/>";
			die();
		}
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
	'result' => array(
		'success' => true
	)
);

echo json_encode($response);
?>
