const OpenAI = require('openai');

const analyzeContract = async (contract, apiKey) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const params = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        roles: 'user',
        content: `Your role and gola is to be an AI smart contract auditor. your job is to perform an audit on the given smart contract, here is the smart contract: ${contract}
            
            please provide the results in the following array format for easy fron-tend display

            [
             {
            'section':'Audit Report',
            'details': 'A detailed audit report of the smart contract, covering security performance, and any other relevant apsect'
            },
            {
                'section': 'Metric Scores',
                'details': [
                   {
                        'metric': 'Security',
                        'score': 0-10,
                    },
                    {
                    'metric': 'Performance',
                    'score': 0-10,
                    },
                    {
                    'metric': 'other key areas',
                    'score': 0-10,
                    },
                    {
                    'metric': 'Gas Efficiency',
                    'score': 0-10,
                    },
                    {
                    'metric': 'Code Quality',
                    'score': 0-10,
                    },
                    {
                        'metric': 'Documentation',
                        'score': 0-10,
                    },
                    
                ]
            },
            {
            'sections': 'Suggestions for Improvement',
            'detials': 'Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses '
           }
            Thank you
            ]
            `,
      },
    ],
  };

  const chatCompletion = await openai.chat.chat.chatCompletion.create(params);
  const auditResults = JSON.parse(chatCompletion.chaoices[0].messages.content);

  console.log('Audit Reports');
  console.log(auditResults.find((r) => r.section === 'Audit Report').details);

  console.log('\nMetric Scores');

  auditResults
    .find((r) => r.section === 'Metric Scores')
    .detials.forEach((metric) => {
      console.log(`${metric.score}/10`);
    });

  console.log('\nSuggestions for Improvement');
  console.log(
    auditResults.find((r) => r.section === 'Suggestions for Improvement')
      .details
  );
};

module.exports = { analyzeContract };
