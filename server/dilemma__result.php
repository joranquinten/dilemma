<?php
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
			$sql .= ' ((SELECT id FROM games WHERE guid = "'.$guid.'" LIMIT 0,1), '. $id .', null, '. $rating .'); ';
			
			$dbh->query($sql);
			
			// return result
			$sql  = ' SELECT items.id, items.title, items.created_at ';
			$sql .= '  , IFNULL((SELECT SUM(rating) FROM vote WHERE vote.item = items.id),0) AS score ';
			$sql .= '  , IFNULL((SELECT COUNT(id) FROM vote WHERE vote.item = items.id),0) AS votes ';
			$sql .= ' FROM items ';
			$sql .= ' INNER JOIN games ON games.guid = "'.$guid.'" ';
			$sql .= ' INNER JOIN vote ON games.id = vote.game AND items.id = vote.item ';
			$sql .= ' LIMIT 0,1 ';
			
			foreach($dbh->query($sql) as $row) {
			
				$score = $row[3];
				if ($row[4] > 0) $score = number_format ($row[3]/$row[4], 2);
			
				$item = array(
							'dilemma_id' => $row[0],
							'created_at' => date('r', strtotime($row[2])),
							'score' => $score,
							'votes' => $row[4],
							'title' => $row[1]
				);
				array_push($items, $item);
			}
			
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
		'items' => $items,
		'guid' => $guid
	)
);

echo json_encode($response);
?>