import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';

// Cliente API base
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' }
});

interface Vehiculo {
  vin: string;
  marca: string;
  submarca: string;
  modelo: number;
  combustible: string;
  transmision: string;
  numpuertas: number;
  numejes: number;
  tipovehiculo: string;
  estacionamiento: string;
  num_placa: string;
  color?: string;
  kilometraje?: number;
  ubicacion?: string;
  seccion: string;
  numero: number;
}

export const VehiculosList: React.FC = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVin, setExpandedVin] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editVehiculo, setEditVehiculo] = useState<Vehiculo | null>(null);

  // Obtener lista
  const fetchVehiculos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Vehiculo[]>('/vehiculos');
      setVehiculos(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  // Eliminar vehículo
  const handleDelete = async (vin: string) => {
    if (!window.confirm(`¿Eliminar vehículo con VIN: ${vin}?`)) return;
    try {
      await api.post('/vehiculos/delete', { vin });
      alert('Vehículo eliminado correctamente');
      fetchVehiculos();
    } catch (err: any) {
      console.error('Error al eliminar:', err);
      alert(err.response?.data?.error || 'Error al eliminar vehículo');
    }
  };

  // Abrir modal de edición
  const openEditModal = (v: Vehiculo) => {
    setEditVehiculo(v);
    setIsEditOpen(true);
  };

  // Cerrar modal de edición
  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditVehiculo(null);
  };

  // Enviar actualización
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVehiculo) return;
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()) as any;

    const payload = {
      fk_marca: 1,
      submarca: data.submarca,
      modelo: Number(data.modelo),
      fk_combustible: data.combustible === 'Gasolina' ? 2 : data.combustible === 'Diesel' ? 1 : 3,
      fk_transmision: data.transmision, // ya viene como 'ESTANDAR' o 'AUTOMATICA'
      numpuertas: Number(data.numpuertas),
      numejes: Number(data.numejes),
      fk_tipovehiculo: 1,
      fk_estacionamiento: Number(data.fk_estacionamiento),
      num_placa: data.num_placa,
      color: data.color,
      kilometraje: Number(data.kilometraje),
      seccion: data.seccion,
      numero: Number(data.numero)
    };

    try {
      await api.put(`/vehiculos/${editVehiculo.vin}`, payload);
      alert('Vehículo actualizado correctamente');
      closeEditModal();
      fetchVehiculos();
    } catch (err: any) {
      console.error('Error al actualizar:', err);
      alert(err.response?.data?.error || 'Error al actualizar vehículo');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error)   return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <div className="vehiculos-list" style={{ color: 'white' }}>
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.vin} className="vehiculo-item">
            <div
              onClick={() => setExpandedVin(prev => (prev === vehiculo.vin ? null : vehiculo.vin))}
              className="Main-Cont-Car"
            >
              <div className="Grid-Data">
                <p>{vehiculo.marca} {vehiculo.submarca}</p>
                <p>{vehiculo.modelo}</p>
                <p>{vehiculo.combustible}</p>
                <p>{vehiculo.vin}</p>
                <p>{vehiculo.transmision}</p>
                <p>{vehiculo.num_placa}</p>
              </div>

              {expandedVin === vehiculo.vin && (
                <div className="Car-Data-Container">
                  <p><strong>No. de puertas:</strong> {vehiculo.numpuertas}</p>
                  <p><strong>No. de ejes:</strong> {vehiculo.numejes}</p>
                  <p><strong>Tipo:</strong> {vehiculo.tipovehiculo}</p>
                  <p><strong>Estacionamiento:</strong> {vehiculo.estacionamiento}</p>
                  <p><strong>Ubicación:</strong> {vehiculo.ubicacion}</p>
                  <p><strong>Color:</strong> {vehiculo.color}</p>
                  <p><strong>Kilometraje:</strong> {vehiculo.kilometraje}</p>
                </div>
              )}
            </div>
            <div className="Button-Divider">
              <button onClick={() => openEditModal(vehiculo)} className="button-9" id="editar">Editar</button>
              <button onClick={() => handleDelete(vehiculo.vin)} className="button-9" id="eliminar">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {isEditOpen && editVehiculo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeEditModal}>✕</button>
            <form onSubmit={handleUpdate} style={{ display: 'grid', gap: 12 }}>
              <label>
                Submarca
                <input name="submarca" defaultValue={editVehiculo.submarca} required />
              </label>
              <label>
                Modelo
                <input type="number" name="modelo" defaultValue={editVehiculo.modelo} required />
              </label>
              <label>
                Combustible
                <select name="combustible" defaultValue={editVehiculo.combustible} required>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </label>
              <label>
                Transmisión
                <select name="transmision" defaultValue={editVehiculo.transmision} required>
                  <option value="ESTANDAR">ESTANDAR</option>
                  <option value="AUTOMATICA">AUTOMATICA</option>
                </select>
              </label>
              <label>
                Puertas
                <input type="number" name="numpuertas" defaultValue={editVehiculo.numpuertas} min={1} required />
              </label>
              <label>
                Ejes
                <input type="number" name="numejes" defaultValue={editVehiculo.numejes} min={2} required />
              </label>
              <label>
                Estacionamiento
                <input type="number" name="fk_estacionamiento" defaultValue={Number(editVehiculo.estacionamiento)} required />
              </label>
              <label>
                Placas
                <input name="num_placa" defaultValue={editVehiculo.num_placa} required />
              </label>
              <label>
                Color
                <input name="color" defaultValue={editVehiculo.color || ''} required />
              </label>
              <label>
                Kilometraje
                <input type="number" name="kilometraje" defaultValue={editVehiculo.kilometraje || 0} min={0} required />
              </label>
              <label>
                Sección
                <input name="seccion" defaultValue={editVehiculo.seccion} maxLength={1} required />
              </label>
              <label>
                Número interno
                <input type="number" name="numero" defaultValue={editVehiculo.numero} min={1} required />
              </label>
              <button type="submit">Actualizar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
