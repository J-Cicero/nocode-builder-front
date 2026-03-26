import { useCallback, useEffect, useState } from "react";
import workflowsApi from "../api/workflowsApi";

export function useWorkflows(projectId) {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await workflowsApi.list(projectId);
      setWorkflows(data || []);
    } catch (err) {
      setError(err?.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const create = async (payload) => {
    const { data } = await workflowsApi.create(projectId, payload);
    setWorkflows((prev) => [...prev, data]);
    return data;
  };

  const update = async (id, payload) => {
    const { data } = await workflowsApi.update(id, payload);
    setWorkflows((prev) => prev.map((w) => (w.tracking_id === id ? data : w)));
    return data;
  };

  const remove = async (id) => {
    await workflowsApi.remove(id);
    setWorkflows((prev) => prev.filter((w) => w.tracking_id !== id));
  };

  return { workflows, loading, error, refresh: fetchAll, create, update, remove };
}

export default useWorkflows;
