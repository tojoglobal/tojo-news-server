const createNewsCategoryQuery = `INSERT INTO categories (uuid , name ) VALUES(?) `;

// view count query
const UpdateViewCountQuery = `
  INSERT INTO blog_views (blog_id, view_count)
  VALUES (?, 1)
  ON DUPLICATE KEY UPDATE view_count = view_count + 1;
`;
const getViewCountQuery = `SELECT view_count
 FROM blog_views WHERE blog_id = ?`;
// reading time query
const updateReadingTimeQuery = `INSERT INTO blog_reading_time (blog_id, reading_time) VALUES (? , ?) ON DUPLICATE KEY UPDATE reading_time = reading_time + VALUES(reading_time)`;

export {
  createNewsCategoryQuery,
  UpdateViewCountQuery,
  getViewCountQuery,
  updateReadingTimeQuery,
};
