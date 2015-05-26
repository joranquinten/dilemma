<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dire dilemma</title>
    <link href="http://fonts.googleapis.com/css?family=Pacifico:400,700|Open+Sans" rel="stylesheet">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="js/critical.js"></script>
	
	<script id="dilemma-start" type="text/x-handlebars-template">
	</script>
	
	<script id="dilemma-result" type="text/x-handlebars-template">
	{{#each result}}
	<div class="dilemma__card dilemma__card--result animated flipInY">
		<div class="dilemma__title" data-dilemma-id="{{this.dilemma_id}}">{{this.title}}</div>
		<div class="dilemma__details clearfix">
			<span class="dilemma__rating left">Rating: {{this.score}}</span>
			<span class="dilemma__chosen left">Chosen: {{this.votes}}</span>
			<span class="dilemma__created right">Created: {{this.created_at}}</span>
		</div>
	</div>
	
	<div class="dilemma__info animated">
		<button id="button__newDilemma" class="button round expand button__select"><i class="fa fa-mail-forward"></i> Next up!</button>
	</div>
	{{/each}}
	</script>
	
	<script id="dilemma-cards" type="text/x-handlebars-template">
	
	<div class="dilemma__gauge">
		<div class="dilemma__gauge__fill animated"></div>
	</div>
			
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
		
				
			<div id="dilemma__loader" class="dilemma__container">
		<div class="dilemma__games animated hidden">
			<button class="button round expand button__select button__select--solo"><i class="fa fa-trophy"></i> Solo</button>
			<button class="button round expand button__select button__select--party"><i class="fa fa-comments-o"></i> Party</button>
			<button class="button round expand button__select button__select--rounds"><i class="fa fa-bomb"></i> Rounds</button>
		</div>
		<div class="dilemma__games animated">
		</div>	
			
				<div class="dilemma__info animated">
					<h2>How does it work?</h2>
					<p>Each round of the game, you get submitted to two dilemmas. You must choose a dilemma to proceed. If the timer runs out, another dilemma will appear.</p>
					<button id="button__newDilemma" class="button round expand button__select"><i class="fa fa-street-view"></i> Play as a guest</button>
					<button id="button__register" class="button round expand button__select hidden"><i class="fa fa-link"></i> Connect with Social Media</button>
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
