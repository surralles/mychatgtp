import OpenAI from 'openai';
import readline from 'readline';

const openai = new OpenAI({
  organization: 'org-zvQgdrUrI0wqfaS1bmDWyVdf',
  apiKey: '',
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on('line', async (input) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: input }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices[0].message.content);
    userInterface.prompt();
  } catch (error) {
    console.error(error);
  }
});
