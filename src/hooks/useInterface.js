import { useCallback, useEffect, useState } from "react";
import interfaceApi from "../api/interfaceApi";

const byOrdre = (a, b) => (a?.ordre ?? 0) - (b?.ordre ?? 0);

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
        const pageList = (data.pages || []).slice().sort(byOrdre);
        setPages(pageList);
        const map = {};
        pageList.forEach((p) => {
          map[p.tracking_id] = (p.composants || []).slice().sort(byOrdre);
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
    setPages((prev) => [...prev, data].sort(byOrdre));
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
      [pageId]: [...(prev[pageId] || []), data].sort(byOrdre),
    }));
    return data;
  };

  const updateComponent = async (componentId, payload, pageId) => {
    const { data } = await interfaceApi.updateComponent(componentId, payload);
    setComponentsByPage((prev) => ({
      ...prev,
      [pageId]: (prev[pageId] || []).map((c) =>
        c.tracking_id === componentId ? data : c
      ).sort(byOrdre),
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
    const safeOrderedIds = Array.from(
      new Set((orderedIds || []).filter((id) => typeof id === "string" && id.length > 0))
    );
    if (!safeOrderedIds.length) return;

    const payload = safeOrderedIds.map((id, index) => ({
      id,
      ordre: index,
      position_x: 0,
      position_y: index,
    }));
    await interfaceApi.reorderComponents(pageId, payload);
    setComponentsByPage((prev) => {
      const list = (prev[pageId] || []).slice().sort((a, b) => {
        const aIndex = safeOrderedIds.indexOf(a.tracking_id);
        const bIndex = safeOrderedIds.indexOf(b.tracking_id);
        if (aIndex === -1 && bIndex === -1) return byOrdre(a, b);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
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
