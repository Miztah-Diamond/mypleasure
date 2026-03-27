"use client"

import { useState, useEffect } from 'react'
import { Search, Loader2, MessageSquare, Clock, CheckCircle, Package, XCircle, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { ProductRequest } from '@/types'

const statusTabs = ['all', 'new', 'reviewed', 'sourcing', 'fulfilled', 'declined']

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  new: { icon: MessageSquare, color: 'bg-blue-50 text-blue-600 border-blue-200', label: 'New' },
  reviewed: { icon: Eye, color: 'bg-amber-50 text-amber-600 border-amber-200', label: 'Reviewed' },
  sourcing: { icon: Clock, color: 'bg-purple-50 text-purple-600 border-purple-200', label: 'Sourcing' },
  fulfilled: { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-200', label: 'Fulfilled' },
  declined: { icon: XCircle, color: 'bg-red-50 text-red-600 border-red-200', label: 'Declined' },
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ProductRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<ProductRequest | null>(null)
  const [updating, setUpdating] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams()
      if (activeTab !== 'all') params.set('status', activeTab)
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/requests?${params}`)
      if (res.ok) setRequests(await res.json())
    } catch {
      // silent fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchRequests()
  }, [activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timer = setTimeout(() => fetchRequests(), 300)
    return () => clearTimeout(timer)
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, admin_notes: adminNotes || undefined }),
      })
      if (res.ok) {
        const updated = await res.json()
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)))
        if (selectedRequest?.id === id) setSelectedRequest(updated)
      }
    } catch {
      // silent fail
    } finally {
      setUpdating(false)
    }
  }

  const handleNotesUpdate = async (id: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, admin_notes: adminNotes }),
      })
      if (res.ok) {
        const updated = await res.json()
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)))
        setSelectedRequest(updated)
      }
    } catch {
      // silent fail
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-wine">Product Requests</h1>
          <p className="text-sm text-warm-gray mt-1">{requests.length} total requests</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all capitalize',
              activeTab === tab
                ? 'bg-gold text-white'
                : 'bg-white text-chocolate border border-beige hover:border-gold'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray" />
        <Input
          placeholder="Search by product name, customer, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 max-w-sm"
        />
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 bg-white rounded-2xl border border-beige/50 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-16 text-warm-gray text-sm">
              {search
                ? 'No requests match your search.'
                : 'No product requests yet. They\'ll appear here when customers submit requests.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cream/50 border-b border-beige">
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Product</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-warm-gray font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => {
                    const config = statusConfig[req.status] || statusConfig.new
                    const StatusIcon = config.icon
                    return (
                      <tr
                        key={req.id}
                        className={cn(
                          'border-b border-beige/50 hover:bg-cream/30 transition-colors cursor-pointer',
                          selectedRequest?.id === req.id && 'bg-cream/50'
                        )}
                        onClick={() => {
                          setSelectedRequest(req)
                          setAdminNotes(req.admin_notes || '')
                        }}
                      >
                        <td className="py-3 px-4 text-warm-gray text-xs">
                          {new Date(req.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-chocolate truncate max-w-[200px]">
                            {req.product_name || 'No name provided'}
                          </p>
                          {req.category && (
                            <p className="text-xs text-warm-gray capitalize">{req.category}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-chocolate">{req.name || 'Anonymous'}</p>
                          <p className="text-xs text-warm-gray">{req.email || req.phone || '—'}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', config.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedRequest(req)
                              setAdminNotes(req.admin_notes || '')
                            }}
                            className="p-1.5 rounded-lg text-warm-gray hover:text-gold hover:bg-gold/10 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedRequest && (
          <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-beige/50 p-5 space-y-5 self-start sticky top-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-chocolate text-sm">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-warm-gray hover:text-chocolate text-xs"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-warm-gray text-xs block mb-0.5">Product</span>
                <p className="font-medium text-chocolate">{selectedRequest.product_name || 'Not specified'}</p>
              </div>
              {selectedRequest.category && (
                <div>
                  <span className="text-warm-gray text-xs block mb-0.5">Category</span>
                  <p className="text-chocolate capitalize">{selectedRequest.category}</p>
                </div>
              )}
              {selectedRequest.description && (
                <div>
                  <span className="text-warm-gray text-xs block mb-0.5">Description</span>
                  <p className="text-chocolate text-xs leading-relaxed">{selectedRequest.description}</p>
                </div>
              )}
              {selectedRequest.product_slug && (
                <div>
                  <span className="text-warm-gray text-xs block mb-0.5">From Product</span>
                  <a
                    href={`/product/${selectedRequest.product_slug}`}
                    target="_blank"
                    className="text-gold text-xs hover:underline"
                  >
                    {selectedRequest.product_slug}
                  </a>
                </div>
              )}

              <div className="border-t border-beige pt-3">
                <span className="text-warm-gray text-xs block mb-0.5">Customer</span>
                <p className="text-chocolate">{selectedRequest.name || 'Anonymous'}</p>
                {selectedRequest.email && <p className="text-xs text-warm-gray">{selectedRequest.email}</p>}
                {selectedRequest.phone && <p className="text-xs text-warm-gray">{selectedRequest.phone}</p>}
              </div>

              <div className="border-t border-beige pt-3">
                <span className="text-warm-gray text-xs block mb-0.5">Submitted</span>
                <p className="text-chocolate text-xs">{new Date(selectedRequest.created_at).toLocaleString()}</p>
              </div>
            </div>

            {/* Status Update */}
            <div className="border-t border-beige pt-4 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-chocolate">Update Status</label>
              <div className="grid grid-cols-2 gap-2">
                {(['new', 'reviewed', 'sourcing', 'fulfilled', 'declined'] as const).map((s) => {
                  const config = statusConfig[s]
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusUpdate(selectedRequest.id, s)}
                      disabled={updating || selectedRequest.status === s}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                        selectedRequest.status === s
                          ? config.color + ' ring-2 ring-offset-1 ring-gold/30'
                          : 'bg-white text-warm-gray border-beige hover:border-gold'
                      )}
                    >
                      {config.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="border-t border-beige pt-4 space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-chocolate">Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-beige bg-cream/30 px-3 py-2 text-xs text-chocolate placeholder:text-warm-gray/50 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none"
                placeholder="Internal notes about this request..."
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleNotesUpdate(selectedRequest.id)}
                disabled={updating}
                className="w-full text-xs"
              >
                {updating ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
