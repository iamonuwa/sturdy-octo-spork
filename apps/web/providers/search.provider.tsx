"use client";

import React, {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import Fuse from "fuse.js";
import { useVmInstancesQuery } from "@/domains/instances/api/instancesQuery";

// Define actions
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

// Define state and actions types
interface SearchState<T> {
  query: string;
  results: T[];
}

interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}

interface SetSearchResultsAction<T> {
  type: typeof SET_SEARCH_RESULTS;
  payload: T[];
}

type SearchActions<T> = SetSearchQueryAction | SetSearchResultsAction<T>;

const initialState: SearchState<unknown> = {
  query: "",
  results: [],
};

// Create context
const SearchContext = createContext<{
  state: SearchState<unknown>;
  dispatch: Dispatch<SearchActions<unknown>>;
  search: (query: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  search: () => {},
});

// Reducer
const searchReducer = <T,>(
  state: SearchState<T>,
  action: SearchActions<T>
): SearchState<T> => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, query: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};

const fuseOptions = {
  keys: ["name", "region", "status"],
};

// Context provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { data } = useVmInstancesQuery();
  const fuse = useMemo(() => new Fuse(data || [], fuseOptions), [data]);

  useEffect(() => {
    if (data && state.query.length < 3) {
      dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
    } else {
      search(state.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  const search = useCallback(
    (searchPattern: string) => {
      if (!data) return;
      dispatch({ type: "SET_SEARCH_QUERY", payload: searchPattern });
      if (searchPattern.length > 3) {
        const results = fuse.search(searchPattern).map((result) => result.item);
        dispatch({ type: "SET_SEARCH_RESULTS", payload: results });
      } else {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
      }
    },
    [data, fuse]
  );

  return (
    <SearchContext.Provider value={{ state, dispatch, search }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use search context
export const useSearchContext = <T,>(): {
  state: SearchState<T>;
  dispatch: Dispatch<SearchActions<T>>;
  search: (query: string) => void;
} => {
  return useContext(SearchContext) as {
    state: SearchState<T>;
    dispatch: Dispatch<SearchActions<T>>;
    search: (query: string) => void;
  };
};
