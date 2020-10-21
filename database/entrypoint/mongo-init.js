db.auth('admin', 'fHYmOGIIsjBxbvcp')

db = db.getSiblingDB('disid')

db.createUser({
  user: 'disidUser',
  pwd: 'wSdPIchNyR8F09QH',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});

db.createCollection('Employees');
db.createCollection('Departments');