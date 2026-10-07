DROP TABLE IF EXISTS leads;
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  area_sqft INTEGER,
  luxury_tier TEXT,
  estimated_budget TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
