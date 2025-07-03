import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Edificio {
  id_edificio: number;
  nombre: string;
  fk_tipoedificio: number;
  fk_direccion: number;
  fk_encargado: string;
  telefono: string;
}

const Patios: React.FC = () => {
  const [edificios, setEdificios] = useState<Edificio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Edificio[]>('http://localhost:3001/api/edificios')
      .then(resp => {
        setEdificios(resp.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar la lista de patios');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando patios…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="Main-Cont-Patio">
      <h1>Patios / Edificios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Dirección</th>
            <th>Encargado</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {edificios.map(e => (
            <tr key={e.id_edificio}>
              <td>{e.id_edificio}</td>
              <td>{e.nombre}</td>
              <td>{e.fk_tipoedificio}</td>
              <td>{e.fk_direccion}</td>
              <td>{e.fk_encargado}</td>
              <td>{e.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patios;
