import { useState, useEffect } from 'react';
import { X, ShieldCheck, Flame, Gauge, Cpu, DollarSign, Clock, TrendingUp, Radio, Car } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'midnight2026';

const mockOrders = [
  { id: 'EXP-401', vehicle: 'Porsche 911 GT3 (CA 9GT3RS)', items: 'Triple Wagyu Smashed + Truffle Umami Wok', lane: 'Supercar Lane 1', total: 68.50, status: 'ready-window' },
  { id: 'EXP-402', vehicle: 'Nissan GT-R Nismo (NV GODZLA)', items: 'Kurobuta Pork Belly Bowl + Nitro Matcha', lane: 'Priority Lane 2', total: 54.00, status: 'wok-searing' },
  { id: 'EXP-403', vehicle: 'Audi RS6 Avant (WA RS6AVT)', items: 'Midnight Ribeye Slices + Szechuan Chili Crisp', lane: 'Express Lane 1', total: 82.00, status: 'rfid-scanned' },
  { id: 'EXP-404', vehicle: 'BMW M3 CS (CA M3CS26)', items: 'Smoked Ghost Pepper Wings + Citrus Yuzu Soda', lane: 'Supercar Lane 1', total: 46.50, status: 'dispatched' },
];

const metrics = [
  { label: 'Night Velocity', value: '$8,420', icon: DollarSign, color: 'text-amber-400' },
  { label: 'Wok Temp Average', value: '345°C', icon: Flame, color: 'text-rose-500' },
  { label: 'Drive-Thru Pace', value: '1m 42s', icon: Gauge, color: 'text-emerald-400' },
  { label: 'RFID Sync Rate', value: '99.4%', icon: Radio, color: 'text-purple-400' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'lanes' | 'settings'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Use the 1-click auto-fill below.');
    }
  };

  if (!isOpen) return null;

  const statusColors: Record<string, string> = {
    'ready-window': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    'wok-searing': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    'rfid-scanned': 'text-sky-400 bg-sky-400/10 border-sky-400/30',
    'dispatched': 'text-zinc-300 bg-zinc-500/10 border-zinc-700',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#08080A] border border-rose-500/25 shadow-[0_0_50px_rgba(244,63,94,0.15)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/30">
              <Flame className="h-5 w-5 text-rose-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase tracking-widest">Midnight Express OS</p>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Pit Master & Dispatch Console</h2>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {!authenticated ? (
            <div className="flex flex-col items-center justify-center p-10 space-y-6 min-h-[380px]">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <ShieldCheck className="h-8 w-8 text-rose-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-4">Dispatch Security Gate</h3>
                <p className="text-base text-zinc-200 leading-relaxed font-mono max-w-xs mx-auto">High-velocity late night drive-thru kitchen HUD. Enter operator passkey or 1-click bypass demo.</p>
              </div>

              <div className="w-full max-w-sm space-y-3">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder="Enter dispatch passkey..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-rose-500/50 placeholder:text-zinc-700"
                />
                {authError && <p className="text-xs text-rose-400 font-mono">{authError}</p>}
                <button onClick={handleAuth} className="w-full rounded-lg bg-rose-600 py-3 text-base font-bold min-h-[44px] uppercase tracking-wider text-white hover:bg-rose-500 transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  Unlock Dispatch Terminal
                </button>
                <button
                  onClick={() => { setPasskey(PASSKEY); setAuthError(''); }}
                  className="w-full rounded-lg border border-rose-500/30 bg-rose-500/5 py-2.5 text-xs font-mono text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                >
                  [ 1-CLICK DEMO AUTO-FILL: midnight2026 ]
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div className="flex gap-1 bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                {([
                  { id: 'overview', label: 'Telemetry', icon: Gauge },
                  { id: 'orders', label: 'Active Woks', icon: Flame },
                  { id: 'lanes', label: 'RFID Lanes', icon: Car },
                  { id: 'settings', label: 'System', icon: ShieldCheck },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === id ? 'bg-rose-600 text-white font-bold' : 'text-zinc-300 hover:text-zinc-300'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {metrics.map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                        <Icon className={`h-4 w-4 ${color}`} />
                        <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
                        <p className="text-xs font-semibold tracking-wider text-zinc-300 uppercase tracking-wider">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Active Drive-Thru Queue</h4>
                    {mockOrders.slice(0, 3).map((o) => (
                      <div key={o.id} className="flex items-center justify-between py-2 border-b border-zinc-800/60 last:border-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{o.vehicle}</span>
                            <span className="text-[9px] font-mono text-rose-400/80 bg-rose-500/10 px-1 py-0.5 rounded">{o.lane}</span>
                          </div>
                          <p className="text-xs font-semibold tracking-wider text-zinc-400 font-mono mt-0.5">{o.items}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold font-mono text-white">${o.total.toFixed(2)}</p>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${statusColors[o.status]}`}>{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-2">
                  {mockOrders.map((o) => (
                    <div key={o.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300">{o.id}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${statusColors[o.status]}`}>{o.status}</span>
                          <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded">{o.lane}</span>
                        </div>
                        <p className="text-sm font-bold text-white">{o.vehicle}</p>
                        <p className="text-base text-zinc-200 leading-relaxed font-mono">{o.items}</p>
                      </div>
                      <p className="text-lg font-bold text-rose-400 font-mono">${o.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'lanes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Supercar Lane 1 (Low Clearance)', sensors: 'Active', waitTime: '45s', occupancy: 'Porsche 911 GT3 RS' },
                    { name: 'Priority Lane 2 (RFID Pass)', sensors: 'Active', waitTime: '1m 15s', occupancy: 'Nissan GT-R Nismo' },
                    { name: 'Express Lane 3 (Mobile Prep)', sensors: 'Active', waitTime: '2m 10s', occupancy: 'Audi RS6 Avant' },
                    { name: 'Walk-up Neon Hatch', sensors: 'Standby', waitTime: '0s', occupancy: 'Available' },
                  ].map((l) => (
                    <div key={l.name} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">{l.name}</span>
                        <span className="text-[9px] font-mono text-emerald-400 uppercase bg-emerald-500/10 px-1 py-0.5 rounded">{l.sensors}</span>
                      </div>
                      <p className="text-base text-zinc-200 leading-relaxed font-mono">Current: <span className="text-zinc-200">{l.occupancy}</span></p>
                      <p className="text-xs font-semibold tracking-wider text-zinc-300 font-mono">Avg Window Delta: {l.waitTime}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                    <h4 className="text-xs font-mono text-zinc-300 uppercase tracking-widest">Station Protocol</h4>
                    {[
                      { label: 'Station Name', value: 'Midnight Express Drive-Thru' },
                      { label: 'Passkey', value: 'midnight2026' },
                      { label: 'Live Showcase', value: 'midnight-express-os.onrender.com' },
                      { label: 'Audio Engine', value: 'Web Audio API Synth Core (Wok Sizzle + Neon Chime)' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-800/60 last:border-0">
                        <span className="text-xs text-zinc-300 font-mono uppercase">{label}</span>
                        <span className="text-xs text-zinc-200 font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs text-rose-300 font-mono">
                    ✅ Ghost Factory™ Verified — Target #48 | Luxury Hospitality & Dining Vault (18/60)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
