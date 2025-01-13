import { describe, expect, test, jest, SpyInstance } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { RequestLog } from './request-log.middleware';

describe('RequestLog Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let nextFunction: NextFunction;
  let consoleSpy: SpyInstance;

  beforeEach(() => {
    mockReq = {
      method: 'GET',
      path: '/test',
      get: jest.fn().mockReturnValue('Mozilla/5.0')
    };
    mockRes = {};
    nextFunction = jest.fn();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should log request details and call next', () => {
    RequestLog.log(mockReq as Request, mockRes as Response, nextFunction);

    expect(consoleSpy).toHaveBeenCalledWith('GET | /test | Mozilla/5.0');
    expect(nextFunction).toHaveBeenCalled();
    expect(mockReq.get).toHaveBeenCalledWith('user-agent');
  });
}); 