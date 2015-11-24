describe('Basic setup', function(){

  it('should have a base url', function(){
    expect(settings.urls.base_url).not.toBe(null);
  });

  it('should be able to get a cardtemplate', function(){
    expect(settings.urls.dilemma__cards).not.toBe(null);
  });

  it('should be able to save somewhere', function(){
    expect(settings.urls.dilemma__save).not.toBe(null);
  });

  it('should have a result template', function(){
    expect(settings.urls.dilemma__result).not.toBe(null);
  });
  
});
