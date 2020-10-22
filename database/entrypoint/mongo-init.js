db.auth('admin', 'fHYmOGIIsjBxbvcp')

db = db.getSiblingDB('management')

db.createUser({
  user: 'managementUser',
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