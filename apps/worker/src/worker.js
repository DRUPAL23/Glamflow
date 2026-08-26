const interval = Number(process.env.WORKER_INTERVAL_MS || 5000);

console.log('GLAMFLOW worker started');

setInterval(() => {
  // Job execution pipeline will be connected here in the next implementation stage.
}, interval);
