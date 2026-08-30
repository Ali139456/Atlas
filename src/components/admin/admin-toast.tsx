"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Loader2, X, XCircle } from "lucide-react";

type ToastType = "loading" | "success" | "error";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => number;
  updateToast: (id: number, message: string, type: ToastType) => void;
  dismissToast: (id: number) => void;
  promiseToast: <T>(
    message: string,
    task: () => Promise<T>,
    successMessage?: string,
  ) => Promise<T>;
};

const AdminToastContext = createContext<ToastContextValue | null>(null);

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id: number, delay = 3200) => {
      const timer = setTimeout(() => dismissToast(id), delay);
      timers.current.set(id, timer);
    },
    [dismissToast],
  );

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((current) => [...current, { id, message, type }]);
      if (type !== "loading") scheduleDismiss(id);
      return id;
    },
    [scheduleDismiss],
  );

  const updateToast = useCallback(
    (id: number, message: string, type: ToastType) => {
      setToasts((current) =>
        current.map((toast) => (toast.id === id ? { ...toast, message, type } : toast)),
      );
      if (type !== "loading") scheduleDismiss(id);
    },
    [scheduleDismiss],
  );

  const promiseToast = useCallback(
    async <T,>(message: string, task: () => Promise<T>, successMessage = "Saved") => {
      const id = showToast(message, "loading");
      try {
        const result = await task();
        updateToast(id, successMessage, "success");
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        updateToast(id, errorMessage, "error");
        throw error;
      }
    },
    [showToast, updateToast],
  );

  const value = useMemo(
    () => ({ showToast, updateToast, dismissToast, promiseToast }),
    [dismissToast, promiseToast, showToast, updateToast],
  );

  return (
    <AdminToastContext.Provider value={value}>
      {children}
      <div className="admin-toast-stack" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`admin-toast admin-toast--${toast.type}`}
            role="status"
          >
            <span className="admin-toast-icon" aria-hidden>
              {toast.type === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : toast.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
            </span>
            <span className="admin-toast-message">{toast.message}</span>
            {toast.type !== "loading" ? (
              <button
                type="button"
                className="admin-toast-close"
                aria-label="Dismiss"
                onClick={() => dismissToast(toast.id)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast must be used within AdminToastProvider");
  }
  return context;
}
