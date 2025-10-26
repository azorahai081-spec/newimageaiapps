import Database from 'better-sqlite3';

// For now, the database will be created in the project's root directory.
// This will be updated later to use the application's data directory.
const db = new Database('ai-image-describer.db');

const createCollectionsTable = `
  CREATE TABLE IF NOT EXISTS collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`;

const createFoldersTable = `
  CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    collection_id INTEGER,
    FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
  );
`;

const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL UNIQUE,
    description TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    collection_id INTEGER,
    FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
  );
`;

const createSettingsTable = `
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`;

const createTagsTable = `
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`;

const createImageTagsTable = `
  CREATE TABLE IF NOT EXISTS image_tags (
    image_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (image_id, tag_id),
    FOREIGN KEY (image_id) REFERENCES images (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
  );
`;

// Enable foreign key support
db.pragma('foreign_keys = ON');

// Execute table creation scripts
db.exec(createCollectionsTable);
db.exec(createFoldersTable);
db.exec(createImagesTable);
db.exec(createSettingsTable);
db.exec(createTagsTable);
db.exec(createImageTagsTable);

console.log('Database initialized successfully.');

export default db;
