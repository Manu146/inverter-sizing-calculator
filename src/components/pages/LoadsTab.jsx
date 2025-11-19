import { useState, useContext } from "react";
import Select from "../select/Select";
import { Plus, Zap, Lightbulb, Trash2 } from "lucide-react";
import appliancesData from "../../assets/data.json";
import { LoadsContext } from "../../contexts/LoadsContext"; // added import

export default function LoadsTab() {
  const [appliance, setAppliance] = useState({
    id: "",
    type: "",
    size: "",
    hours: "",
    qty: "",
  });
  const { loads, totalPower, totalDailyKwh, addLoad } =
    useContext(LoadsContext); // use context
  const { id, type, size, hours, qty } = appliance;
  const dataReady = id && type && size && hours;

  const appliances = appliancesData.map((ap) => {
    return { label: ap.name, value: ap.id };
  });

  const types =
    id &&
    appliancesData
      .find((ap) => ap.id === id)
      ?.types.map((t) => ({ label: t.name, value: t.id }));
  const sizes =
    type &&
    appliancesData
      .find((ap) => ap.id === id)
      ?.types.find((t) => t.id === type)
      ?.sizes?.map((s) => ({ label: s.name, value: s.id }));

  const canComputePower = id && type && size && hours && qty;

  // compute current selected appliance power/consumption (live preview)
  const currentSizeObj =
    id &&
    type &&
    size &&
    appliancesData
      .find((ap) => ap.id === id)
      ?.types.find((t) => t.id === type)
      ?.sizes.find((s) => s.id === size);

  const currentWattsPerUnit = Number(currentSizeObj?.watts || 0);
  const currentQtyNum = Number(qty) || 1;
  const currentHoursNum = Number(hours) || 0;
  const currentTotalWatts = currentWattsPerUnit * currentQtyNum;
  const currentDailyKwh = (currentTotalWatts * currentHoursNum) / 1000;

  // totals are now provided by context

  // --- handler to add current appliance to the loads list ---
  function handleAddAppliance() {
    const apObj = appliancesData.find((ap) => ap.id === id);
    const typeObj = apObj?.types.find((t) => t.id === type);
    const sizeObj = typeObj?.sizes.find((s) => s.id === size);

    const powerPerUnit = Number(sizeObj?.watts || 0);
    const qtyNum = Number(qty) || 1;
    const hoursNum = Number(hours) || 0;
    const totalWatts = powerPerUnit * qtyNum;
    const dailyKwh = (totalWatts * hoursNum) / 1000;

    const newLoad = {
      uid: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      appId: id,
      appName: apObj?.name || "",
      typeId: type,
      typeName: typeObj?.name || "",
      sizeId: size,
      sizeName: sizeObj?.name || "",
      wattsPerUnit: powerPerUnit,
      qty: qtyNum,
      hoursPerDay: hoursNum,
      totalWatts,
      dailyKwh,
    };

    addLoad(newLoad); // use context addLoad
    // reset form
    setAppliance({ id: "", type: "", size: "", hours: "", qty: "" });
  }
  // ------------------------------------------------------------------

  return (
    <div className="grid grid-cols-3 mt-6 gap-8 items-start">
      <div className="bg-coal-900 rounded-xl p-6 border border-coal-800">
        <h2 className="text-4xl font-extrabold dark:text-white mb-6">
          1. Añade cargas
        </h2>
        <div className="flex items-end gap-4">
          <div className="flex w-full flex-col">
            <Select
              options={appliances}
              label="Artefacto"
              value={appliance.id}
              onChange={(e) =>
                setAppliance((ap) => ({ ...ap, id: e.target.value }))
              }
              placeholder="Selecciona el tipo"
              className="bg-coal-850 border border-coal-800 text-gray-200 text-base rounded-lg block w-full px-4 py-3 hover:border-green-500 focus:ring-green-500 focus:border-green-500 ease-in duration-150"
            ></Select>
          </div>
        </div>
        {appliance.id && (
          <div className="grid grid-cols-2 gap-6 mt-4">
            {
              <Select
                options={types}
                label="Tipo"
                value={appliance.type}
                onChange={(e) =>
                  setAppliance((ap) => ({ ...ap, type: e.target.value }))
                }
                placeholder="Selecciona el tipo"
                className="bg-coal-850 border border-coal-800 text-gray-200 text-base rounded-lg block w-full px-4 py-3 hover:border-green-500 focus:ring-green-500 focus:border-green-500 ease-in duration-150"
              />
            }
            {sizes && (
              <Select
                options={sizes}
                label="Tamaño"
                value={appliance.size}
                onChange={(e) =>
                  setAppliance((ap) => ({ ...ap, size: e.target.value }))
                }
                placeholder="Selecciona el tamaño"
                className="bg-coal-850 border border-coal-800 text-gray-200 text-base rounded-lg block w-full px-4 py-3 hover:border-green-500 focus:ring-green-500 focus:border-green-500 ease-in duration-150"
              />
            )}
            <div className="">
              <label
                for="number-input"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Cantidad:
              </label>
              <input
                type="number"
                id="qty"
                class="bg-coal-850 border border-coal-800 text-gray-200 text-base rounded-lg block w-full px-4 py-3 hover:border-green-500 focus:ring-green-500 focus:border-green-500 ease-in duration-150"
                placeholder="1"
                value={appliance.qty}
                onChange={(e) =>
                  setAppliance((ap) => ({ ...ap, qty: e.target.value }))
                }
                required
              />
            </div>
            <div className="">
              <label
                for="number-input"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Horas de uso diarias:
              </label>
              <input
                type="number"
                id="hours"
                class="bg-coal-850 border border-coal-800 text-gray-200 text-base rounded-lg block w-full px-4 py-3 hover:border-green-500 focus:ring-green-500 focus:border-green-500 ease-in duration-150"
                placeholder="1"
                required
                value={appliance.hours}
                onChange={(e) =>
                  setAppliance((ap) => ({ ...ap, hours: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        {canComputePower && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 mt-4">
            <div className="flex justify-between">
              <span className="text-zinc-300">Potencia:</span>
              <span className="text-green-500 font-medium">
                {currentTotalWatts} W
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-300">Consumo diario:</span>
              <span className="text-green-500 font-medium">
                {currentDailyKwh.toFixed(2)} kWh/d
              </span>
            </div>
          </div>
        )}
        <button
          type="button"
          className="w-full mt-4 flex items-center gap-2 justify-center bg-green-500 text-zinc-950 font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-green-600 transition duration-150 disabled:bg-green-800"
          disabled={!dataReady}
          onClick={handleAddAppliance}
        >
          <Plus size={16} />
          Añadir artefacto
        </button>
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-coal-900 rounded-xl p-6 border border-coal-800 hover:border-green-500 flex justify-between transition-colors ease-in duration-150">
          <div className="flex flex-col">
            <p className="text-zinc-400 text-sm font-medium">Potencia total:</p>
            <p className="text-2xl text-zinc-100 font-bold">{totalPower} W</p>
          </div>
          <div className="bg-blue-500/10 text-blue-500 rounded-lg p-3">
            <Zap />
          </div>
        </div>
        <div className="bg-coal-900 rounded-xl p-6 border border-coal-800 hover:border-green-500 flex justify-between transition-colors ease-in duration-150">
          <div className="flex flex-col">
            <p className="text-zinc-400 text-sm font-medium">Consumo diario:</p>
            <p className="text-2xl text-zinc-100 font-bold">
              {totalDailyKwh.toFixed(2)} kWh/d
            </p>
          </div>
          <div className="bg-amber-500/10 text-amber-500 rounded-lg p-3">
            <Lightbulb />
          </div>
        </div>
        <div className="bg-coal-900 rounded-xl p-8 border border-coal-800 col-span-2">
          <h3 className="text-lg font-medium text-zinc-300 mb-2">
            {loads.length > 0 ? (
              `Cargas añadidas (${loads.length})`
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-zinc-700 mb-6">
                  <Zap size={48} />
                </div>
                <p className="text-zinc-400">
                  Agrega cargas para calcular el consumo
                </p>
              </div>
            )}
          </h3>
          {loads.length > 0 && (
            <ul className="space-y-2">
              {loads.map((l) => (
                <li
                  key={l.uid}
                  className="rounded border p-3 bg-coal-850 border-coal-800 text-zinc-200"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{l.appName}</div>
                      <div className="text-sm text-zinc-400">
                        {l.typeName} • {l.sizeName}
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="text-right">
                        <div className="font-medium text-green-400">
                          {l.totalWatts} W
                        </div>
                        <div className="text-sm text-zinc-400">
                          {l.dailyKwh.toFixed(2)} kWh/d
                        </div>
                      </div>
                      <button className="bg-red-700/10 text-red-700 rounded-lg p-3 hover:bg-red-700/30 transition-colors ease-in duration-100">
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
