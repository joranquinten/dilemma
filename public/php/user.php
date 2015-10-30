<?php
function initUser(){

	global $aWebsiteDefaults;

	$cookie_name = 'user';
	// Check for cookie
	if(isset($_COOKIE[$cookie_name])) {
		$user_id = $_COOKIE[$cookie_name];
	} else {

	// If no cookie:

		// Generate random guest
		$user_suffix =  str_replace('.', '', $_SERVER['REMOTE_ADDR']) .''. mt_rand(100,999);
		$guid = GUID();
		// Insert guest into database
				
		// Connect
		try {
			$dbh = new PDO('mysql:host='.$aWebsiteDefaults['database']['host'].';dbname='.$aWebsiteDefaults['database']['dbname'], $aWebsiteDefaults['database']['user'], $aWebsiteDefaults['database']['pass']);
			$tmt = $dbh->prepare("INSERT INTO users (username, guid, last_ip) VALUES(?, ?, ?)");
			try { 
				$dbh->beginTransaction(); 
				$tmt->execute( array('guest'. $user_suffix, $guid, $_SERVER['REMOTE_ADDR']));
				$user_id = $dbh->lastInsertId(); 
				$dbh->commit();
				print $dbh->lastInsertId(); 
			} catch(PDOExecption $e) { 
				$dbh->rollback(); 
				print "Error!: " . $e->getMessage() . "</br>"; 
			} 
			$dbh = null;
			
			// Set cookie
			setcookie($cookie_name, $user_id, time() + (86400 * 30), "/"); // 30 days
			
		} catch (PDOException $e) {
			print "Error!: " . $e->getMessage() . "<br/>";
			die();
		}
	}
	
	if (isset($user_id)){
		// select
		$sql  = ' SELECT username, emailaddress, created_at, last_visit ';
		$sql .= ' FROM users ';
		$sql .= ' WHERE id = '.$user_id.' ';
		$sql .= ' LIMIT 0, 1 ';
		$dbh = new PDO('mysql:host='.$aWebsiteDefaults['database']['host'].';dbname='.$aWebsiteDefaults['database']['dbname'], $aWebsiteDefaults['database']['user'], $aWebsiteDefaults['database']['pass']);
		// Display
		foreach($dbh->query($sql) as $row) {
			global $user;
			$user = array(
						'id' => $user_id,
						'username' => $row[0],
						'emailaddress' => $row[1],
						'created_at' => date('r', strtotime($row[2])),
						'last_visit' => date('r', strtotime($row[3]))
			);
			//$_SESSION["user"] = $user;
		}
		$_SESSION['user'] = $user;
	}
	
}
?>