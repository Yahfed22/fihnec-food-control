import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../store/slices/eventsSlice';
import { addLog } from '../store/slices/auditSlice';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

interface EventFormProps {
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    chapter: '',
    code: '',
    location: '',
    totalRaised: 0,
    cashPayment: 0,
    cardPayment: 0,
    members: 0,
    guests: 0,
    orderResponsible: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      id: uuidv4(),
      ...formData,
      people: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addEvent(newEvent as any));
    
    const auditLog = {
      id: uuidv4(),
      userId: user?.id || 'unknown',
      action: 'CREATE_EVENT',
      description: `Evento creado: ${formData.chapter} - ${formData.date}`,
      timestamp: new Date().toISOString(),
      details: newEvent,
    };
    dispatch(addLog(auditLog));

    alert('✅ Evento creado exitosamente');
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-t-4 border-red-600">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Agregar Nuevo Evento</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Fecha *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Capítulo *</label>
          <input
            type="text"
            name="chapter"
            value={formData.chapter}
            onChange={handleChange}
            required
            placeholder="Ej: Capítulo Bogotá"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Código</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Ej: CH-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Lugar</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej: Hotel Central"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Total Recaudado ($)</label>
          <input
            type="number"
            name="totalRaised"
            value={formData.totalRaised}
            onChange={handleChange}
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Pago al Contado ($)</label>
          <input
            type="number"
            name="cashPayment"
            value={formData.cashPayment}
            onChange={handleChange}
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Pago con Tarjeta ($)</label>
          <input
            type="number"
            name="cardPayment"
            value={formData.cardPayment}
            onChange={handleChange}
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Número de Miembros</label>
          <input
            type="number"
            name="members"
            value={formData.members}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Invitados</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Responsable del Pedido</label>
          <input
            type="text"
            name="orderResponsible"
            value={formData.orderResponsible}
            onChange={handleChange}
            placeholder="Nombre del responsable"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition shadow-md"
          >
            ✓ Guardar Evento
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition shadow-md"
          >
            ✕ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
