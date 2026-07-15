import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Download, Trash2, Eye } from 'lucide-react';
import { exportToExcel } from '../utils/excelExport';
import { removePerson } from '../store/slices/eventsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../store/slices/auditSlice';

const EventsList: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const events = useSelector((state: RootState) => state.events.events);
  const [expandedEventId, setExpandedEventId] = React.useState<string | null>(null);

  const handleExport = () => {
    if (events.length === 0) {
      alert('⚠️ No hay eventos para exportar');
      return;
    }
    exportToExcel(events);
    
    const auditLog = {
      id: uuidv4(),
      userId: user?.id || 'unknown',
      action: 'EXPORT_DATA',
      description: `Se exportaron ${events.length} eventos a Excel`,
      timestamp: new Date().toISOString(),
      details: { eventsCount: events.length },
    };
    dispatch(addLog(auditLog));
  };

  const handleDeletePerson = (eventId: string, personId: string) => {
    if (window.confirm('¿Deseas eliminar esta persona del evento?')) {
      dispatch(removePerson({ eventId, personId }));
      
      const auditLog = {
        id: uuidv4(),
        userId: user?.id || 'unknown',
        action: 'DELETE_PERSON',
        description: `Persona eliminada del evento`,
        timestamp: new Date().toISOString(),
        details: { eventId, personId },
      };
      dispatch(addLog(auditLog));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-800">📅 Lista de Eventos ({events.length})</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold shadow-md"
        >
          <Download size={18} />
          Exportar a Excel
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">📭 No hay eventos registrados</p>
          <p className="text-gray-400 text-sm mt-2">Crea un evento para comenzar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <div
                className="bg-gradient-to-r from-red-50 to-green-50 p-4 cursor-pointer flex justify-between items-center"
                onClick={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">📍 {event.chapter}</h3>
                  <p className="text-sm text-gray-600">
                    📅 {event.date} | 📍 {event.location} | 💰 ${event.totalRaised.toFixed(2)}
                  </p>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  <Eye size={24} />
                </button>
              </div>

              {expandedEventId === event.id && (
                <div className="p-4 border-t bg-gray-50 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Código</p>
                      <p className="font-semibold text-gray-800">{event.code || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Contado</p>
                      <p className="font-semibold text-red-600">${event.cashPayment.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Tarjeta</p>
                      <p className="font-semibold text-green-600">${event.cardPayment.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total</p>
                      <p className="font-semibold text-blue-600">${event.totalRaised.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-600">👥 Miembros</p>
                      <p className="font-semibold text-gray-800">{event.members}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">🎫 Invitados</p>
                      <p className="font-semibold text-gray-800">{event.guests}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">👤 Responsable</p>
                      <p className="font-semibold text-gray-800">{event.orderResponsible || '-'}</p>
                    </div>
                  </div>

                  {event.people.length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="font-bold text-gray-800 mb-3">Personas ({event.people.length})</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {event.people.map((person) => (
                          <div key={person.id} className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{person.name}</p>
                              <p className="text-xs text-gray-600">
                                {person.order} • ${person.price.toFixed(2)} • 
                                <span className={person.paymentType === 'cash' ? 'text-red-600' : 'text-green-600'}>
                                  {person.paymentType === 'cash' ? ' Contado' : ' Tarjeta'}
                                </span>
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeletePerson(event.id, person.id)}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Eliminar persona"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
