import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import Header from '../components/Header';
import EventForm from '../components/EventForm';
import EventsList from '../components/EventsList';
import PeopleForm from '../components/PeopleForm';
import Reports from '../components/Reports';
import Audit from '../components/Audit';
import { LogOut, Trash2 } from 'lucide-react';
import { deleteAllEvents } from '../store/slices/eventsSlice';

type TabType = 'events' | 'people' | 'reports' | 'audit';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const events = useSelector((state: RootState) => state.events.events);
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showPeopleForm, setShowPeopleForm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAllData = () => {
    if (window.confirm('⚠️ ¿Estás seguro de que deseas borrar TODOS los datos? Esta acción no se puede deshacer.')) {
      dispatch(deleteAllEvents());
      alert('✅ Todos los datos han sido eliminados');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'events' && '📅 Eventos'}
            {activeTab === 'people' && '👥 Personas'}
            {activeTab === 'reports' && '📊 Reportes'}
            {activeTab === 'audit' && '📋 Auditoría'}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAllData}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
              title="Borrar todos los datos"
            >
              <Trash2 size={18} />
              Borrar Todo
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-8 border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'events', label: '📅 Eventos' },
              { id: 'people', label: '👥 Personas' },
              { id: 'reports', label: '📊 Reportes' },
              { id: 'audit', label: '📋 Auditoría' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-2 font-semibold border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'events' && (
          <div>
            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className="mb-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-bold transition shadow-md"
            >
              {showEventForm ? '✕ Cerrar Formulario' : '+ Agregar Evento'}
            </button>
            {showEventForm && <EventForm onClose={() => setShowEventForm(false)} />}
            <EventsList />
          </div>
        )}

        {activeTab === 'people' && (
          <div>
            <button
              onClick={() => setShowPeopleForm(!showPeopleForm)}
              className="mb-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-bold transition shadow-md"
            >
              {showPeopleForm ? '✕ Cerrar Formulario' : '+ Agregar Persona'}
            </button>
            {showPeopleForm && <PeopleForm onClose={() => setShowPeopleForm(false)} />}
          </div>
        )}

        {activeTab === 'reports' && <Reports />}

        {activeTab === 'audit' && <Audit />}
      </div>
    </div>
  );
};

export default Dashboard;
