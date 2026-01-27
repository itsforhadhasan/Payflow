"use client";
import { ADMIN_LISTED } from "@/actions/admin-actions";
import type { Admin, AdminFilter } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AdminContextType {
  data: Admin[];
  loaded: boolean;
  setLoaded: () => void;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  fetched: number;
  isLoading: boolean;
  goToPage: (newPageIndex: number) => void;
  changePageSize: (newSize: number) => void;
  searchQuery: string;
  changeSearchQuery: (value: string) => void;
  triggerSearch: () => void;
  createdAtStart: string;
  createdAtEnd: string;
  changeDateStart: (value: string) => void;
  changeDateEnd: (value: string) => void;
  applyDateRange: (start: string, end: string) => void;
  refresh: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }

  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [data, setData] = useState<Admin[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [fetched, setFetched] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [createdAtStart, setCreatedAtStart] = useState("");
  const [createdAtEnd, setCreatedAtEnd] = useState("");

  const COOKIE_KEY = "x-uiu-cash-admin-limit";

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
        name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
      )
    );
    return match ? decodeURIComponent(match[1]) : null;
  };

  const setCookie = (name: string, value: string | number, days: number = 365) => {
    if (typeof document === "undefined") return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; path=/; max-age=${maxAge}`;
  };

  const fetchAdmin = async (offset: number, limit: number, filter: AdminFilter = {}) => {
    setIsLoading(true);
    const response = await ADMIN_LISTED(offset, limit, filter);

    if (response.success && response.data) {
      let admin = response.data.users || [];

      // Add serial number based on offset
      admin = admin.map((person, index) => {
        return { ...person, sl: offset + index + 1 };
      });

      setData(admin);
      setFetched(response.data.usersFetched || 0);
      setTotalCount(response.data.usersMatched || 0);
    }

    setIsLoading(false);
    setLoaded(true);
  };

  // No debounce; search is executed on Enter via triggerSearch

  useEffect(() => {
    if (!loaded) {
      const cookieLimit = parseInt(getCookie(COOKIE_KEY) || "", 10);
      const initialLimit =
        Number.isFinite(cookieLimit) && cookieLimit > 0
          ? cookieLimit
          : pageSize;
      if (initialLimit !== pageSize) setPageSize(initialLimit);
      const limit = initialLimit;
      const offset = pageIndex * limit;
      const filter: AdminFilter = {};
      if (searchQuery?.trim()) filter.search = searchQuery.trim();
      if (createdAtStart) filter.createdAtStart = createdAtStart; // YYYY-MM-DD
      if (createdAtEnd) filter.createdAtEnd = createdAtEnd; // YYYY-MM-DD
      fetchAdmin(offset, limit, filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, pageIndex, pageSize]);

  const refresh = () => {
    setLoaded(false);
  };

  const goToPage = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    setLoaded(false);
  };

  const changePageSize = (newSize: number) => {
    const size = Number(newSize) || 10;
    setCookie(COOKIE_KEY, size);
    setPageIndex(0);
    setPageSize(size);
    setLoaded(false);
  };

  const changeSearchQuery = (value: string) => {
    const next = value;
    const wasNonEmpty = Boolean(searchQuery && searchQuery.trim().length > 0);
    const isNowEmpty = !next || next.trim().length === 0;
    setSearchQuery(next);
    if (wasNonEmpty && isNowEmpty) {
      // If cleared, immediately refetch from first page
      setPageIndex(0);
      setLoaded(false);
    }
  };

  const triggerSearch = () => {
    setPageIndex(0);
    setLoaded(false);
  };

  const changeDateStart = (value: string) => {
    // Expecting YYYY-MM-DD from input type="date"
    setCreatedAtStart(value);
  };

  const changeDateEnd = (value: string) => {
    setCreatedAtEnd(value);
  };

  const applyDateRange = (start: string, end: string) => {
    setCreatedAtStart(start || "");
    setCreatedAtEnd(end || "");
    setPageIndex(0);
    setLoaded(false);
  };

  return (
    <AdminContext.Provider
      value={{
        data,
        loaded,
        setLoaded: refresh,
        pageIndex,
        pageSize,
        totalCount,
        fetched,
        isLoading,
        goToPage,
        changePageSize,
        searchQuery,
        changeSearchQuery,
        triggerSearch,
        createdAtStart,
        createdAtEnd,
        changeDateStart,
        changeDateEnd,
        applyDateRange,
        refresh,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
