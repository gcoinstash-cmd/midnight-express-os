-- MIDNIGHT EXPRESS OS — Supabase Schema | Ghost Factory™
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  vehicle_plate TEXT,
  vehicle_class TEXT DEFAULT 'SPORTS',
  lane TEXT DEFAULT 'Express Lane 1',
  items JSONB NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  boost_preset TEXT DEFAULT 'UMAMI',
  lane_priority BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'rfid-scanned' CHECK (status IN ('rfid-scanned', 'wok-searing', 'ready-window', 'dispatched', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage orders" ON orders FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  sub_title TEXT,
  price NUMERIC(10,2) NOT NULL,
  calories INTEGER,
  prep_seconds INTEGER DEFAULT 180,
  spice_tier INTEGER DEFAULT 1,
  category TEXT DEFAULT 'WOK_CLASSIC',
  image_url TEXT,
  available BOOLEAN DEFAULT true
);
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read menu" ON menu_items FOR SELECT USING (available = true);
CREATE POLICY "Admin manage menu" ON menu_items FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS lanes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lane_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sensors_active BOOLEAN DEFAULT true,
  current_vehicle TEXT,
  avg_wait_seconds INTEGER DEFAULT 90,
  status TEXT DEFAULT 'active'
);
ALTER TABLE lanes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read lanes" ON lanes FOR SELECT USING (true);
CREATE POLICY "Admin update lanes" ON lanes FOR UPDATE USING (auth.role() = 'authenticated');
