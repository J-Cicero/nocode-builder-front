import axios from './axios';

export const projectsApi = {
  // Récupérer tous les projets
  getAll: async () => {
    // En production : return axios.get('/projects');
    return { data: { projects: [] } };
  },

  // Récupérer un projet spécifique
  getById: async (projectId) => {
    // return axios.get(`/projects/${projectId}`);
    return { data: { project: {} } };
  },

  // Créer un nouveau projet
  create: async (projectData) => {
    // return axios.post('/projects', projectData);
    return { data: { project: projectData, id: Date.now() } };
  },

  // Mettre à jour un projet
  update: async (projectId, updates) => {
    // return axios.put(`/projects/${projectId}`, updates);
    return { data: { project: { id: projectId, ...updates } } };
  },

  // Supprimer un projet
  delete: async (projectId) => {
    // return axios.delete(`/projects/${projectId}`);
    return { data: { deleted: true } };
  },

  // Dupliquer un projet
  duplicate: async (projectId) => {
    // return axios.post(`/projects/${projectId}/duplicate`);
    return { data: { project: { id: Date.now() } } };
  },

  // Exporter un projet
  export: async (projectId) => {
    // return axios.get(`/projects/${projectId}/export`);
    return { data: { export: {} } };
  },

  // Importer un projet
  import: async (file) => {
    // const formData = new FormData();
    // formData.append('file', file);
    // return axios.post('/projects/import', formData);
    return { data: { project: { id: Date.now() } } };
  },

  // Publier un projet
  publish: async (projectId) => {
    // return axios.post(`/projects/${projectId}/publish`);
    return { data: { published: true, url: 'https://app.buildrafrica.com/...' } };
  },

  // Récupérer les tables d'un projet
  getTables: async (projectId) => {
    // return axios.get(`/projects/${projectId}/tables`);
    return { data: { tables: [] } };
  },

  // Créer une table
  createTable: async (projectId, tableData) => {
    // return axios.post(`/projects/${projectId}/tables`, tableData);
    return { data: { table: tableData, id: Date.now() } };
  },

  // Récupérer les pages d'un projet
  getPages: async (projectId) => {
    // return axios.get(`/projects/${projectId}/pages`);
    return { data: { pages: [] } };
  },

  // Créer une page
  createPage: async (projectId, pageData) => {
    // return axios.post(`/projects/${projectId}/pages`, pageData);
    return { data: { page: pageData, id: Date.now() } };
  },

  // Récupérer les workflows d'un projet
  getWorkflows: async (projectId) => {
    // return axios.get(`/projects/${projectId}/workflows`);
    return { data: { workflows: [] } };
  },

  // Créer un workflow
  createWorkflow: async (projectId, workflowData) => {
    // return axios.post(`/projects/${projectId}/workflows`, workflowData);
    return { data: { workflow: workflowData, id: Date.now() } };
  }
};

export default projectsApi;
