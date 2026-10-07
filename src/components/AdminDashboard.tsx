import React, { useState, useEffect } from 'react';
import { ServerMetrics } from '../types';
import { X, Shield, RefreshCw, Activity, CheckCircle, AlertOctagon, Clock, Cpu, Trash2, Key } from 'lucide-react';
import { getApiEndpoint } from '../config';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState(() => localStorage.getItem('quicktok_admin_token') || '');
  const [inputToken, setInputToken] = useState('');
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);
  const [isTokenConfigured, setIsTokenConfigured] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchMetrics = async (activeToken = token) => {
    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (activeToken) {
        headers['x-admin-token'] = activeToken;
      }

      const res = await fetch(getApiEndpoint('/api/admin/stats'), { headers });
      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 401) {
          setError('Unauthorized. Please enter a valid ADMIN_ACCESS_TOKEN.');
        } else {
          setError(data.error?.message || 'Failed to fetch server metrics.');
        }
        setMetrics(null);
        return;
      }

      setMetrics(data.data.metrics);
      setIsTokenConfigured(data.data.isTokenConfigured);
    } catch {
      setError('Unable to reach server API endpoint.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMetrics();
    }
  }, [isOpen]);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputToken.trim();
    setToken(clean);
    localStorage.setItem('quicktok_admin_token', clean);
    fetchMetrics(clean);
  };

  const handleResetMetrics = async () => {
    if (!confirm('Are you sure you want to reset all request counters?')) return;

    try {
      const res = await fetch(getApiEndpoint('/api/admin/reset'), {
        method: 'POST',
        headers: {
          'x-admin-token': token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Metrics counter successfully reset.');
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchMetrics();
      } else {
        setError(data.error?.message || 'Could not reset metrics.');
      }
    } catch {
      setError('Error resetting metrics.');
    }
  };

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#252a33] dark:bg-[#15181d]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Admin Health & Metrics Console
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Server telemetry and provider verification
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Token notice & entry form */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-[#252a33] dark:bg-[#0b0d10]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Key className="h-3.5 w-3.5 text-rose-500" />
                <span>Admin Authentication Token</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {isTokenConfigured ? 'TOKEN_REQUIRED_IN_ENV' : 'OPTIONAL_IN_LOCAL_DEV'}
              </span>
            </div>

            <form onSubmit={handleSaveToken} className="mt-2.5 flex gap-2">
              <input
                type="password"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder={token ? '•••••••••••• (Saved)' : 'Hint: quicktok_admin_2026'}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Authenticate
              </button>
            </form>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
              <AlertOctagon className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Metrics Grid */}
          {metrics && (
            <div className="space-y-4">
              
              {/* Provider Status Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-[#252a33] dark:bg-[#0b0d10]">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${metrics.providerStatus === 'Configured' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Video Processing Provider</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {metrics.providerStatus}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchMetrics()}
                    disabled={loading}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleResetMetrics}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-[#252a33] dark:bg-[#0b0d10]">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#b8bec9]">Total Requests</span>
                  <p className="mt-1 font-mono text-xl font-bold text-slate-900 tabular-nums dark:text-white">
                    {metrics.totalRequests}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-[#252a33] dark:bg-[#0b0d10]">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#b8bec9]">Successful</span>
                  <p className="mt-1 font-mono text-xl font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                    {metrics.successfulRequests}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-[#252a33] dark:bg-[#0b0d10]">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#b8bec9]">Failed / Rejected</span>
                  <p className="mt-1 font-mono text-xl font-bold text-rose-600 tabular-nums dark:text-rose-400">
                    {metrics.failedRequests}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-[#252a33] dark:bg-[#0b0d10]">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-[#b8bec9]">Avg Duration</span>
                  <p className="mt-1 font-mono text-xl font-bold text-slate-900 tabular-nums dark:text-white">
                    {metrics.averageProcessingTimeMs} <span className="text-xs font-normal text-slate-400">ms</span>
                  </p>
                </div>
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-950">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <div>
                    <span className="text-[11px] text-slate-500">Uptime</span>
                    <p className="font-mono text-xs font-semibold text-slate-900 tabular-nums dark:text-white">
                      {formatUptime(metrics.uptimeSeconds)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-950">
                  <AlertOctagon className="h-5 w-5 text-amber-500" />
                  <div>
                    <span className="text-[11px] text-slate-500">Rate-Limit Blocks</span>
                    <p className="font-mono text-xs font-semibold text-slate-900 tabular-nums dark:text-white">
                      {metrics.rateLimitEvents}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-950">
                  <Cpu className="h-5 w-5 text-indigo-500" />
                  <div>
                    <span className="text-[11px] text-slate-500">Memory Usage</span>
                    <p className="font-mono text-xs font-semibold text-slate-900 tabular-nums dark:text-white">
                      {metrics.memoryUsageMb} MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Security info banner: Never displays API keys */}
              <div className="rounded-lg bg-slate-100 p-3 text-[11px] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                🔒 Security Note: Server secrets (such as <code className="font-mono">VIDEO_PROVIDER_API_KEY</code>) are stored strictly server-side and never exposed to the client or browser network inspection.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-right dark:border-[#252a33] dark:bg-[#0b0d10]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
