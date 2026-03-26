import { useEffect, useState, useCallback } from "react";
import schemaApi from "../api/schemaApi";

export function useSchema(projectId) {
  const [tables, setTables] = useState([]);
  const [fieldsByTable, setFieldsByTable] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTables = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await schemaApi.listTables(projectId);
      setTables(data);
      // preload fields
      const fieldsMap = {};
      for (const t of data) {
        const res = await schemaApi.listFields(t.tracking_id);
        fieldsMap[t.tracking_id] = res.data;
      }
      setFieldsByTable(fieldsMap);
    } catch (err) {
      setError(err?.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  return {
    tables,
    fieldsByTable,
    loading,
    error,
    refresh: fetchTables,
  };
}

export default useSchema;
