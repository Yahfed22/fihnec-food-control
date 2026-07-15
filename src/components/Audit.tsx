import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearLogs } from '../store/slices/auditSlice';
import { Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const Audit: React.FC = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state: RootState) => state.audit.logs);

  const handleClearLogs = () => {
    if (window.confirm('⚠️ ¿Estás seguro de que quieres borrar TODO el historial de auditoría?')) {
      dispatch(clearLogs());
      alert('✅ Historial borrado');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-800">📋 Historial de Auditoría ({logs.length})</h2>
        <button
          onClick={handleClearLogs}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold shadow-md"
        >
          <Trash2 size={18} />
          Borrar Todo
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">📭 Sin registros de auditoría</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">🔔 {log.action}</p>
                  <p className="text-gray-600 text-sm mt-1">{log.description}</p>
                  <p className="text-xs text-gray-500 mt-2">👤 {log.userId}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: es })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Audit;
