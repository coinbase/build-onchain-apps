import { getCurrentEnvironment, Environment } from '../../store/environment';
import isLocal from '../isLocal';

// Mock the getCurrentEnvironment function
jest.mock('../../store/environment', () => {
  const actual =
    jest.requireActual<typeof import('../../store/environment')>('../../store/environment');
  return {
    ...actual,
    getCurrentEnvironment: jest.fn(),
  };
});

const mockedGetCurrentEnvironment = getCurrentEnvironment as jest.MockedFunction<
  typeof getCurrentEnvironment
>;

describe('isLocal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns true when the environment is localhost', () => {
    mockedGetCurrentEnvironment.mockReturnValue(Environment.localhost);
    expect(isLocal()).toBe(true);
  });

  it('returns false when the environment is not localhost', () => {
    mockedGetCurrentEnvironment.mockReturnValue(Environment.production);
    expect(isLocal()).toBe(false);
  });
});
