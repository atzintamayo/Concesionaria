// FormularioVehiculo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// — FormNuevo (sin cambios)
const FormNuevo = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, any>;

    const payload = {
      vin: data.vin,
      fk_marca: 1,
      submarca: data.submarca,
      modelo: Number(data.modelo),
      fk_combustible:
        data.combustible === 'Gasolina' ? 2 :
        data.combustible === 'Diesel'   ? 1 : 3,
      fk_transmision:
        data.transmision === 'ESTANDAR' ? 1 : 2,
      numpuertas:      Number(data.numpuertas),
      numejes:         Number(data.numejes),
      fk_tipovehiculo: 1,
      fk_estacionamiento: Number(data.fk_estacionamiento),
      num_placa:       data.num_placa,
      color:           data.color,
      kilometraje:     Number(data.kilometraje),
      seccion:         data.seccion,
      numero:          Number(data.numero)
    };

    try {
      const res = await api.post('/vehiculos/insert', payload);
      alert('Vehículo guardado: ' + res.data.vin);
      form.reset();
      window.location.reload();
    } catch (err: any) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.error || 'Error desconocido');
    }
  };

  return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }} >
       <label>
        Submarca
        <select name="submarca" required>
          <option value="Territory">Territory</option>
          <option value="Figo">Figo</option>
          <option value="Ranger">Ranger</option>
          <option value="Focus">Focus</option>
          <option value="Maverick">Maverick</option>
          <option value="Expedition">Expedition</option>
          <option value="Bronco">Bronco</option>
          <option value="Ecosport">Ecosport</option>
          <option value="Explorer">Explorer</option>
        </select>
      </label>

      <label>
        <span>Modelo</span>
        <select name="modelo" required>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </label>

      <label>
        Combustible
        <select name="combustible" required>
          <option value="Gasolina">Gasolina</option>
          <option value="Diesel">Diesel</option>
          <option value="Eléctrico">Eléctrico</option>
        </select>
      </label>

      <label>
        Transmisión
        <select name="transmision" required>
          <option value="ESTANDAR">Manual</option>
          <option value="AUTOMATICA">Automática</option>
        </select>
      </label>

      <label>
        No. de puertas
        <input type="number" name="numpuertas" min={1} max={10} required />
      </label>

      <label>
        VIN
        <input
          type="text"
          name="vin"
          required
          pattern="[A-HJ-NPR-Z0-9]{17}"
          title="17 caracteres alfanuméricos"
        />
      </label>

      <label>
        No. de ejes
        <input type="number" name="numejes" min={2} max={10} required />
      </label>

      <label>
        Color
        <input type="text" name="color" required />
      </label>

      <label>
        Estacionamiento (ID)
        <input
          type="number"
          name="fk_estacionamiento"
          required
          placeholder="ej. 3"
        />
      </label>

      <label>
        Placas
        <input type="text" name="num_placa" required />
      </label>

      <label>
        Kilometraje
        <input type="number" name="kilometraje" required min={0} />
      </label>
      
      <label>
        Sección
        <input type="text" name="seccion" defaultValue="A" required /> 
      </label>
      <label>
        Número interno
        <input type="number" name="numero" defaultValue={1} required min={1} />
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
};

// — FORMULARIO SEMINUEVO (copiado de form.txt) :contentReference[oaicite:1]{index=1}
const FormSeminuevo = () => (
  <form>
    <div className="label-forms">
      <label htmlFor="marca">Marca:</label>
      <select id="marca" name="marca" required>
        <option value="Ford">Ford</option>
        <option value="Honda">Honda</option>
        <option value="Toyota">Toyota</option>
        <option value="Nissan">Nissan</option>
        <option value="Jeep">Jeep</option>
        <option value="Kia">Kia</option>
        <option value="Chevrolet">Chevrolet</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="submarca">Submarca:</label>
      <select id="submarca" name="submarca" required>
        <option value="Camry">Camry</option>
        <option value="Rav-4">Rav-4</option>
        <option value="Yaris">Yaris</option>
        <option value="Sienna">Sienna</option>
        <option value="City">City</option>
        <option value="Civic">Civic</option>
        <option value="CR-V">CR-V</option>
        <option value="Pilot">Pilot</option>
        <option value="Explorer">Explorer</option>
        <option value="Focus">Focus</option>
        <option value="Figo">Figo</option>
        <option value="Fiesta">Fiesta</option>
        <option value="Versa">Versa</option>
        <option value="Sentra">Sentra</option>
        <option value="X-Trail">X-Trail</option>
        <option value="Kicks">Kicks</option>
        <option value="Compass">Compass</option>
        <option value="Grand Cherokee">Grand Cherokee</option>
        <option value="Cherokee">Cherokee</option>
        <option value="Liberty">Liberty</option>
        <option value="Rio">Rio</option>
        <option value="Forte">Forte</option>
        <option value="Sorento">Sorento</option>
        <option value="Stinger">Stinger</option>
        <option value="Trak">Trak</option>
        <option value="Tracker">Tracker</option>
        <option value="Aveo">Aveo</option>
        <option value="Onix">Onix</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="modelo">Modelo:</label>
      <select id="modelo" name="modelo" required>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="combustible">Combustible:</label>
      <select id="combustible" name="combustible" required>
        <option value="Gasolina">Gasolina</option>
        <option value="Diesel">Diesel</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="transmission">Transmisión:</label>
      <select id="transmission" name="transmission" required>
        <option value="Manual">Manual</option>
        <option value="Automática">Automática</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="kilometraje">Kilometraje:</label>
      <input type="number" id="kilometraje" name="kilometraje" required min="0" />
    </div>

    <div className="label-forms">
      <label>No. de puertas:</label>
      <input type="number" name="numpuertas" required min="1" max="10" />
    </div>

    <div className="label-forms">
      <label>No. de ejes:</label>
      <input type="number" name="numejes" required min="2" max="10" />
    </div>

    <div className="label-forms">
      <label>NIV:</label>
      <input type="text" name="vin" required pattern="[A-HJ-NPR-Z0-9]{17}" 
             title="17 caracteres alfanuméricos" />
    </div>

    <div className="label-forms">
      <label htmlFor="seguro">¿Tiene seguro vigente?</label>
      <select id="seguroVigente" name="seguroVigente" required>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="aseguradora">Aseguradora:</label>
      <select id="aseguradora" name="aseguradora">
        <option value="Qualitas">Qualitas</option>
        <option value="GNP">GNP</option>
        <option value="AXA">AXA</option>
        <option value="Mapfre">Mapfre</option>
      </select>
    </div>

    <div className="label-forms">
      <label>No. de Póliza:</label>
      <input type="text" name="numPoliza" />
    </div>

    <div className="label-forms">
      <label>Fecha de última verificación:</label>
      <input type="date" name="fechaVerificacion" />
    </div>

    <div className="label-forms">
      <label>Placas del vehículo:</label>
      <input type="text" name="num_placa" required />
    </div>

    <div className="label-forms">
      <label>Nombre dueño anterior:</label>
      <input type="text" name="nombreDuenoAnterior" required />
    </div>

    <button type="submit" className="app-content-headerButton">Guardar</button>
  </form>
);

// — FORMULARIO USO INTERNO (copiado de form.txt) :contentReference[oaicite:2]{index=2}
const FormUsoInterno = () => (
  <form>
    <div className="label-forms">
      <label htmlFor="marca">Marca:</label>
      <select id="marca" name="marca" required>
        <option value="Ford">Ford</option>
        <option value="Honda">Honda</option>
        <option value="Toyota">Toyota</option>
        <option value="Nissan">Nissan</option>
        <option value="Jeep">Jeep</option>
        <option value="Kia">Kia</option>
        <option value="Chevrolet">Chevrolet</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="submarca">Submarca:</label>
      <select id="submarca" name="submarca" required>
        <option value="Territory">Territory</option>
        <option value="Fiesta">Fiesta</option>
        <option value="Mustang">Mustang</option>
        <option value="Figo">Figo</option>
        <option value="F-150 Lobo">F-150 Lobo</option>
        <option value="F-250 Super Duty">F-250 Super Duty</option>
        <option value="Ranger">Ranger</option>
        <option value="Focus">Focus</option>
        <option value="Fusion">Fusion</option>
        <option value="Explorer">Explorer</option>
        <option value="Expedition">Expedition</option>
        <option value="Maverick">Maverick</option>
        <option value="Bronco">Bronco</option>
        <option value="Ecosport">Ecosport</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="modelo">Modelo:</label>
      <select id="modelo" name="modelo" required>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="combustible">Combustible:</label>
      <select id="combustible" name="combustible" required>
        <option value="Gasolina">Gasolina</option>
        <option value="Diesel">Diesel</option>
        <option value="Eléctrico">Eléctrico</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="transmission">Transmisión:</label>
      <select id="transmission" name="transmission" required>
        <option value="Manual">Manual</option>
        <option value="Automática">Automática</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="kilometraje">Kilometraje:</label>
      <input type="number" id="kilometraje" name="kilometraje" required min="0" />
    </div>

    <div className="label-forms">
      <label>No. de puertas:</label>
      <input type="number" name="numpuertas" required min="1" max="10" />
    </div>

    <div className="label-forms">
      <label>No. de ejes:</label>
      <input type="number" name="numejes" required min="2" max="10" />
    </div>

    <div className="label-forms">
      <label>NIV:</label>
      <input type="text" name="vin" required pattern="[A-HJ-NPR-Z0-9]{17}" 
             title="17 caracteres alfanuméricos" />
    </div>

    <div className="label-forms">
      <label htmlFor="seguro">¿Tiene seguro vigente?</label>
      <select id="seguroVigente" name="seguroVigente" required>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
    </div>

    <div className="label-forms">
      <label htmlFor="aseguradora">Aseguradora:</label>
      <select id="aseguradora" name="aseguradora">
        <option value="Qualitas">Qualitas</option>
        <option value="GNP">GNP</option>
        <option value="AXA">AXA</option>
        <option value="Mapfre">Mapfre</option>
      </select>
    </div>

    <div className="label-forms">
      <label>No. de Póliza:</label>
      <input type="text" name="numPoliza" />
    </div>

    <div className="label-forms">
      <label>Fecha de última verificación:</label>
      <input type="date" name="fechaVerificacion" />
    </div>

    <div className="label-forms">
      <label>Placas del vehículo:</label>
      <input type="text" name="num_placa" required />
    </div>

    <div className="label-forms">
      <label>Nombre de empleado:</label>
      <input type="text" name="nombreEmpleado" required />
    </div>

    <div className="label-forms">
      <label>No. de empleado:</label>
      <input type="text" name="numEmpleado" required />
    </div>

    <button type="submit" className="app-content-headerButton">Guardar</button>
  </form>
);

// — COMPONENTE PRINCIPAL MODAL —
export const ModalForm = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', onEsc);
    else window.removeEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="app-content-headerButton">
        Agregar vehículo
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsOpen(false)} className="close-button">
              ✕
            </button>
            <br></br>
            <div className="button-group">
              <button
                onClick={() => setSelectedForm('nuevo')}
                className="app-content-headerButton"
              >
                Nuevo
              </button>
              <button
                onClick={() => setSelectedForm('seminuevo')}
                className="app-content-headerButton"
              >
                Seminuevo
              </button>
              <button
                onClick={() => setSelectedForm('usoInterno')}
                className="app-content-headerButton"
              >
                Uso Interno
              </button>
            </div>

            {/* Renderizado  */}
            {selectedForm === 'nuevo'      && <FormNuevo />}
            {selectedForm === 'seminuevo'  && <FormSeminuevo />}
            {selectedForm === 'usoInterno' && <FormUsoInterno />}
          </div>
        </div>
      )}
    </div>
  );
};
