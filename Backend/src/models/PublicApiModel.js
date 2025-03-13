const createNewsCategoryQuery = `INSERT INTO categories (uuid , name ) VALUES(?) `;

const UpdateViewCountQuery = `
  INSERT INTO blog_views (blog_id, view_count)
  VALUES (?, 1)
  ON DUPLICATE KEY UPDATE view_count = view_count + 1;
`;

const getViewCountQuery = `SELECT view_count
 FROM blog_views WHERE blog_id = ?`;

export { createNewsCategoryQuery, UpdateViewCountQuery, getViewCountQuery };
