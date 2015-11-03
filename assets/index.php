<?php
session_start();
global $user;

require 'php/settings.php';
// functions
require 'php/global.php';
require 'php/user.php';

initUser();
?>
<!doctype html>
<html class="no-js" lang="en" ng-app="dilemmaApp">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $aWebsiteDefaults['meta']['Title'];?></title>
	<meta name="Description" content="<?php echo $aWebsiteDefaults['meta']['Description'];?>">
    <link href="http://fonts.googleapis.com/css?family=Pacifico:400,700|Open+Sans" rel="stylesheet">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="js/critical.js"></script>
  </head>
  <body>

	<div class="row user__bar">
      <div class="large-12 columns">
	  <i class="fa fa-user"></i> Welcome <?php echo $user['username'];?>!
      </div>
	</div>

    <div class="row logo">
      <div class="large-12 columns">
        <h1 class="logo__title logo__title--large">Dire dilemma</h1>
        <div class="logo__image logo__image--large "><i class="fa fa-random fa-rotate-90"></i></div>
      </div>
    </div>

	<div class="row">
		<div class="large-2 medium-2 hide-for-small columns">&nbsp;</div>
		<div class="large-8 medium-8 small-12 columns">

      <div id="dilemma__loader" class="dilemma__container">
        <div ng-view></div>
      </div>
	</div>

      <div class="large-2 medium-2 hide-for-small columns">&nbsp;</div>

  </div>

	<footer class="_hidden">

	<div class="row">
		<div class="large-2 medium-2 hide-for-small columns">&nbsp;</div>
		<div class="large-8 medium-8 small-12 columns colofon">
			Developed by <a href="http://joranquinten.nl/" title="Developed by Joran Quinten">Joran Quinten</a>
		</div>
		<div class="large-2 medium-2 hide-for-small columns">&nbsp;</div>
	</div>
	</footer>

    <link rel="stylesheet" href="css/styles.min.css" />
    <script src="js/scripts.js"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
