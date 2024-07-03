/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Files: {
    Base: '/files',
    Get: '/:id',
    Folder: '/folder/:name/files',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
} as const;
