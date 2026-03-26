import { useCallback, useEffect, useState } from "react";
import interfaceApi from "../api/interfaceApi";

export function useInterface(projectId) {
  const [pages, setPages] = useState([]);
  const [componentsByPage, setComponentsByPage] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hydrate = useCallback(
    async (pid = projectId) => {
      if (!pid) return;
      setLoading(true);
      setError(null);
      try {
        const { data } = await interfaceApi.getInterface(pid);
        const pageList = data.pages || [];
        setPages(pageList);
        const map = {};
        pageList.forEach((p) => {
          map[p.tracking_id] = p.composants || [];
        });
        setComponentsByPage(map);
      } catch (err) {
        setError(err?.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const createPage = async (payload) => {
    const { data } = await interfaceApi.createPage(projectId, payload);
    setPages((prev) => [...prev, data]);
    setComponentsByPage((prev) => ({ ...prev, [data.tracking_id]: [] }));
    return data;
  };

  const deletePage = async (pageId) => {
    await interfaceApi.deletePage(pageId);
    setPages((prev) => prev.filter((p) => p.tracking_id !== pageId));
    setComponentsByPage((prev) => {
      const copy = { ...prev };
      delete copy[pageId];
      return copy;
    });
  };

  const createComponent = async (pageId, payload) => {
    const { data } = await interfaceApi.createComponent(pageId, payload);
    setComponentsByPage((prev) => ({
      ...prev,
      [pageId]: [...(prev[pageId] || []), data],
    }));
    return data;
  };

  const updateComponent = async (componentId, payload, pageId) => {
    const { data } = await interfaceApi.updateComponent(componentId, payload);
    setComponentsByPage((prev) => ({
      ...prev,
      [pageId]: (prev[pageId] || []).map((c) =>
        c.tracking_id === componentId ? data : c
      ),
    }));
    return data;
  };

  const deleteComponent = async (componentId, pageId) => {
    await interfaceApi.deleteComponent(componentId);
    setComponentsByPage((prev) => ({
      ...prev,
      [pageId]: (prev[pageId] || []).filter((c) => c.tracking_id !== componentId),
    }));
  };

  const reorderComponents = async (pageId, orderedIds) => {
    const payload = orderedIds.map((id, index) => ({
      id,
      ordre: index,
      position_x: 0,
      position_y: index,
    }));
    await interfaceApi.reorderComponents(pageId, payload);
    setComponentsByPage((prev) => {
      const list = (prev[pageId] || []).slice().sort((a, b) => {
        return orderedIds.indexOf(a.tracking_id) - orderedIds.indexOf(b.tracking_id);
      });
      return { ...prev, [pageId]: list };
    });
  };

  return {
    pages,
    componentsByPage,
    loading,
    error,
    hydrate,
    createPage,
    deletePage,
    createComponent,
    updateComponent,
    deleteComponent,
    reorderComponents,
    setPages,
  };
}

export default useInterface;
