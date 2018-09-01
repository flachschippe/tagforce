import { TagforcePage } from './app.po';

describe('tagforce App', function() {
  let page: TagforcePage;

  beforeEach(() => {
    page = new TagforcePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
