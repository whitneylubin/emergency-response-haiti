module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/requests'],
      settings: {
        preset: 'desktop',
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 360,
          height: 640,
          deviceScaleFactor: 2
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 700,
          cpuSlowdownMultiplier: 2,
          requestLatencyMs: 150,
          downloadThroughputKbps: 700,
          uploadThroughputKbps: 700
        }
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }]
      }
    }
  }
};
