import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const today = new Date().toISOString().split('T')[0]

    // Run all queries in parallel
    const [todayOrdersRes, todayRevenueRes, totalProductsRes, pendingOrdersRes, recentOrdersRes, lowStockRes] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', today),
      supabase.from('orders').select('total').gte('created_at', today).eq('payment_status', 'paid'),
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('order_status', 'pending'),
      supabase.from('orders').select('id, order_number, customer_name, total, order_status, payment_status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('products').select('id', { count: 'exact', head: true }).lte('stock', 10).eq('status', 'active'),
    ])

    // Calculate today's revenue from returned rows
    const todayRevenue = todayRevenueRes.data?.reduce((sum, row) => sum + (row.total || 0), 0) || 0

    // Weekly revenue — use RPC if available, otherwise calculate from orders
    let weeklyRevenue: { day: string; revenue: number }[] = []
    try {
      const { data } = await supabase.rpc('get_weekly_revenue')
      if (data) weeklyRevenue = data
    } catch {
      // Fallback: get last 7 days of orders and group manually
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('total, created_at')
        .gte('created_at', sevenDaysAgo.toISOString())
        .eq('payment_status', 'paid')

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const dayMap: Record<string, number> = {}
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        dayMap[days[d.getDay()]] = 0
      }
      recentOrders?.forEach((o) => {
        const d = new Date(o.created_at)
        const day = days[d.getDay()]
        if (day in dayMap) dayMap[day] += o.total || 0
      })
      weeklyRevenue = Object.entries(dayMap).map(([day, revenue]) => ({ day, revenue }))
    }

    return NextResponse.json({
      todayOrders: todayOrdersRes.count || 0,
      todayRevenue,
      totalProducts: totalProductsRes.count || 0,
      pendingOrders: pendingOrdersRes.count || 0,
      lowStockCount: lowStockRes.count || 0,
      recentOrders: recentOrdersRes.data || [],
      weeklyRevenue,
    })
  } catch (error) {
    console.error('Metrics error:', error)
    return NextResponse.json({
      todayOrders: 0,
      todayRevenue: 0,
      totalProducts: 0,
      pendingOrders: 0,
      lowStockCount: 0,
      recentOrders: [],
      weeklyRevenue: [],
    })
  }
}
