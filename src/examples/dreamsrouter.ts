import { ai, ax } from '@ax-llm/ax';

export const dreamsrouterGen = ax(
  'userQuestion:string "User question" -> responseText:string "AI response"'
);

console.log('=== DreamsRouter Demo ===');

const llm = ai({
  name: 'dreamsrouter',
  referer: process.env.DREAMSROUTER_REFERER,
  title: process.env.DREAMSROUTER_TITLE,
  config: { model: 'dreamsrouter/auto' },
});

const result = await dreamsrouterGen.forward(llm, {
  userQuestion: 'Say hello in one short sentence.',
});

console.log(result.responseText);
