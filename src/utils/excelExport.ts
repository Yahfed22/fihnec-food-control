import * as XLSX from 'xlsx';
import { Event } from '../store/slices/eventsSlice';

export const exportToExcel = (events: Event[]) => {
  if (events.length === 0) {
    alert('⚠️ No hay eventos para exportar');
    return;
  }

  const data = events.map((event) => ({
    'Fecha': event.date,
    'Capítulo': event.chapter,
    'Código': event.code,
    'Lugar': event.location,
    'Total Recaudado': event.totalRaised,
    'Contado': event.cashPayment,
    'Tarjeta': event.cardPayment,
    'Miembros': event.members,
    'Invitados': event.guests,
    'Responsable': event.orderResponsible,
    'Total Personas': event.people.length,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Eventos');

  const peopleData: any[] = [];
  events.forEach((event) => {
    event.people.forEach((person) => {
      peopleData.push({
        'Evento': event.chapter,
        'Fecha Evento': event.date,
        'Nombre': person.name,
        'Pedido': person.order,
        'Precio': person.price,
        'Tipo Pago': person.paymentType === 'cash' ? 'Contado' : 'Tarjeta',
        'Fecha': person.date,
      });
    });
  });

  if (peopleData.length > 0) {
    const wsPeople = XLSX.utils.json_to_sheet(peopleData);
    XLSX.utils.book_append_sheet(wb, wsPeople, 'Personas');
  }

  const fileName = `FHNEC_Eventos_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  alert('✅ Archivo descargado exitosamente');
};
