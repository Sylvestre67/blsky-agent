import { describe, expect, test, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { HealthController } from './health.controller';
import { execSync } from 'child_process';

jest.mock('child_process', () => ({
  execSync: jest.fn().mockReturnValue('mocked-git-hash')
}));

describe('HealthController', () => {
  test('check returns correct status and git hash', () => {
    const mockReq = {} as Request;
    const mockRes = {
      json: jest.fn()
    } as unknown as Response;

    HealthController.check(mockReq, mockRes);

    expect(execSync).toHaveBeenCalledWith('git rev-parse HEAD');
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'ok',
      git_hash: 'mocked-git-hash'
    });
  });
}); 