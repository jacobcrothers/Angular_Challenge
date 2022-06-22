import { GitHistoryPage } from './app.po';

describe('git-history App', function() {
  let page: GitHistoryPage;

  beforeEach(() => {
    page = new GitHistoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
