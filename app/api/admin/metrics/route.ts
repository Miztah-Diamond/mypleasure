import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const sql = getDb()

    // Run all queries in parallel
    const [todayOrders, todayRevenue, totalProducts, pendingOrders, recentOrders, weeklyRevenue] = await Promise.all([
      // Today's order count
      sql`SELECT COUNT(*)::int as count FROM orders WHERE created_at >= CURRENT_DATE`,
      // Today's revenue
      sql`SELECT COALESCE(SUM(total), 0)::bigint as total FROM orders WHERE created_at >= CURRENT_DATE AND payment_status = 'paid'`,
      // Total active products
      sql`SELECT COUNT(*)::int as count FROM products WHERE status = 'active'`,
      // Pending orders
      sql`SELECT COUNT(*)::int as count FROM orders WHERE order_status = 'pending'`,
      // Recent 5 orders
      sql`SELECT id, order_number, customer_name, total, order_status, payment_status, created_at
          FROM orders ORDER BY created_at DESC LIMIT 5`,
      // Last 7 days revenue
      sql`SELECT
            TO_CHAR(d.day, 'Dy') as day,
            COALESCE(SUM(o.total), 0)::bigint as revenue
          FROM generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, '1 day') d(day)
          LEFT JOIN orders o ON DATE(o.created_at) = d.day AND o.payment_status = 'paid'
          GROUP BY d.day ORDER BY d.day`,
    ])

    // Low stock count
    const lowStock = await sql`SELECT COUNT(*)::int as count FROM products WHERE stock <= 10 AND status = 'active'`

    return NextResponse.json({
      todayOrders: todayOrders[0]?.count || 0,
      todayRevenue: Number(todayRevenue[0]?.total || 0),
      totalProducts: totalProducts[0]?.count || 0,
      pendingOrders: pendingOrders[0]?.count || 0,
      lowStockCount: lowStock[0]?.count || 0,
      recentOrders: recentOrders || [],
      weeklyRevenue: weeklyRevenue || [],
    })
  } catch (error) {
    console.error('Metrics error:', error)
    // Return mock/zero data when DB is unavailable
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
