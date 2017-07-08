import { NgDataRestPage } from './app.po';

describe('ng-data-rest App', () => {
  let page: NgDataRestPage;

  beforeEach(() => {
    page = new NgDataRestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
