const express = require('express');
const { defaultWorkspace, createWorkspace, createContent, listContent, scheduleContent, jobs, workspaces } = require('./core');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'glamflow-api' }));
app.get('/ready', (_req, res) => res.json({ status: 'ready', service: 'glamflow-api', version: '0.2.0' }));

app.get('/api/workspaces', (_req, res) => res.json({ data: [...workspaces.values()] }));
app.post('/api/workspaces', (req, res) => res.status(201).json({ data: createWorkspace(req.body.name) }));

app.get('/api/content', (req, res) => res.json({ data: listContent(req.query.workspaceId) }));
app.post('/api/content', (req, res) => res.status(201).json({ data: createContent(req.body) }));
app.post('/api/content/:id/schedule', (req, res) => {
  const item = require('./core').listContent().find(x => x.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'CONTENT_NOT_FOUND' });
  if (!req.body.scheduledAt) return res.status(400).json({ error: 'scheduledAt is required' });
  return res.json({ data: scheduleContent(item, req.body.scheduledAt) });
});
app.get('/api/jobs', (_req, res) => res.json({ data: jobs }));

app.use((err, _req, res, _next) => res.status(500).json({ error: 'INTERNAL_ERROR', message: err.message }));
app.listen(port, () => console.log(`GLAMFLOW API listening on :${port}`));
