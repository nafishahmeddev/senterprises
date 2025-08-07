/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { type ZodSchema } from "zod";
import { type ReactFormExtendedApi, useForm } from "@tanstack/react-form";
type SortState<TRecord> = {
  field: keyof TRecord;
  direction: "asc" | "desc";
};
export default function usePaginateState<TFilter, TRecord>({
  initialFilter,
  initialSort,
  initialPagination,
  validationSchema,
}: {
  initialFilter: TFilter;
  initialSort: SortState<TRecord>;
  initialPagination: { page: number; limit: number };
  validationSchema?: ZodSchema;
}): {
  form: ReactFormExtendedApi<
    TFilter, // TValues
    any,     // TResponse
    any,     // TFieldValues
    any,     // TFieldMeta
    any,     // TFieldState
    any,     // TFormMeta
    any,     // TFormState
    any,     // TFieldApi
    any,     // TFormApi
    any,     // TFormErrors
    any,     // TFieldOptions
    any      // TFormOptions
  >;
  state: {
    filter: TFilter;
    sort: SortState<TRecord>;
    pagination: { page: number; limit: number };
    timestamp: number;
  };
  setPagination: (
    value: { page: number; limit: number },
    force?: boolean
  ) => void;
  setSort: (value: SortState<TRecord>, force?: boolean) => void;
} {
  const [state, setState] = useState({
    filter: initialFilter,
    sort: initialSort,
    pagination: {
      page: initialPagination.page,
      limit: initialPagination.limit,
    },
    timestamp: Date.now(),
  });
  const setFilter = (value: Partial<typeof initialFilter>, force = false) => {
    setState((state) => {
      state = { ...state };
      if (force) {
        state.timestamp = Date.now();
      }
      state.filter = {
        ...state.filter,
        ...value,
      };
      state.pagination = { ...state.pagination, page: 1 };
      return state;
    });
  };
  const setPagination = (
    value: Partial<typeof initialPagination>,
    force = false
  ) => {
    setState((state) => {
      state = { ...state };
      state.pagination = {
        ...state.pagination,
        ...value,
      };
      if (force) {
        state.timestamp = Date.now();
      }
      return state;
    });
  };
  const setSort = (value: typeof initialSort, force = false) => {
    setState((state) => {
      state = { ...state };
      state.sort = value;
      if (force) {
        state.timestamp = Date.now();
      }
      return state;
    });
  };

  const form = useForm<
    TFilter, // TValues
    any,     // TResponse
    any,     // TFieldValues
    any,     // TFieldMeta
    any,     // TFieldState
    any,     // TFormMeta
    any,     // TFormState
    any,     // TFieldApi
    any,     // TFormApi
    any,     // TFormErrors
    any,     // TFieldOptions
    any      // TFormOptions
  >({
    defaultValues: initialFilter,
    validators: {
      onChange: validationSchema,
    },
    onSubmit: ({ value }) => setFilter(value, true),
  });

  return {
    form: form,
    state: {
      filter: { ...state.filter },
      sort: { ...state.sort },
      pagination: { ...state.pagination },
      timestamp: state.timestamp,
    },
    setSort,
    setPagination,
  };
}
