const db = require('./db');

db.run('ALTER TABLE products ADD COLUMN department_id INTEGER', (err) => {
  if (err && !String(err).includes('duplicate column')) {
    // ignore error if the column already exists (trying twice will fail)
    console.error('Failed to add column:', err);
  } else {
    console.log('department_id column added (or already exists)');
  }
  db.close();
});
