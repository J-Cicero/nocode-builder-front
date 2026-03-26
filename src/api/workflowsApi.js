import axios from "./axios";

export const workflowsApi = {
  list: (projectId) => axios.get(`/workflows/${projectId}`),
  create: (projectId, payload) => axios.post(`/workflows/${projectId}`, payload),
  update: (trackingId, payload) => axios.patch(`/workflows/${trackingId}`, payload),
  remove: (trackingId) => axios.delete(`/workflows/${trackingId}`),
  executions: (workflowId) => axios.get(`/workflows/${workflowId}/executions`),
};

export default workflowsApi;
