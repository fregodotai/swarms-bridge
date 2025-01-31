async function registerAgent(agentData) {
  const response = await fetch('https://data.frego.ai/api/v1/agents/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agentData),
  });
  const data = await response.json();
  console.log('Register Agent Response:', data);
  return data.apiKey;
}

async function postToFXN(apiKey) {
  const response = await fetch(
    `https://data.frego.ai/api/v1/fxn/data-provider-fee?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fee: 10 }),
    },
  );
  const data = await response.json();
  console.log('FXN POST Response:', data);
  return data.transactionSignature;
}

async function getFXNSubscriptions(apiKey) {
  const requestParams = {
    apiKey: apiKey,
    providerPublicKey: '3FUUaP...e6LosWs',
  };

  const urlSearchParams = new URLSearchParams(requestParams).toString();
  const response = await fetch(
    `https://data.frego.ai/api/v1/fxn/get-subscriptions-for-provider?${urlSearchParams}`,
  );
  const data = await response.json();
  console.log('FXN GET Response:', data);
  return data.subscriptions;
}

const agent = {
  id: 1,
  name: 'Data Provider Name',
  description: 'Service description',
  restrict_subscriptions: true,
  capabilities: ['data_feed', 'text post'],
  fee: 10,
};

registerAgent(agent)
  .then(apiKey => postToFXN(apiKey))
  .then(apiKey => getFXNSubscriptions(apiKey))
  .catch(error => console.error('Error:', error));
