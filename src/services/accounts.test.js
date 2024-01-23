import accountService from './accounts';
import accountRepo from '../repositories/accounts';

jest.mock('../repositories/accounts', () => ({
  __esModule: true,
  default: { getAll: jest.fn().mockResolvedValue([]), getById: jest.fn() },
}));
describe('accounts service', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  //   beforeEach();
  //   afterAll();
  //   afterEach();
  describe('getAll', () => {
    it('should call account repo, getAll method', async () => {
      //given
      accountRepo.getAll.mockResolvedValue([]);
      //when
      const result = await accountService.getAll();
      //then
      expect(result).toHaveLength(0);
      expect(accountRepo.getAll).toHaveBeenCalled();
    });
  });
});
