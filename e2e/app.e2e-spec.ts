import { TickersPage } from './app.po';

describe('tickers App', () => {
  let page: TickersPage;

  beforeEach(() => {
    page = new TickersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
