const db = require('./db');

db.all('SELECT DISTINCT department FROM products', [], (err, rows) => {
  if (err) throw err;
  rows.forEach(row => {
    db.run('INSERT OR IGNORE INTO departments (name) VALUES (?)', [row.department], err => {
      if (err) console.error('Insert department failed', err);
    });
  });
  console.log('Departments migration complete');
});
