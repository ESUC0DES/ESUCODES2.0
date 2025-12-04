import AdminDashboard from '@/components/admin/AdminDashboard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminPage() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}

