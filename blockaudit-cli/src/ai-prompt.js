const { OpenAI } = require('openai');

const analyzeContract = async (contract, apiKey) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const params = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Your role and goal is to be an AI smart contract auditor. Your job is to perform an audit on the given smart contract, here is the smart contract: ${contract}.
            please provide the results in the following JSON format:
            [
              {
                "section": "Audit Report",
                "details": "A detailed audit report of the smart contract, covering security performance, and any other relevant aspect"
              },
              {
                "section": "Metric Scores",
                "details": [
                  {
                    "metric": "Security",
                    "score": 0
                  },
                  {
                    "metric": "Performance",
                    "score": 0
                  },
                  {
                    "metric": "Gas Efficiency",
                    "score": 0
                  },
                  {
                    "metric": "Code Quality",
                    "score": 0
                  },
                  {
                    "metric": "Documentation",
                    "score": 0
                  }
                ]
              },
              {
                "section": "Suggestions for Improvement",
                "details": "Suggestions for improving the smart contract"
              }
            ]`,
      },
    ],
  };

  try {
    const chatCompletion = await openai.chat.completions.create(params);
    const auditResults = JSON.parse(chatCompletion.choices[0].message.content);

    console.log('Audit Reports');
    console.log(auditResults.find((r) => r.section === 'Audit Report').details);

    console.log('\nMetric Scores');
    const metricScores = auditResults.find(
      (r) => r.section === 'Metric Scores'
    );
    metricScores.details.forEach((metric) => {
      console.log(`${metric.metric}: ${metric.score}/10`);
    });

    console.log('\nSuggestions for Improvement');
    console.log(
      auditResults.find((r) => r.section === 'Suggestions for Improvement')
        .details
    );
  } catch (error) {
    console.error('Error during analysis:', error);
  }
};

module.exports = { analyzeContract };
