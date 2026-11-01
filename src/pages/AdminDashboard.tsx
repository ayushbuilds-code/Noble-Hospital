import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  UserPlus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowLeft,
  Shield,
  Key,
  Database,
  Building,
  RefreshCw,
  LogOut,
  Plus
} from 'lucide-react';
import { Appointment, Doctor, Department } from '../types';
import {
  getAppointments,
  getAllDoctorsAdmin,
  getDepartments,
  updateAppointmentStatus,
  addDoctor
} from '../services/appointmentService';
import {
  isSupabaseConfigured,
  supabaseUrl,
  saveSupabaseConfig
} from '../lib/supabase';
import {
  getBolnaAgentId,
  getBolnaApiKey,
  saveBolnaConfig,
  isBolnaConfigured
} from '../services/bolnaService';

export const AdminDashboard: React.FC = () => {
  // Authentication state (Session based demo admin)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nh_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard Data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Active view tab: 'overview' | 'appointments' | 'doctors' | 'patients' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'doctors' | 'patients' | 'settings'>('overview');

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Add doctor modal
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newDoctorDeptId, setNewDoctorDeptId] = useState('');
  const [newDoctorQualification, setNewDoctorQualification] = useState('');
  const [newDoctorSpecialisation, setNewDoctorSpecialisation] = useState('');
  const [newDoctorExp, setNewDoctorExp] = useState(8);
  const [newDoctorFee, setNewDoctorFee] = useState(700);
  const [newDoctorTimings, setNewDoctorTimings] = useState('09:00 AM - 01:00 PM');
  const [newDoctorDays, setNewDoctorDays] = useState('Monday - Saturday');
  const [newDoctorBio, setNewDoctorBio] = useState('');
  const [newDoctorImage, setNewDoctorImage] = useState(
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  );

  // Supabase Settings form
  const [supaUrlInput, setSupaUrlInput] = useState(supabaseUrl || '');
  const [supaKeyInput, setSupaKeyInput] = useState('');
  const [supaSaveMessage, setSupaSaveMessage] = useState<string | null>(null);

  // Bolna Settings form
  const [bolnaAgentInput, setBolnaAgentInput] = useState(getBolnaAgentId());
  const [bolnaKeyInput, setBolnaKeyInput] = useState(getBolnaApiKey());
  const [bolnaSaveMessage, setBolnaSaveMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appts, docs, depts] = await Promise.all([
        getAppointments(),
        getAllDoctorsAdmin(),
        getDepartments()
      ]);
      setAppointments(appts);
      setDoctors(docs);
      setDepartments(depts);
      if (depts.length > 0 && !newDoctorDeptId) {
        setNewDoctorDeptId(depts[0].id);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    // Hospital admin credentials (can also authenticate with Supabase auth if connected)
    if (
      (adminEmail === 'admin@noblehospital.com' && adminPassword === 'admin123') ||
      (adminEmail === 'staff' && adminPassword === 'noble2026')
    ) {
      localStorage.setItem('nh_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setAuthError('Invalid credentials. Use admin@noblehospital.com / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nh_admin_auth');
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (appointmentId: string, newStatus: Appointment['status']) => {
    await updateAppointmentStatus(appointmentId, newStatus);
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
    );
  };

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    const dept = departments.find((d) => d.id === newDoctorDeptId);
    const added = await addDoctor({
      departmentId: newDoctorDeptId,
      departmentName: dept?.name || 'General Medicine',
      name: newDoctorName,
      qualification: newDoctorQualification,
      specialisation: newDoctorSpecialisation,
      experienceYears: Number(newDoctorExp),
      consultationFee: Number(newDoctorFee),
      availableTimings: newDoctorTimings,
      availableDays: newDoctorDays,
      imageUrl: newDoctorImage,
      bio: newDoctorBio,
      isActive: true
    });
    setDoctors((prev) => [...prev, added]);
    setIsAddDoctorOpen(false);
    // reset form
    setNewDoctorName('');
    setNewDoctorQualification('');
    setNewDoctorSpecialisation('');
    setNewDoctorBio('');
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(supaUrlInput, supaKeyInput);
    setSupaSaveMessage('Settings saved. Refreshing page to reload client...');
  };

  const handleSaveBolna = (e: React.FormEvent) => {
    e.preventDefault();
    saveBolnaConfig(bolnaAgentInput, bolnaKeyInput);
    setBolnaSaveMessage('Bolna credentials updated successfully.');
    setTimeout(() => setBolnaSaveMessage(null), 3000);
  };

  // Filtered appointments
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.appointmentDate === todayStr);
  const upcomingAppointments = appointments.filter((a) => a.appointmentDate > todayStr);

  const filteredAppointments = appointments.filter((a) => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesDate = !dateFilter || a.appointmentDate === dateFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientPhone.includes(searchQuery);
    return matchesStatus && matchesDate && matchesSearch;
  });

  // Extract distinct patient records
  const uniquePatientsMap = new Map();
  appointments.forEach((a) => {
    if (!uniquePatientsMap.has(a.patientPhone)) {
      uniquePatientsMap.set(a.patientPhone, {
        name: a.patientName,
        phone: a.patientPhone,
        email: a.patientEmail,
        lastAppointment: a.appointmentDate,
        doctor: a.doctorName,
        totalAppointments: 1
      });
    } else {
      const existing = uniquePatientsMap.get(a.patientPhone);
      existing.totalAppointments += 1;
    }
  });
  const patientsList = Array.from(uniquePatientsMap.values());

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0C2847] to-[#123B67] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#123B67] to-[#16A6A0] mx-auto flex items-center justify-center text-white shadow-lg mb-4">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#123B67]">
              Noble Hospital Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized Clinician & Administration Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Hospital Staff Email
              </label>
              <input
                type="text"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@noblehospital.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 shadow-md shadow-brand-blue/20 transition-all text-sm mt-2"
            >
              Log In to Dashboard
            </button>
          </form>

          {/* Demo credential helper */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl">
            <span className="font-bold text-slate-700 block mb-0.5">Demo Admin Access:</span>
            <span>Email: <code className="text-brand-blue-800 font-semibold">admin@noblehospital.com</code></span><br />
            <span>Password: <code className="text-brand-blue-800 font-semibold">admin123</code></span>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-brand-teal font-semibold hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-brand-teal flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#123B67] text-lg tracking-tight">
                NOBLE HOSPITAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-teal-50 text-brand-teal border border-brand-teal/30">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Logged in as <strong className="text-slate-800">Admin Staff</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto text-xs font-semibold text-slate-600 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-brand-teal text-[#123B67]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'border-brand-teal text-[#123B67]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Appointments</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px]">
              {appointments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'doctors'
                ? 'border-brand-teal text-[#123B67]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Doctors ({doctors.length})
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'patients'
                ? 'border-brand-teal text-[#123B67]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Patient Records ({patientsList.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'settings'
                ? 'border-brand-teal text-[#123B67]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Config</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">Total Appointments</span>
                  <Calendar className="w-4 h-4 text-[#123B67]" />
                </div>
                <div className="text-2xl font-extrabold text-[#123B67]">{appointments.length}</div>
                <span className="text-[11px] text-slate-400 mt-1 block">Live across all clinics</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">Today's Schedule</span>
                  <Clock className="w-4 h-4 text-brand-teal" />
                </div>
                <div className="text-2xl font-extrabold text-[#16A6A0]">{todayAppointments.length}</div>
                <span className="text-[11px] text-slate-400 mt-1 block">Appointments for {todayStr}</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">Upcoming</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">{upcomingAppointments.length}</div>
                <span className="text-[11px] text-slate-400 mt-1 block">Future scheduled slots</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">Active Specialists</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-extrabold text-blue-600">{doctors.filter(d => d.isActive).length}</div>
                <span className="text-[11px] text-slate-400 mt-1 block">Across {departments.length} departments</span>
              </div>
            </div>

            {/* Today's Appointments Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#123B67]">Today's Appointments ({todayStr})</h3>
                  <p className="text-xs text-slate-500">Patients arriving at Noble Hospital OPD today</p>
                </div>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-bold text-brand-teal hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              {todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No appointments scheduled for today yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                        <th className="pb-3">Ref No</th>
                        <th className="pb-3">Patient</th>
                        <th className="pb-3">Doctor</th>
                        <th className="pb-3">Department</th>
                        <th className="pb-3">Time</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {todayAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50/80">
                          <td className="py-3 font-mono font-bold text-slate-700">{apt.referenceNumber}</td>
                          <td className="py-3">
                            <span className="font-semibold text-slate-900 block">{apt.patientName}</span>
                            <span className="text-slate-400 text-[11px]">{apt.patientPhone}</span>
                          </td>
                          <td className="py-3 text-slate-700">{apt.doctorName}</td>
                          <td className="py-3 text-slate-600">{apt.departmentName}</td>
                          <td className="py-3 font-semibold text-slate-800">{apt.appointmentTime}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                apt.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : apt.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : apt.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-3 text-right space-x-1">
                            {apt.status !== 'completed' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'completed')}
                                className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[10px]"
                              >
                                Complete
                              </button>
                            )}
                            {apt.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                className="px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-[10px]"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patient, doctor, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>

              {/* Status & Date Filter */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => { setSearchQuery(''); setDateFilter(''); setStatusFilter('all'); }}
                  className="text-xs text-slate-500 hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Ref Slip</th>
                      <th className="p-4">Patient</th>
                      <th className="p-4">Specialist Doctor</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Fee</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          No appointments match the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50/80">
                          <td className="p-4 font-mono font-bold text-slate-800">
                            {apt.referenceNumber}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-900 block">{apt.patientName}</span>
                            <span className="text-slate-400 text-[11px]">{apt.patientPhone}</span>
                            {apt.patientEmail && (
                              <span className="text-slate-400 text-[11px] block">{apt.patientEmail}</span>
                            )}
                          </td>
                          <td className="p-4 font-medium text-slate-800">{apt.doctorName}</td>
                          <td className="p-4 text-slate-600">{apt.departmentName}</td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-800 block">{apt.appointmentDate}</span>
                            <span className="text-slate-500 text-[11px]">{apt.appointmentTime}</span>
                          </td>
                          <td className="p-4 font-bold text-[#16A6A0]">₹{apt.consultationFee}</td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                apt.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : apt.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : apt.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1">
                            {apt.status !== 'confirmed' && apt.status !== 'completed' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[10px]"
                              >
                                Confirm
                              </button>
                            )}
                            {apt.status !== 'completed' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'completed')}
                                className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[10px]"
                              >
                                Done
                              </button>
                            )}
                            {apt.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                className="px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-[10px]"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DOCTORS MANAGEMENT TAB */}
        {activeTab === 'doctors' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#123B67]">Hospital Medical Staff</h3>
                <p className="text-xs text-slate-500">Manage active clinicians and consultation hours</p>
              </div>
              <button
                onClick={() => setIsAddDoctorOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Doctor</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-start gap-4">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brand-teal uppercase">{doc.departmentName}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        Active
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">{doc.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{doc.specialisation}</p>
                    <div className="mt-2 text-[11px] text-slate-600 space-y-0.5">
                      <div>Fee: <strong>₹{doc.consultationFee}</strong></div>
                      <div>Timings: <span>{doc.availableTimings}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PATIENTS TAB */}
        {activeTab === 'patients' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-[#123B67]">Patient Registry</h3>
              <p className="text-xs text-slate-500">Patients with appointment histories at Noble Hospital</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                    <tr>
                      <th className="p-4">Patient Name</th>
                      <th className="p-4">Phone Number</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Last Attending Doctor</th>
                      <th className="p-4">Last Visit Date</th>
                      <th className="p-4">Total Bookings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {patientsList.map((pt, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-4 font-semibold text-slate-900">{pt.name}</td>
                        <td className="p-4 font-mono text-slate-700">{pt.phone}</td>
                        <td className="p-4 text-slate-500">{pt.email || '—'}</td>
                        <td className="p-4 text-slate-800">{pt.doctor}</td>
                        <td className="p-4 text-slate-600">{pt.lastAppointment}</td>
                        <td className="p-4 font-bold text-brand-teal">{pt.totalAppointments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS / SUPABASE CONFIG TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#123B67]">Supabase Database Integration</h3>
                  <p className="text-xs text-slate-500">
                    {isSupabaseConfigured()
                      ? 'Connected to live Supabase PostgreSQL backend.'
                      : 'Currently operating in high-reliability resilient local mode.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSupabase} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://xyzcompany.supabase.co"
                    value={supaUrlInput}
                    onChange={(e) => setSupaUrlInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Supabase Anon (Public) Key
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supaKeyInput}
                    onChange={(e) => setSupaKeyInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Only provide your public anon key. Never expose your service_role secret in client-side code.
                  </span>
                </div>

                {supaSaveMessage && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {supaSaveMessage}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Stored securely in browser localStorage.
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#123B67] hover:bg-[#0C2847] transition-colors"
                  >
                    Save Configuration
                  </button>
                </div>
              </form>
            </div>

            {/* Bolna Voice Agent Settings Card */}
            <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#123B67]">Neha Voice Agent (Bolna AI)</h3>
                  <p className="text-xs text-slate-500">
                    {isBolnaConfigured()
                      ? 'Live Bolna agent connected for WebRTC calls.'
                      : 'Credentials required to enable live voice calling with Neha.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveBolna} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bolna Agent ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                    value={bolnaAgentInput}
                    onChange={(e) => setBolnaAgentInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bolna API Key
                  </label>
                  <input
                    type="password"
                    placeholder="bn-xxxxxxxxxxxx"
                    value={bolnaKeyInput}
                    onChange={(e) => setBolnaKeyInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Used securely via server-side session minting endpoint (`/api/bolna-session`).
                  </span>
                </div>

                {bolnaSaveMessage && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {bolnaSaveMessage}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Accessible to hospital administrative staff only.
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#123B67] to-[#16A6A0] hover:opacity-95 transition-opacity"
                  >
                    Save Bolna Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Add Doctor Modal */}
      {isAddDoctorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-800 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#123B67] mb-4">Add Medical Specialist</h3>
            <form onSubmit={handleCreateDoctor} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Doctor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kavita Deshpande"
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newDoctorDeptId}
                    onChange={(e) => setNewDoctorDeptId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={newDoctorFee}
                    onChange={(e) => setNewDoctorFee(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specialisation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pediatric Neurologist"
                  value={newDoctorSpecialisation}
                  onChange={(e) => setNewDoctorSpecialisation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MBBS, MD, DM"
                  value={newDoctorQualification}
                  onChange={(e) => setNewDoctorQualification(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Timings</label>
                  <input
                    type="text"
                    required
                    value={newDoctorTimings}
                    onChange={(e) => setNewDoctorTimings(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    value={newDoctorExp}
                    onChange={(e) => setNewDoctorExp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Doctor Bio</label>
                <textarea
                  rows={2}
                  value={newDoctorBio}
                  onChange={(e) => setNewDoctorBio(e.target.value)}
                  placeholder="Brief clinical background..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDoctorOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-white bg-[#123B67] hover:bg-[#0C2847]"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

