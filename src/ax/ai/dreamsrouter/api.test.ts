import { describe, expect, it } from 'vitest';

import { AxAIDreamsRouter } from './api.js';

describe('AxAIDreamsRouter', () => {
  it('does not require an API key and omits auth headers', async () => {
    const llm = new AxAIDreamsRouter({
      config: { model: 'dreamsrouter/auto' },
    });

    expect(llm.getName()).toBe('DreamsRouter');
    expect((llm as any).apiURL).toBe('https://dreamsrouter.ai/api/v1');

    const headers = await (llm as any).headers();
    expect(headers.Authorization).toBeUndefined();
  });
});
