<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dire dilemma</title>
    <link href="http://fonts.googleapis.com/css?family=Pacifico:400,700|Open+Sans" rel="stylesheet">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="js/critical.js"></script>
	
	<script id="dilemma-cards" type="text/x-handlebars-template">
	{{#each dilemma}}	
	<div class="dilemma__card animated flipInY">
		<div class="dilemma__title" data-dilemma-id="{{this.dilemma_id}}">{{this.title}}</div>
		<div class="dilemma__details clearfix">
			<span class="dilemma__rating left">Rating: {{this.score}}</span>
			<span class="dilemma__chosen left">Chosen: {{this.votes}}</span>
			<span class="dilemma__created right">Created: {{this.created_at}}</span>
		</div>
	</div>		
	{{/each}}
	</script>
	
  </head>
  <body>
    
    <div class="row logo">
      <div class="large-12 columns">
        <h1 class="logo__title logo__title--large">Dire dilemma</h1>
        <div class="logo__image logo__image--large "><i class="fa fa-random fa-rotate-90"></i></div>
      </div>
    </div>
	
	<div class="row">
		<div class="large-2 medium-2 hide-for-small columns">&nbsp;</div>
		<div class="large-8 medium-8 small-12 columns">
		
			<div class="dilemma__gauge">
				<div class="dilemma__gauge__fill animated"></div>
			</div>
				
			<div id="dilemma__loader" class="dilemma__container">
			
				<div class="dilemma__info animated">
					<h2>How does it work?</h2>
					<p>Each round of the game, you get submitted to two dilemmas. You must choose one dilemma to proceed. Choose before the timer runs out!</p>
					<button id="button__start" class="button round expand">Got it!</button>
				</div>	
		
			</div>
			
		
		</div>	
		
		
		<div class="large-2 medium-2 hide-for-small columns">&nbsp;</div>
	</div>
	
	
    <link rel="stylesheet" href="css/styles.min.css" />
    <script src="js/scripts.js"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
