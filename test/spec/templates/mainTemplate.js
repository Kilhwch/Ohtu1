describe("Testing Templates", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  xit('should redirect and setup the videos page template on root', function() {
    browser().navigateTo('#/');
    expect(element('#ng-view').html()).toContain('This is the issueboard view.');
  });

  xit('should load the watched videos template into view', function() {
    browser().navigateTo('#/watched-videos');
    expect(element('#ng-view').html()).toContain('youtube_listing');
  });

  xit('should load the watched video template into view', function() {
    browser().navigateTo('#/videos/123');
    expect(element('#ng-view').html()).toContain('profile');
  });

  xit('should redirect back to the index page if anything fails', function() {
    browser().navigateTo('#/something/else');
    expect(element('#ng-view').html()).toContain('youtube_listing');
  });

});
