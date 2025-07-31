const db = require('./db');

db.all('SELECT id, department FROM products', (err, products) => {
  if (err) throw err;
  let processed = 0;
  products.forEach(prod => {
    db.get('SELECT id FROM departments WHERE name = ?', [prod.department], (err2, dept) => {
      if (dept) {
        db.run(
          'UPDATE products SET department_id = ? WHERE id = ?',
          [dept.id, prod.id],
          (uErr) => {
            if (uErr) console.error('Failed updating product', prod.id, uErr);
            processed++;
            if (processed === products.length) {
              console.log('Updated all products with department_id');
              db.close();
            }
          }
        );
      } else {
        processed++;
      }
    });
  });
});
