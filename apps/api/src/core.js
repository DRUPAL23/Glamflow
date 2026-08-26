const crypto = require('node:crypto');

const contentStore = new Map();
const workspaces = new Map();
const jobs = [];

function id(prefix) { return `${prefix}_${crypto.randomUUID()}`; }
function now() { return new Date().toISOString(); }

function createWorkspace(name = 'Demo Workspace') {
  const workspace = { id: id('ws'), name, createdAt: now() };
  workspaces.set(workspace.id, workspace);
  return workspace;
}

const defaultWorkspace = createWorkspace();

function createContent(input = {}) {
  const item = {
    id: id('cnt'), workspaceId: input.workspaceId || defaultWorkspace.id,
    title: input.title || 'Untitled content', body: input.body || '',
    platform: input.platform || 'instagram', status: input.status || 'draft',
    scheduledAt: input.scheduledAt || null, createdAt: now(), updatedAt: now()
  };
  contentStore.set(item.id, item);
  return item;
}

function listContent(workspaceId = defaultWorkspace.id) {
  return [...contentStore.values()].filter(x => x.workspaceId === workspaceId).sort((a,b) => b.createdAt.localeCompare(a.createdAt));
}

function scheduleContent(item, scheduledAt) {
  item.status = 'scheduled'; item.scheduledAt = scheduledAt; item.updatedAt = now();
  jobs.push({ id: id('job'), type: 'publish', contentId: item.id, runAt: scheduledAt, status: 'queued', createdAt: now() });
  return item;
}

module.exports = { workspaces, jobs, defaultWorkspace, createWorkspace, createContent, listContent, scheduleContent };
