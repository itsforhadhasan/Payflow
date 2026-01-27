"use client";

import {
  AGENT_LIST,
  type Agent,
  type AgentFilter,
} from "@/actions/admin-agent-actions";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

interface AgentContextType {
  agents: Agent[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  filter: AgentFilter;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: AgentFilter) => void;
  refresh: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgentContext must be used within AgentProvider");
  }
  return context;
};

interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<AgentFilter>({});

  const fetchAgents = useCallback(async () => {
    setIsLoading(true);
    const offset = (currentPage - 1) * limit;
    const response = await AGENT_LIST(offset, limit, filter);

    if (response.success && response.data) {
      setAgents(response.data.agents);
      setTotal(response.data.pagination.total);
    } else {
      toast.error(response.error || "Failed to fetch agents");
    }
    setIsLoading(false);
  }, [currentPage, limit, filter]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const totalPages = Math.ceil(total / limit);

  const value: AgentContextType = {
    agents,
    isLoading,
    currentPage,
    totalPages,
    limit,
    total,
    filter,
    setCurrentPage,
    setFilter,
    refresh: fetchAgents,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
}

