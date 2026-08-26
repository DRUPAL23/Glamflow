const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.SESSION_SECRET;
if (!secret || secret === 'change-me') {
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET must be configured');
}
const signingSecret = secret || 'development-only-secret';

async function hashPassword(password) { return bcrypt.hash(password, 12); }
async function verifyPassword(password, hash) { return bcrypt.compare(password, hash); }
function signUser(user) { return jwt.sign({ sub: user.id, email: user.email }, signingSecret, { expiresIn: '7d' }); }
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'UNAUTHORIZED' });
  try { req.auth = jwt.verify(token, signingSecret); next(); }
  catch { return res.status(401).json({ error: 'INVALID_TOKEN' }); }
}

module.exports = { hashPassword, verifyPassword, signUser, requireAuth };
