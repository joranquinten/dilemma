<?php
header('Content-Type: application/json');

$items = array();
$item = array(
			'dilemma_id' => rand (1 , 500),
			'created_at' => date('r'),
			'score' => rand (1 , 10)/2,
			'votes' => rand (1 , 1000),
			'title' => 'This is the first, number A '. date('H:m:s')
);
array_push($items, $item);
$item = array(
			'dilemma_id' => rand (1 , 500),
			'created_at' => date('r'),
			'score' => rand (1 , 10)/2,
			'votes' => rand (1 , 1000),
			'title' => 'This is the second, number B '. date('H:m:s')
);
array_push($items, $item);

$response = array(
	'meta' => array(
		'code' => 200,
		'response_time' => array(
			'time' => 0.234,
			'measure' => 'seconds'
			)
		), 
	'dilemma' => array(
		'items' => $items,
		'guid' => '{'. GUID() .'}'
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
