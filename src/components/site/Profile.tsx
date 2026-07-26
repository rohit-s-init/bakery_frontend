// pages/profile.tsx or components/ProfilePage.tsx
import { useEffect, useState } from 'react';
import {
  User,
  Mail,
  CheckCircle,
  Clock,
  Package,
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  Heart,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useLoader } from '@/context/UniversalContext';
import { useNavigate } from '@tanstack/react-router';
import { useUser } from '@/context/User';
import { getUserOrders } from '@/api/order';
import { logout } from '@/api/user';
import { Order } from '@/types/orderdao.interface';
import ComponentSpin from '../ui/component-spin';
import ReactGA from "react-ga4";


// Define proper types
interface UserProfile {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}

interface ProfilePageProps {
  user?: UserProfile;
  orders?: Order[];
}

// Enhanced Order interface with display fields
interface DisplayOrder extends Order {
  img: string; // Emoji or image URL for display
  tag?: string; // Optional tag for display
  productPrice: string; // Formatted price
}

export function ProfilePage() {
  const { user, reloadUser } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setIsLoaderVisible } = useLoader();
  const navigate = useNavigate();

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getUserOrders();

        if (response.success) {
          setOrders(response.orders);
        } else {
          setError('Failed to load orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Unable to fetch your orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Transform orders for display with default images
  const displayOrders: DisplayOrder[] = orders.map((order) => {
    // Generate a default emoji based on product name or use a default
    let emoji = '🍰';
    const name = order.productName.toLowerCase();
    if (name.includes('macaron')) emoji = '🍬';
    else if (name.includes('croissant')) emoji = '🥐';
    else if (name.includes('tart') || name.includes('tartlet')) emoji = '🥧';
    else if (name.includes('éclair') || name.includes('eclair')) emoji = '🍫';
    else if (name.includes('cake') || name.includes('fraisier')) emoji = '🎂';
    else if (name.includes('assortment') || name.includes('palette')) emoji = '📦';

    // Generate a tag based on order status or product
    let tag = '';
    const status = 'PENDING';
    // if (status === 'DELIVERED') tag = 'Delivered';
    // else if (status === 'PENDING') tag = 'Pending';
    // else if (status === 'PREPARING') tag = 'Preparing';
    // else if (status === 'CONFIRMED') tag = 'Confirmed';
    tag = "Pending";

    return {
      ...order,
      img: emoji,
      tag,
      productPrice: `$${order.totalAmount}`
    };
  });

  const toggleOrder = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const handleLogout = async () => {
    try {
      setIsLoaderVisible(true);
      await logout();
      await reloadUser();
      navigate({ to: "/" });

      try {
        ReactGA.event("logout", {});
      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  // If user is not logged in, show loading or redirect
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50/50">
      {/* Hero Section - Small */}
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blush/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-peach/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-script text-2xl sm:text-3xl text-caramel">Welcome back</p>
              <h1 className="mt-1 font-display text-3xl sm:text-4xl text-primary leading-tight">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                {user.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={20} className="text-amber-700" />
              </button>
              <button
                className="p-2 rounded-full bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                onClick={handleLogout}
              >
                <LogOut size={20} className="text-amber-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-sm mb-8 max-w-md">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'text-gray-600 hover:bg-amber-50'
                  }
                `}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Total Orders', value: orders.length, icon: Package },
                  // { label: 'Member Since', value: user.createdAt ? formatDate(user.createdAt) : 'Jan 2024', icon: Calendar },
                  { label: 'Total Spent', value: `$${orders.reduce((sum, order) => sum + order.totalAmount, 0)}`, icon: Heart }
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 rounded-full bg-white/60">
                          <Icon size={20} className="text-amber-700" />
                        </div>
                      </div>
                      {/* write here */}
                      {/* <div className="text-2xl font-display text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div> */}
                      {isLoading ? <ComponentSpin /> : <>
                        <div className="text-2xl font-display text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </>}
                    </div>
                  );
                })}
              </div>

              {/* User Info Card */}
              <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl p-6">
                <h3 className="font-display text-lg text-primary mb-4">Profile Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-amber-700 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Full Name</div>
                      <div className="font-medium text-primary">{user.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-amber-700 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Email Address</div>
                      <div className="font-medium text-primary">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-emerald-600 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">Account Status</div>
                      <div className="font-medium text-emerald-600">Verified ✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-primary">Your Orders</h3>
                <span className="text-sm text-muted-foreground">
                  {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                </span>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading your orders...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-sm text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              ) : displayOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground/70">Start your sweet journey with us!</p>
                  <button
                    onClick={() => navigate({ to: '/menu' })}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-700 text-white px-6 py-2.5 font-medium shadow-soft hover:scale-105 transition-transform"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayOrders.map((order) => (
                    <div key={order.id} className="border border-amber-100 rounded-2xl overflow-hidden">
                      {/* Order Header */}
                      <button
                        onClick={() => toggleOrder(order.id)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-amber-50/50 transition-colors text-left"
                      >
                        <div className="text-3xl">{order.img}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-primary">{order.productName}</span>
                            <span className="text-sm text-muted-foreground">×{order.quantity}</span>
                            {order.tag && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                {order.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{order.productPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</div>
                          <div className="flex items-center gap-1 text-amber-700 text-sm">
                            {expandedOrder === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </button>

                      {/* Order Details - Expandable */}
                      {expandedOrder === order.id && (
                        <div className="px-4 pb-4 pt-1 border-t border-amber-100/50 animate-fade-up">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-start gap-2">
                              <Package size={16} className="text-amber-700 mt-0.5" />
                              <div>
                                <div className="text-xs text-muted-foreground">Description</div>
                                <div className="text-primary">{order.productDescription || 'No description available'}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Phone size={16} className="text-amber-700 mt-0.5" />
                              <div>
                                <div className="text-xs text-muted-foreground">Phone</div>
                                <div className="text-primary">{order.phoneNo}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 sm:col-span-2">
                              <MapPin size={16} className="text-amber-700 mt-0.5" />
                              <div>
                                <div className="text-xs text-muted-foreground">Delivery Address</div>
                                <div className="text-primary">{order.address}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Clock size={16} className="text-amber-700 mt-0.5" />
                              <div>
                                <div className="text-xs text-muted-foreground">Ordered On</div>
                                <div className="text-primary">{formatDateTime(order.createdAt)}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Package size={16} className="text-amber-700 mt-0.5" />
                              <div>
                                <div className="text-xs text-muted-foreground">Order ID</div>
                                <div className="text-primary text-xs">#{order.id}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 sm:col-span-2">
                              <div className="flex-1 p-3 bg-amber-50/50 rounded-xl">
                                <div className="text-xs text-muted-foreground mb-1">Order Summary</div>
                                <div className="flex justify-between text-primary">
                                  <span>Total</span>
                                  <span className="font-display">${order.totalAmount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl text-primary">Account Settings</h3>

              <div className="space-y-4">
                {/* Profile Settings */}
                <div className="bg-amber-50/30 rounded-2xl p-4">
                  <h4 className="font-medium text-primary mb-3">Profile Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Name</label>
                      <div className="font-medium text-primary">{user.name}</div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Email</label>
                      <div className="font-medium text-primary">{user.email}</div>
                    </div>
                    <button className="text-sm text-amber-700 hover:text-amber-800 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-amber-50/30 rounded-2xl p-4">
                  <h4 className="font-medium text-primary mb-3">Preferences</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 text-sm text-primary">
                      <input type="checkbox" className="rounded border-amber-300 text-amber-700 focus:ring-amber-500" defaultChecked />
                      Email notifications
                    </label>
                    <label className="flex items-center gap-3 text-sm text-primary">
                      <input type="checkbox" className="rounded border-amber-300 text-amber-700 focus:ring-amber-500" />
                      Order updates via SMS
                    </label>
                    <label className="flex items-center gap-3 text-sm text-primary">
                      <input type="checkbox" className="rounded border-amber-300 text-amber-700 focus:ring-amber-500" defaultChecked />
                      Marketing emails
                    </label>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50/30 rounded-2xl p-4 border border-red-100">
                  <h4 className="font-medium text-red-600 mb-3">Danger Zone</h4>
                  <button className="text-sm text-red-600 hover:text-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export for use in pages
export default ProfilePage;