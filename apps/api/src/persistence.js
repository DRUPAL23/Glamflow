const prisma = require('@glamflow/database/src/client');

async function findWorkspaceForUser(userId, workspaceId) {
  return prisma.workspace.findFirst({ where: { id: workspaceId, memberships: { some: { userId } } } });
}

async function listContentForUser(userId, workspaceId) {
  const workspace = await findWorkspaceForUser(userId, workspaceId);
  if (!workspace) return null;
  return prisma.content.findMany({ where: { workspaceId }, orderBy: { createdAt: 'desc' } });
}

module.exports = { prisma, findWorkspaceForUser, listContentForUser };
