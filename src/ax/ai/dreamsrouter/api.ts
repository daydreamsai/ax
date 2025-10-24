import { axBaseAIDefaultConfig } from '../base.js';
import { AxAIOpenAIBase } from '../openai/api.js';
import type { AxAIOpenAIArgs } from '../openai/api.js';
import type { AxAIOpenAIConfig } from '../openai/chat_types.js';
import type { AxAIServiceOptions } from '../types.js';

type DreamsRouterConfig = AxAIOpenAIConfig<string, unknown>;

export const axAIDreamsRouterDefaultConfig = (): DreamsRouterConfig =>
  structuredClone({
    model: 'dreamsrouter/auto',
    ...axBaseAIDefaultConfig(),
  });

export type AxAIDreamsRouterArgs<TModelKey> = Omit<
  AxAIOpenAIArgs<'dreamsrouter', string, unknown, TModelKey>,
  'apiKey'
> & {
  referer?: string;
  title?: string;
  options?: Readonly<AxAIServiceOptions>;
};

export class AxAIDreamsRouter<TModelKey> extends AxAIOpenAIBase<
  string,
  unknown,
  TModelKey
> {
  constructor({
    config,
    options,
    models,
    modelInfo,
    referer,
    title,
  }: Readonly<Omit<AxAIDreamsRouterArgs<TModelKey>, 'name'>>) {
    const Config: DreamsRouterConfig = {
      ...axAIDreamsRouterDefaultConfig(),
      ...config,
    };

    const supportFor = {
      functions: true,
      streaming: true,
      hasThinkingBudget: false,
      hasShowThoughts: false,
      media: {
        images: { supported: false, formats: [] },
        audio: { supported: false, formats: [] },
        files: { supported: false, formats: [], uploadMethod: 'none' as const },
        urls: { supported: false, webSearch: false, contextFetching: false },
      },
      caching: { supported: false, types: [] },
      thinking: false,
      multiTurn: true,
    };

    const ModelInfo = modelInfo ?? [];

    super({
      apiKey: 'dreamsrouter-not-required',
      config: Config,
      options,
      apiURL: 'https://dreamsrouter.ai/api/v1',
      modelInfo: ModelInfo,
      models,
      supportFor,
    });

    super.setName('DreamsRouter');
    super.setHeaders(async () => {
      const headers: Record<string, string> = {};
      if (referer) headers['HTTP-Referer'] = referer;
      if (title) headers['X-Title'] = title;
      return headers;
    });
  }
}
